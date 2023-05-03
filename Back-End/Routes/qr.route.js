

const { Router } = require('express');

const QRCode = require('qrcode');

const qrRouter = Router();



qrRouter.post('/text', async (req, res) => {

    const { text, color } = req.body

    if (!text){
        return res.status(400).send({error : "Provide all required details"})
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
            dark: "#010599FF",
            light: "#FFBF60FF"
        }
    }



    
    try {

        QRCode.toDataURL(text, opts, function (err, url) {

            if (err){
                return res.status(400).send({
                    msg : "Something went wrong in data.",
                    err : err
                })
            }
    
            console.log(url)
    
            res.status(200).send({ "qrcode": url })
    
        })
        
    } catch (error) {
        
        return res.status(500).send({
            msg : "Something went wrong ",
            error : error
        })

    }


})


module.exports = {
    qrRouter
}
