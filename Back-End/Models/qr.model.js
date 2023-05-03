

const mongoose = require('mongoose');

const { UserModel } = require('./user.model');


const qrSchema = mongoose.Schema({

    UserID : { type : mongoose.Schema.Types.ObjectId, ref : UserModel, required : true },
    QRCodes : [
        {
            Formate : { type : String, required : true },
            Detail : { type : String, required : true },
            QR : { type : String, required : true }
        }
    ]

}, {

    versionKey : false,
    timestamps :true

});



const QRModel = mongoose.model("qr", qrSchema);



module.exports = {
    QRModel
}