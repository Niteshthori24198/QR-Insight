const mongoose=require("mongoose")

const blackschema=mongoose.Schema({
    token:String,
    refreshtoken:String
})

const blackmodel=mongoose.model("blacktoken",blackschema)

module.exports={
    blackmodel
}