

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    Name : { type : String, required : true },
    Email : { type : String, required : true, unique : true },
    Password : { type : String, required : true },
    Address : { type : String, required : true },
    Gender : { type : String, enum : ["Male", "Female", "Other"],  required : true, default : "Other" },
    Role : { type : String, enum : ["User", "Admin"], required : true, default : "User" },
    ismailverified:Boolean

}, {
    versionKey : false,
    timestamps :true
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}