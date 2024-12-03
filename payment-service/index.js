// payment-service/index.js
const express = require('express');
const sequelize = require('./src/config/database-config');
const paymentRoutes = require('./src/routes/payment-routes');

const app = express();
app.use(express.json());

app.use('/', paymentRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(3003, () => console.log('Payment service running on port 3003'));
  })
  .catch(error => console.error('Error syncing database:', error));