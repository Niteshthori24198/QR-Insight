
const express=require("express")
const { UserModel } = require("../Models/user.model")
const bcrypt=require("bcrypt")
const nodemailer = require("nodemailer");
require("dotenv").config()
const jwt=require("jsonwebtoken");
const cors = require('cors');
const path=require("path")
const {client } = require("../Config/redis");
const {passport}=require("../Config/google-oauth")

const userroute=express.Router()


userroute.get("/",(req,res)=>{
    res.send("user route")
})


userroute.post("/register", async(req,res)=>{
    try {
        let {Name,Email,Password,Address,Gender,Role}=req.body
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
        res.status(200).send({"msg":"User registered successfully. Please verify your email address."})


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

        let mailOptions = {
            from: 'mr.rajeshkumar7678@gmail.com',
            to: Email,
            subject: 'For verifecation mail',
            html:`<p>hi ${Name} <br> please click here to <a href="http://localhost:3000/user/verify?id=${userid}">verify</a>  your mail. </p>`
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

//login route with mail and password =============================================
userroute.post("/login",async (req,res)=>{
    try {
        let {Email,Password}=req.body

        let user=await UserModel.findOne({Email})

        if(!user){
            return res.status(400).send({"msg":"register first then login"})
        }

        let decrupt=await bcrypt.compare(Password,user.Password)
        console.log(decrupt)
        
        if(!decrupt){
            return res.status(400).send({"msg":"incorrect password"})
        }

        let token=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6hr"})
        let refreshtoken=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6d"})

        client.set('token', token, 'EX', 3600);
        client.set('refreshtoken', refreshtoken, 'EX', 3600);

        res.status(200).send({"msg":"Login sucessfull","Name":user.Name})

    } catch (error) {
        res.status(400).send(error.message)
    }
})


//logout route===========================================================







// sending otp mail=======================================================================

let sendotpmail=async(Name,Email,otp)=>{
            // let otp = "";
        // for (let i = 0; i < 6; i++) {
        //   otp += Math.floor(Math.random() * 10);
        // }
        // console.log(otp)

        // sendotpmail(user.Name,Email,otp)
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
            html:`<p>HI ${Name} <br> please use this OTP to login.<br> ${otp} </p>`
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
//=====================================================================================

userroute.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

userroute.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/user');

});

// userroute.get('/profile', function(req, res) {
//     if (req.user) {
//       res.send(req.user._json);
//     } else {
//       res.status(401).send({ message: 'Unauthorized' });
//     }
// });







module.exports={
    userroute
}