const mongoose = require("mongoose")
const feedSchema = mongoose.Schema({
       name:{type:String,required:true},
       email:{type:String,required:true},
       message:{type:String,required:true}

},{
    versionKey:false
})

const feedmodel = mongoose.model("feedback",feedSchema)
module.exports={feedmodel}