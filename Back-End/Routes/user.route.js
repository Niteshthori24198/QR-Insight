
const express=require("express")
const { UserModel } = require("../Models/user.model")
const bcrypt=require("bcrypt")
const nodemailer = require("nodemailer");
require("dotenv").config()
const jwt=require("jsonwebtoken");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {client } = require("../Config/redis");
const {passport}=require("../Config/google-oauth")
const {passport1}=require("../Config/facebookauth");
const { blackmodel } = require("../Models/blackmodel");
const { middleware } = require("../Middlewares/auth.middleware");


const userroute=express.Router()


userroute.get("/",(req,res)=>{
   res.send("user route")
})

/**
 * @swagger
 * components:
 *   schemas:
 *     userSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         Name:
 *           type: string
 *         Email:
 *           type: string
 *         Password:
 *           type: string
 *         Address:
 *           type: string
 *         Gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *         Role:
 *           type: string
 *           enum: [Admin, User, Guest]
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: To add a new user to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userSchema'
 *      responses:
 *          200:
 *              description: User Registration Successfull. Please verify Your Email Address.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userSchema'
 *          500:
 *              description: Some server error
 */

userroute.post("/register", async(req,res)=>{
    try {
        let {Name,Email,Password,Address,Gender}=req.body
        let user=await UserModel.findOne({Email})
        console.log(user)

        if(user){
            return res.status(400).send({"msg":"already exist please login"})
        }

        let hashpasswod= bcrypt.hashSync(Password,6)

        let newuser= new UserModel({Name,Email,Password:hashpasswod,Address,Gender,Role:"User"})
        newuser.ismailverified=false
        let dbnewuser=await newuser.save()

        console.log(dbnewuser)
        
        sendverificationmail(Name,Email,dbnewuser._id)
        res.status(200).send({"msg":"User Registration Successfull. Please verify Your Email Address."})


    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

//to send mail==============================================================

let sendverificationmail=async(Name,Email,userid)=>{
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mr.rajeshkumar7678@gmail.com',
                pass: process.env.googlepassword
            }
        });

        const BaseUrl_Backend = `https://angry-cummerbund-newt.cyclic.app`

        let mailOptions = {
            from: 'mr.rajeshkumar7678@gmail.com',
            to: Email,
            subject: 'User Verifecation Mail From QR Insight',
            html:`<p>hi ${Name} <br> Please click here to <a href="${BaseUrl_Backend}/user/verify?id=${userid}">verify</a>  your mail. </p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                
            } else {
                console.log('Email sent: ' + info.response);
               
            }
        });
    } catch (error) {
        console.log(error)
    }

}


/**
 * @swagger
 *   /user/verify:
 *   get:
 *     summary: This route will verified the mail and give the acces to login
 *     tags: [get]
 *     responses:
 *       200:
 *         description: vefified the mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/userSchema'
 */

//verify mail route==========================================================

userroute.get("/verify",async(req,res)=>{
    try {
        let {id}=req.query
        let userverify=await UserModel.findOne({_id:id})

        if(!userverify){
            return res.status(400).send({"msg":"not valid email"})
        }

        userverify.ismailverified=true
        await userverify.save()
        res.status(200).send({"msg":"mail verified successfull"})

    } catch (error) {
        console.log(error)
    }
})

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: To login with thw website
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userSchema'
 *      responses:
 *          200:
 *              description: Login sucessfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userSchema'
 *          500:
 *              description: Some server error
 */

//login route with mail and password =============================================
userroute.post("/login",async (req,res)=>{
    try {
        let {Email,Password}=req.body

        let user=await UserModel.findOne({Email})

        if(!user){
            return res.status(400).send({"msg":"register first then login"})
        }

        if(user.ismailverified==false){
            return res.status(400).send({"msg":"verify your mail first"})
        }

        let decrupt=await bcrypt.compare(Password,user.Password)
        console.log(decrupt)
        
        if(!decrupt){
            return res.status(400).send({"msg":"incorrect password"})
        }

        let token=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6hr"})
        let refreshtoken=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"1d"})

        client.set('token', token, 'EX', 21600);
        client.set('refreshtoken', refreshtoken, 'EX', 86400);

        res.status(200).send({"msg":"Login sucessfull","userdetails":user})

    } catch (error) {
        res.status(400).send(error.message)
    }
})




// sending otp mail=======================================================================

let sendotpmail=async(Name,Email,otp)=>{

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mr.rajeshkumar7678@gmail.com',
                pass: process.env.googlepassword
            }
        });

        let mailOptions = {
            from: 'mr.rajeshkumar7678@gmail.com',
            to: Email,
            subject: 'OTP verifecation mail',
            html:`<p>HI ${Name} <br> please use this OTP to update password.<br> ${otp} </p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                
            } else {
                console.log('Email sent: ' + info.response);
               
            }
        });
    } catch (error) {
        console.log(error)
    }

}
//google auth=====================================================================================

