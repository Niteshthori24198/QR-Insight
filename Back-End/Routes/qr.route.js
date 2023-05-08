

const { Router } = require('express');

const qrRouter = Router();


const { textQrRouter, linkQrRouter, phoneQrRouter, whatsappQrRouter, upiQrRouter, emailQrRouter, zoomQrRouter, wifiQrRouter, vcardQrRouter } = require('../Controllers/qr.controller');


const { middleware } = require('../Middlewares/auth.middleware');



// protected route checking middleware
qrRouter.use(middleware)

qrRouter.post('/text', textQrRouter)


qrRouter.post('/link', linkQrRouter)


qrRouter.post('/phone', phoneQrRouter)


qrRouter.post('/whatsapp', whatsappQrRouter)


qrRouter.post('/upi', upiQrRouter)


qrRouter.post('/email', emailQrRouter)


qrRouter.post('/zoom', zoomQrRouter)


qrRouter.post('/wifi', wifiQrRouter)


qrRouter.post("/vcard" , vcardQrRouter)


module.exports = {
    qrRouter
}
