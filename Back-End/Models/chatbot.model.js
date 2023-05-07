const mongoose = require("mongoose")
const querySchema = mongoose.Schema({
       name:{type:String,required:true},
       email:{type:String,required:true},
       message:{type:String,required:true}

},{
    versionKey:false
})

const querymodel = mongoose.model("query",querySchema)
module.exports={querymodel}