userroute.get('/auth/google',
  passport1.authenticate('google', { scope: ['profile','email'] }));

userroute.get('/auth/google/callback', 
  passport1.authenticate('google', { failureRedirect: '/login' ,session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    const user=req.user
    let token=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6hr"})
    let refreshtoken=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"1d"})

    client.set('token', token, 'EX', 21600);
    client.set('refreshtoken', refreshtoken, 'EX', 86400);
    
    res.send(`<a href="http://127.0.0.1:5502/Front-End/index.html?userid=${user._id}" id="myid">Loding...🕧</a>
    <script>
        let a = document.getElementById('myid')
        a.click()
        console.log(a)
    </script>`)


});

/**
 * @swagger
 *   /user/getdata:
 *   get:
 *     summary: This route will get the data by userid
 *     tags: [get]
 *     responses:
 *       200:
 *         description: userdetails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/userSchema'
 */
userroute.get("/getdata", async(req,res)=>{
    try {
        let {_id}=req.query
       
        let user=await UserModel.findOne({_id})
        res.send({"userdetails":user})
        
    } catch (error) {
        console.log(error)
    }
})



//find data =======================================

/**
 * @swagger
 * /user/forgetpass:
 *  post:
 *      summary: this route will send you the otp for password update
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userSchema'
 *      responses:
 *          200:
 *              description: send you the userdetails and otp to mail
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userSchema'
 *          500:
 *              description: Some server error
 */
userroute.post("/forgetpass",async(req,res)=>{
    try {
        let {Email}=req.body
        let user=await UserModel.findOne({Email})
        if(user){
            let OTP = "";
            for (let i = 0; i < 6; i++) {
            OTP+= Math.floor(Math.random() * 10);
            }
            console.log(OTP)
            client.set('OTP', OTP, 'EX', 3600);
            sendotpmail(user.Name,user.Email,OTP)

        }
        res.send({"userdetails":user})
    } catch (error) {
        console.log(error)
    }
})

/**
 * @swagger
 * /user/verifyotp:
 *  post:
 *      summary: this route will verify your mail
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userSchema'
 *      responses:
 *          200:
 *              description: send you the massage for conformation of otp
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userSchema'
 *          500:
 *              description: Some server error
 */
userroute.post("/verifyotp",async(req,res)=>{
    try {
        let {OTP}=req.body
       let otp=await client.get('OTP')
       if(OTP==otp){
        res.status(200).send({"msg":"Otp verified"})
       }else{
        res.status(400).send({"msg":"incorrect verified"})
       }
       
    } catch (error) {
        console.log(error)
    }
})

/**
 * @swagger
 * /user/updatepass:
 *   put:
 *     summary: To update user password in the database
 *     tags: [put]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/userSchema'
 *     responses:
 *       200:
 *         description: password update successfully please login
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/userSchema'
 *       404:
 *         description: The specified user ID does not exist.
 *       500:
 *         description: Some server error
 */
