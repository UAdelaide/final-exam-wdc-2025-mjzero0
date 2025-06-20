const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/walkers/summary', (req, res) => {
  const query = `
    SELECT u.username AS walker_username,
           COUNT(r.rating) AS total_ratings,
           ROUND(AVG(r.rating), 1) AS average_rating,
           SUM(r.completed IS TRUE) AS completed_walks
    FROM Users u
    LEFT JOIN WalkRatings r ON u.user_id = r.walker_id
    WHERE u.role = 'walker'
    GROUP BY u.username
  `;





 db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;