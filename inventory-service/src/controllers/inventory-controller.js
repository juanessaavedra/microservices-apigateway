// inventory-service/src/controllers/inventory.controller.js
const Product = require('../models/product-model');

const inventoryController = {
  async checkStock(req, res) {
    try {
      const { items } = req.body;
      let available = true;
      
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        if (!product || product.stock < item.quantity) {
          available = false;
          break;
        }
      }
      
      res.json({ available });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async restoreStock(req, res) {
    try {
      const { items } = req.body;
      
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        if (product) {
          await product.increment('stock', { by: item.quantity });
        }
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = inventoryController;