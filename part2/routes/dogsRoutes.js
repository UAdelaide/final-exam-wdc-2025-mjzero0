//newly created file

const express = require('express');
const router = express.Router();
const db = require('../models/db'); // adjust path if your db client is elsewhere

router.get('/dogs', async (req, res) => {
  const query = `
    SELECT d.name    AS dog_name,
           d.size,
           u.username AS owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
  `;
  try {
    const [ rows ] = await db.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;