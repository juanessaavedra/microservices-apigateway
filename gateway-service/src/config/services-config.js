// gateway-service/src/config/services.config.js
require('dotenv').config();

module.exports = {
  SERVICES: {
    orders: process.env.ORDER_SERVICE_URL,
    inventory: process.env.INVENTORY_SERVICE_URL,
    payment: process.env.PAYMENT_SERVICE_URL
  }
};