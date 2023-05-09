const { client } = require("../Config/redis");
const { blackmodel } = require("../Models/blackmodel");
const jwt=require("jsonwebtoken")
require("dotenv").config()



const middleware=async (req,res,next)=>{
    try {
        let token=await client.get('token');
        let refreshtoken=await client.get('refreshtoken');

        if(!token ){
            if(!refreshtoken){
                return res.status(400).send({ "msg": "Please login first" });
            }else{
                let token=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6hr"})
                client.set('token', token, 'EX', 3600);
            }
            
        }

        let istokenblacklist=await blackmodel.findOne({token})
        if(istokenblacklist){
            return res.status(400).send({ msg: "not authorized" });
        }

        let decodedtoken=jwt.verify(token,process.env.secretkey)
        let decodedrefreshtoken=jwt.verify(refreshtoken,process.env.secretkey)
        if(!decodedtoken){
            if(!decodedrefreshtoken){
                return res.status(400).send({ msg: "not authorized" });
            }else{
                let token=jwt.sign({id:user._id,verified:user.ismailverified,role:user.Role},process.env.secretkey,{expiresIn:"6hr"})
                client.set('token', token, 'EX', 3600);
            }
            
        }

        let {id,verified,role}=decoded
        req.id=id
        req.verified=verified
        req.role=role

        next()
    } catch (error) {
        res.send(error)
        console.log(error)
    }


}

module.exports={
    middleware
}