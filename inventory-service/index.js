// inventory-service/index.js
const express = require('express');
const sequelize = require('./src/config/database-config');
const inventoryRoutes = require('./src/routes/inventory-routes');

const app = express();
app.use(express.json());

app.use('/', inventoryRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(3002, () => console.log('Inventory service running on port 3002'));
  })
  .catch(error => console.error('Error syncing database:', error));