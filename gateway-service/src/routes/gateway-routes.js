// gateway-service/src/routes/gateway.routes.js
const express = require('express');
const router = express.Router();
const { SERVICES } = require('../config/services-config');
const axios = require('axios');

// Orders Service Routes
router.get('/orders', async (req, res) => {
    try {
      console.log('Service URL:', SERVICES.orders);
      const response = await axios.get(`${SERVICES.orders}/orders`);
      res.json(response.data);
    } catch (error) {
      console.error('Gateway error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

router.get('/orders/:id', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.orders}/orders/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/orders/:id', async (req, res) => {
  try {
    const response = await axios.put(`${SERVICES.orders}/orders/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/orders/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${SERVICES.orders}/orders/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;