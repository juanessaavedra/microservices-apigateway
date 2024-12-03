const Order = require('../models/order-model');

const orderController = {
  async createOrder(req, res) {
    try {
      const order = await Order.create(req.body);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOrderById(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateOrder(req, res) {
    try {
      const [updated] = await Order.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).json({ message: 'Order not found' });
      const updatedOrder = await Order.findByPk(req.params.id);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteOrder(req, res) {
    try {
      await Order.destroy({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = orderController;