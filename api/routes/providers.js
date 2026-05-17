const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // 1. Saare providers lene ke liye (Customer side ke liye)
    router.get('/', (req, res) => {
        const query = 'SELECT * FROM users WHERE role = "provider"';
        db.all(query, [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // 2. Sirf ek specific provider ki profile ke liye (Yeh naya route hai)
    router.get('/profile/:id', (req, res) => {
        const providerId = req.params.id;
        const query = 'SELECT id, name, email, category, price_range, bio FROM users WHERE id = ? AND role = "provider"';
        
        db.get(query, [providerId], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ message: "Provider not found" });
            res.json(row);
        });
    });

    return router;
};