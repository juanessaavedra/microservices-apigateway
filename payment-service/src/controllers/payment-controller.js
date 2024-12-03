// payment-service/src/controllers/payment.controller.js
const Payment = require('../models/payment-model');

const paymentController = {
  async processPayment(req, res) {
    try {
      const { orderId, amount } = req.body;
      
      // Simulación de procesamiento de pago (90% éxito)
      const success = Math.random() > 0.1;
      
      const payment = await Payment.create({
        orderId,
        amount,
        status: success ? 'completed' : 'failed'
      });
      
      res.json({
        success,
        paymentId: payment.id,
        status: payment.status
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = paymentController;