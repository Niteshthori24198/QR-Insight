
const express = require('express');

const app = express();

const cors = require('cors');

const { connection, QRModel } = require('./db');

require('dotenv').config();

app.use(cors());

app.use(express.json());




app.post('/saveQr', async (req,res)=>{

    const { qrcode } = req.body;

    // console.log(req.body);

    try {

        const newQR = new QRModel({qrcode});

        await newQR.save();

        res.send( { QR : newQR } ) ;

    } catch (error) {

        res.send({error:error});

    }


})



app.get('/getQr/:ID', async (req,res)=>{

    const {ID} = req.params;

    try {

        const qr = await QRModel.findOne({_id:ID});
        
        res.send({ QR : qr } );

    } catch (error) {

        res.send( { error : error } );

    }
})


app.listen(process.env.port, async () => {

    try {

        await connection;

        console.log('db connected');

    } catch (error) {

        console.log(error);

    }

    console.log('server is runnning');
})