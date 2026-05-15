const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Get all bookings for a user
    router.get('/', (req, res) => {
        const { userId, role } = req.query;
        
        let query = 'SELECT * FROM bookings';
        let params = [];

        if (userId) {
            query += role === 'provider' ? ' WHERE provider_id = ?' : ' WHERE customer_id = ?';
            params.push(userId);
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    });

    return router;
};