
require("dotenv").config()
const passport=require("passport");
const { UserModel } = require("../Models/user.model");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.googleclientid,
    clientSecret: process.env.googleclientsecret,
    callbackURL: "http://localhost:3000/user/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let Email=profile._json.email
      const user=await UserModel.findOne({Email})
      //console.log(user)

      if(!user){
        console.log("adding new user")
        let newuser=new UserModel({
          Email,
          Name:profile._json.name,
          Password:"12345678",
          Address:"abc",
          Gender:"Male",
          Role:"User",
          ismailverified:profile._json.email_verified
        })
        await newuser.save()
        return cb(null, newuser)
      }else{
        console.log("user is present db")
        return cb(null, user)

      }
    } catch (error) {
      console.log(error)
    }
    
    //console.log(profile)
    
  }
));

module.exports={passport}