const mongoose=require("mongoose")

const blackschema=mongoose.Schema({
    token:{type:String}
})

const blackmodel=mongoose.model("blacktoken",blackschema)

module.exports={
    blackmodel
}