const { client } = require("../Config/redis");
const { blackmodel } = require("../Models/blackmodel");
const jwt=require("jsonwebtoken")
require("dotenv").config()



const middleware=async (req,res,next)=>{
    try {
        let token=await client.get('token');
        let refreshtoken=await client.get('refreshtoken');

        if(!token){
            return res.status(400).send({ "msg": "Please login first" });
        }

        let istokenblacklist=await blackmodel.findOne({token})
        if(istokenblacklist){
            return res.status(400).send({ msg: "not authorized" });
        }

        let decoded=jwt.verify(token,process.env.secretkey)
        if(!decoded){
            return res.status(400).send({ msg: "not authorized" });
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