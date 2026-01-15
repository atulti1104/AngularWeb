const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();
// LOGIN
router.post('/login', (req, res) => {
  const { identifier, password } = req.body;
  // identifier = email OR username

  if (!identifier || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [identifier, identifier],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'DB error' });

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not registered' });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // ✅ LOGIN SUCCESS
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
       console.log(user);
    }
   
  );
});
  

// SIGNUP
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  // check existing user
  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'DB error' });

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // insert user
      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err) => {
          if (err) return res.status(500).json({ message: 'Insert failed' });

          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    }
  );
});

module.exports = router;
