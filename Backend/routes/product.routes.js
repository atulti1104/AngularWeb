const express = require('express');
const router = express.Router();

// ✅ EXACT PATH (from routes → backend → data)
const products = require('../data/products.js');
router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

module.exports = router;
