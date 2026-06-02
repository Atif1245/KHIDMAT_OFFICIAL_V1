const express = require('express');

module.exports = function createAuthRouter(db) {
  const router = express.Router();

  // Login endpoint
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: 'Invalid email or password' });

      res.json({ message: 'Login successful', user });
    });
  });

  // Register endpoint
  router.post('/register', (req, res) => {
    const { name, email, phone, password, role } = req.body;
    const normalizedRole = role || 'customer';

    db.run(
      'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, password, normalizedRole],
      function (err) {
        if (err) {
          const message = err.message.includes('UNIQUE') ? 'Email is already registered' : err.message;
          return res.status(400).json({ error: message });
        }

        db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (getErr, user) => {
          if (getErr) return res.status(500).json({ error: getErr.message });
          res.status(201).json({ message: 'Registration successful', user });
        });
      }
    );
  });

  return router;
};
