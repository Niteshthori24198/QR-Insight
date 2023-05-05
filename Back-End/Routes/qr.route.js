

const { Router } = require('express');

const QRCode = require('qrcode');

const { textQrRouter, linkQrRouter, phoneQrRouter } = require('../Controllers/qr.controller');


const qrRouter = Router();



qrRouter.post('/text', textQrRouter)



qrRouter.post('/link', linkQrRouter)




qrRouter.post('/phone', phoneQrRouter)




// Generate QR code for WhatsApp.


qrRouter.post('/whatsapp', async (req, res) => {

    const { phone, text, color } = req.body

    if (!phone) {
        return res.status(400).send({ error: "Provide all required details" })
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: COLOR_OBJ[color]
    }


    let msg = text.split(' ').join('%20');

    msg = msg.split('\n').join('%0A')

    const URL = `https://wa.me/${phone}/?text=${msg}`;
    
    // console.log(URL);


    try {

        QRCode.toDataURL(URL, opts, function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


})



// Generate QR code for UPI ID.


qrRouter.post('/upi', async (req, res) => {

    const { upi, amount, name, color } = req.body

    if (!upi) {
        return res.status(400).send({ error: "Provide all required details" })
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: COLOR_OBJ[color]
    }

    const URL = `upi://pay?pa=${upi}&pn=${name}&am=${amount}`


    try {

        QRCode.toDataURL(URL, opts, function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


})





// Generate QR code for Email


qrRouter.post('/email', async (req, res) => {

    const { mailto, subject, body, color } = req.body

    

    if ( !mailto ) {
        return res.status(400).send({ error: "Provide all required details" })
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: COLOR_OBJ[color]
    }

    const URL = `mailto:${mailto}?subject=${subject}&body=${body}`


    try {

        QRCode.toDataURL(URL, opts, function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


})







// Generate QR code for Zoom


qrRouter.post('/zoom', async (req, res) => {

    const { meetingId, meetingLink, color } = req.body

    

    if ( !meetingId && !meetingLink ) {
        return res.status(400).send({ error: "Provide all required details" })
    }



    let URL;

    if(meetingId){

        URL = `https://zoom.us/j/${meetingId}`;

    }else{

        URL = meetingLink;
    }



    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: COLOR_OBJ[color]
    }



    try {

        QRCode.toDataURL(URL, opts, function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


})




// Generate QR code for WIFI Network.


qrRouter.post('/wifi', async (req, res) => {

    const { ssid, password, encryption, color } = req.body

    if (!ssid || !password) {
        return res.status(400).send({ error: "Provide all required details" })
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: COLOR_OBJ[color]
    }

    const URL = `WIFI:T:${encryption};S:${ssid};P:${password};;`


    try {

        QRCode.toDataURL(URL, opts, function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


})






module.exports = {
    qrRouter
}
