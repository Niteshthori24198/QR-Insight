require('dotenv').config();
const passport1 = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { UserModel } = require('../Models/user.model');

passport1.use(new FacebookStrategy({
    clientID: process.env.facebookid,
    clientSecret: process.env.facebookkey,
    callbackURL: "http://localhost:3000/user/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
   
    console.log(profile)
    return cb(null, "user");
  }
));

module.exports={
    passport1
}