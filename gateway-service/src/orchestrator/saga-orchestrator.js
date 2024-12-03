// gateway-service/src/orchestrator/saga.orchestrator.js
const axios = require('axios');
const { SERVICES } = require('../config/services-config');

class SagaOrchestrator {
  async createOrder(orderData) {
    try {
      const order = await axios.post(`${SERVICES.orders}/orders`, orderData);
      const inventoryCheck = await axios.post(`${SERVICES.inventory}/check`, {
        items: orderData.items
      });
      
      if (!inventoryCheck.data.available) {
        await axios.delete(`${SERVICES.orders}/orders/${order.data.id}`);
        throw new Error('Inventario insuficiente');
      }
      
      const payment = await axios.post(`${SERVICES.payment}/process`, {
        orderId: order.data.id,
        amount: orderData.total
      });
      
      if (!payment.data.success) {
        await axios.delete(`${SERVICES.orders}/orders/${order.data.id}`);
        await axios.post(`${SERVICES.inventory}/restore`, {
          items: orderData.items
        });
        throw new Error('Pago fallido');
      }
      
      return { success: true, orderId: order.data.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = SagaOrchestrator;