


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

        QRCode.toDataURL(URL, opts, function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
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

        QRCode.toDataURL(URL, opts, function (err, url) {

            if (err) {
                return res.status(400).send({
                    msg: "Something went wrong in data.",
                    err: err
                })
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
    phoneQrRouter
}