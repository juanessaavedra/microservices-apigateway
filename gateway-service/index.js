const express = require('express');
const SagaOrchestrator = require('./src/orchestrator/saga-orchestrator');
const gatewayRoutes = require('./src/routes/gateway-routes');

const app = express();
app.use(express.json());

const sagaOrchestrator = new SagaOrchestrator();

// Saga orchestration route
app.post('/orders', async (req, res) => {
  const result = await sagaOrchestrator.createOrder(req.body);
  res.json(result);
});

// CRUD routes
app.use('/', gatewayRoutes);

app.listen(3000, () => console.log('Gateway running on port 3000'));