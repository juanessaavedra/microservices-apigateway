// order-service/index.js
const express = require('express');
const sequelize = require('./src/config/database-config');
const orderRoutes = require('./src/routes/order-routes');

const app = express();
app.use(express.json());

app.use('/', orderRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(3001, () => console.log('Order service running on port 3001'));
  })
  .catch(error => console.error('Error syncing database:', error));