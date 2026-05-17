const express = require('express');

module.exports = function createAuthRouter(db) {
  const router = express.Router();

  // Login endpoint
  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Prototype: password verification is mocked. Replace with hashed password verification in production.
      res.json({ message: 'Login successful', user });
    });
  });

  // Register endpoint
  router.post('/register', (req, res) => {
    const { name, email, phone, password, role } = req.body;

    db.run(
      'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, password, role],
      function (err) {
        if (err) return res.status(400).json({ error: 'Email might already exist' });
        res.json({ message: 'Registration successful', id: this.lastID });
      }
    );
  });

  return router;
};
