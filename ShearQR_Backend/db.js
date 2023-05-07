
const mongoose = require('mongoose');

require('dotenv').config();

const connection = mongoose.connect(process.env.mongo_url);

const qrShcema = mongoose.Schema({
    qrcode : {type:String, required:true}
},{
    versionKey : false
})

const QRModel = mongoose.model('qr',qrShcema);

module.exports = {
    connection,
    QRModel
}