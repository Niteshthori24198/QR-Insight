

const QRCode = require('qrcode');
const { QRModel } = require('../Models/qr.model');



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

async function saveQR_CodeIn_DB(UserID,QRCodes){
    try {
        await QRModel.findOneAndUpdate({UserID},{UserID, $push:{QRCodes:QRCodes}},{new:true, upsert:true, setDefaultsOnInsert:true})
        return "ok"
    } catch (error) {
        return error
    }
}


const textQrRouter = async (req, res) => {

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


    const URL = `https://display-msg-qrinsight.netlify.app/?text=${text}`

    try {

        QRCode.toDataURL(URL, opts, async function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)
            

            const UserID = req.id;
            const QRCodes = {
                Formate : "text",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}




const linkQrRouter = async (req, res) => {

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

        QRCode.toDataURL(URL, opts, async function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }


            const UserID = req.id;
            const QRCodes = {
                Formate : "link",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }


            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}

const phoneQrRouter = async (req, res) => {

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

        QRCode.toDataURL(URL, opts, async function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }


            const UserID = req.id;
            const QRCodes = {
                Formate : "phone",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }


            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}

const whatsappQrRouter = async (req, res) => {

    const { phone, text, color } = req.body

    // if (!phone) {
    //     return res.status(400).send({ error: "Provide all required details" })
    // }

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
    


    try {

        QRCode.toDataURL(URL, opts, async function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }


            const UserID = req.id;
            const QRCodes = {
                Formate : "whatsapp",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}

const upiQrRouter = async (req, res) => {

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

        QRCode.toDataURL(URL, opts, async function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            const UserID = req.id;
            const QRCodes = {
                Formate : "upi",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}

const emailQrRouter = async (req, res) => {

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

        QRCode.toDataURL(URL, opts, async function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            const UserID = req.id;
            const QRCodes = {
                Formate : "email",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}

const zoomQrRouter = async (req, res) => {

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

        QRCode.toDataURL(URL, opts, async  function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            const UserID = req.id;
            const QRCodes = {
                Formate : "zoom",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}

const wifiQrRouter = async (req, res) => {

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

        QRCode.toDataURL(URL, opts, async function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)
            const UserID = req.id;
            const QRCodes = {
                Formate : "wifi",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}




const vcardQrRouter = async (req, res) => {

    const { name, email, phone,address,company,position,website,color } = req.body;

    
    if (!name || !email || !phone) {
        return res.status(400).send({ error: "Provide all required details" })
    }


    const URL = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nADR:${address}\nORG:${company}\nTITLE:${position}\nURL:${website}\nEND:VCARD`;

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: COLOR_OBJ[color]
    }


    try {

        QRCode.toDataURL(URL, opts, async function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
            }

            // console.log(url)

            const UserID = req.id;
            const QRCodes = {
                Formate : "vcard",
                Detail : URL,
                QR : url
            }

            let r = await saveQR_CodeIn_DB(UserID,QRCodes);
            console.log(r);
            
            if(r!=="ok"){
                //    Logger for show error
                console.log(r);
            }

            res.status(200).send({ "qrcode": url })

        })

    } catch (error) {

        return res.status(500).send({
            msg: "Something went wrong ",
            error: error
        })

    }


}






module.exports = {
    textQrRouter,
    linkQrRouter,
    phoneQrRouter,
    whatsappQrRouter,
    upiQrRouter,
    emailQrRouter,
    zoomQrRouter,
    wifiQrRouter,
    vcardQrRouter
}