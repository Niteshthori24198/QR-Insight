
const mongoose = require('mongoose');

require('dotenv').config();

const connection = mongoose.connect(process.env.MongoURL);


module.exports = {
    connection
}