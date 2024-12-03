// payment-service/src/routes/payment.routes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');

router.post('/process', paymentController.processPayment);

module.exports = router;