userroute.put("/updatepass",async(req,res)=>{
    try {
        let {id}=req.query
        let {password}=req.body
        let hashpass=bcrypt.hashSync(password,7)
        let user=await UserModel.findById({_id:id})
        user.Password=hashpass
        await user.save()
        console.log(user)
         res.send({"msg":"password update successfull please login"})
    } catch (error) {
        res.send(error)
    }
})

//logout======================================================================
/**
 * @swagger
 *   /user/logout:
 *   get:
 *     summary: This route will logout the user from website
 *     tags: [get]
 *     responses:
 *       200:
 *         description: userdetails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/userSchema'
 */
userroute.get("/logout",async(req,res)=>{
    try {

        let usertoken = await client.get('token');

        let userrefreshtoken = await client.get('refreshtoken');

        let blacklisttoken1 = new blackmodel( { token : usertoken } );
        let blacklisttoken2 = new blackmodel( { token : userrefreshtoken } );

        await blacklisttoken1.save();
        await blacklisttoken2.save();

        //console.log(usertoken,userrefreshtoken,blacklisttoken)

        res.send({"msg":"logout successfull"})
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})


//facebook login===============================================================
userroute.get('/auth/facebook',
  passport.authenticate('facebook'));

userroute.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' ,session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("hi")
    res.redirect('/user');
});


//github oauth====================================================================

userroute.get("/callback",async (req,res)=>{
    let {code}=req.query
    //console.log(code)
   
    const accessToken = await fetch("https://github.com/login/oauth/access_token", {
        method : "POST",
        headers : {
            Accept : "application/json",
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            client_id : process.env.githubclientid,
            client_secret : process.env.githubclientsecret,
            code
        })
    }).then((res) => res.json())
    //console.log(accessToken)
    
    let user = await fetch(`https://api.github.com/user`,{
        method:'GET',
        headers:{
            'Content-type':'application/json',
            'Authorization': `bearer ${accessToken.access_token}`
        }
    })

    user = await user.json()
    //console.log(user)

    let userEmail = await fetch(`https://api.github.com/user/emails`,{
        method:'GET',
        headers:{
            'Content-type':'application/json',
            'Authorization': `bearer ${accessToken.access_token}`
        }
    })

    userEmail = await userEmail.json()
    console.log(userEmail);
    
    //console.log(userEmail[0].email)
    let Email=userEmail[0].email
    let gitusser= await gituser(Email,user)
    console.log(gitusser)

    let token=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6hr"})
    let refreshtoken=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"1d"})

    client.set('token', token, 'EX', 21600);
    client.set('refreshtoken', refreshtoken, 'EX', 86400);
    
    res.send(`<a href="http://127.0.0.1:5502/Front-End/index.html?userid=${gitusser._id}" id="myid">Loading ... 🕧</a>
    <script>
        let a = document.getElementById('myid')
        a.click()
        console.log(a)
    </script>`)
})

async function gituser(Email,user){
    //console.log(Email,user)
    const gituser=await UserModel.findOne({Email})

    if(!gituser){
        console.log("adding new user")
        let newuser=new UserModel({
          Email,
          Name:user.name,
          Password:"12345678",
          Address:user.location,
          Gender:"Male",
          Role:"User",
          ismailverified:true
        })
        await newuser.save()
        return newuser
      }else{
        console.log("user is present db")
        return gituser
        
    }
    
}



/**
 * @swagger
 *   /user/getallusers:
 *   get:
 *     summary: This route will return all the user 
 *     tags: [get]
 *     responses:
 *       200:
 *         description: only admin can access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/userSchema'
 */
userroute.get('/getallusers', middleware, async (req,res)=>{
    const Role = req.role;
    console.log(Role);
    console.log(req.id);
    const user = await UserModel.findById({_id:req.id})
    console.log(user);

    if(Role !== 'Admin'){
        const user = []
        return res.status(400).send({msg:"Only Admin Can Access. UnAuthorized Access", users:user})
    } 

    try {
        const users = await UserModel.find()
        return res.status(200).send({
            msg:"All Users Details",
            users : users
        })

    } catch (error) {
        return res.status(400).send({msg:error.message, users:user})
    }
})


module.exports={
    userroute
}