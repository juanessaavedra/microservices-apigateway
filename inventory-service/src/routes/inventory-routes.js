// inventory-service/src/routes/inventory.routes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory-controller');

router.post('/check', inventoryController.checkStock);
router.post('/restore', inventoryController.restoreStock);

module.exports = router;