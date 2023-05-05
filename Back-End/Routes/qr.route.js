

const { Router } = require('express');

const qrRouter = Router();


const { textQrRouter, linkQrRouter, phoneQrRouter, whatsappQrRouter, upiQrRouter, emailQrRouter, zoomQrRouter, wifiQrRouter } = require('../Controllers/qr.controller');




qrRouter.post('/text', textQrRouter)


qrRouter.post('/link', linkQrRouter)


qrRouter.post('/phone', phoneQrRouter)


qrRouter.post('/whatsapp', whatsappQrRouter)


qrRouter.post('/upi', upiQrRouter)


qrRouter.post('/email', emailQrRouter)


qrRouter.post('/zoom', zoomQrRouter)


qrRouter.post('/wifi', wifiQrRouter)




module.exports = {
    qrRouter
}
