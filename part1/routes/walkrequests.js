const express = require ('express');
const router= express.Router();
const db = require('../db');



router.get('/walkrequests/open', (req, res) => {
  const query = `
    SELECT wr.request_id, d.name AS dog_name, wr.requested_time,
           wr.duration_minutes, wr.location, u.username AS owner_username
    FROM WalkRequests wr
    JOIN Dogs d ON wr.dog_id = d.dog_id
    JOIN Users u ON d.owner_id = u.user_id
    WHERE wr.status = 'open'
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports= router;