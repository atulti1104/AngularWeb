const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/address', (req, res) => {

  console.log('BODY RECEIVED:', req.body); // 🔍 DEBUG

  const {
    name,
    mobile,
    fullAddress,
    city,
    state,
    pincode
  } = req.body || {};

  if (!name || !mobile || !fullAddress || !city || !state || !pincode) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const sql = `
    INSERT INTO orders_address
    (name, mobile, full_address, city, state, pincode)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, mobile, fullAddress, city, state, pincode],
    (err, result) => {
      if (err) {
        console.error('DB ERROR:', err); // 🔥 THIS WILL SHOW REAL PROBLEM
        return res.status(500).json({ message: 'Database error', error: err });
      }

      res.status(201).json({
        message: 'Address saved successfully',
        orderId: result.insertId
      });
    }
  );
});

module.exports = router;
