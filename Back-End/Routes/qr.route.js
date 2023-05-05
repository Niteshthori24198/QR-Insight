

const { Router } = require('express');

const QRCode = require('qrcode');

const qrRouter = Router();



// Color - Combinations

const COLOR_OBJ = {
    blue: {
        dark: "#00F",
        light: "#0000"
    },
    black: {
        dark: "#000000ff",
        light: "#ffffffff"
    },
    pink: {
        dark: "#FF007Fff",
        light: "#ffffffff"
    },
    brown: {
        dark: "#8B4513ff",
        light: "#ffffffff"
    },
    red: {
        dark: "#FF4136ff",
        light: "#ffffffff"
    },
    crimson: {
        dark: "#DC143Cff",
        light: "#ffffffff"
    },

}




// Generate QR code for Text.


qrRouter.post('/text', async (req, res) => {

    const { text, color } = req.body

    if (!text) {
        return res.status(400).send({ error: "Provide all required details" })
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: COLOR_OBJ[color]
    }




    try {

        QRCode.toDataURL(text, opts, function (err, url) {

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




// Generate QR code for URL Provided.



qrRouter.post('/link', async (req, res) => {

    const { URL, color } = req.body

    if (!URL) {
        return res.status(400).send({ error: "Provide all required details" })
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




// // Generate QR code for Phone Number.


qrRouter.post('/phone', async (req, res) => {

    const { phone, color } = req.body

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

    const URL = `tel:${phone}`


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




// Generate QR code for WhatsApp.


qrRouter.post('/whatsapp', async (req, res) => {

    const { phone, text, color } = req.body

    if (!phone || !text) {
        return res.status(400).send({ error: "Provide all required details" })
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: COLOR_OBJ[color]
    }

    const URL = `https://wa.me/${phone}/?text=${text}`


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





module.exports = {
    qrRouter
}
