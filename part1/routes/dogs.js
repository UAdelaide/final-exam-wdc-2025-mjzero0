const express = require('express');
const router = express.Router();


module.exports = (db) => {


router.get('/dogs', async (req, res) => {


    try {
      const [rows] = await db.execute(`
        SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
        FROM Dogs
        JOIN Users ON Dogs.owner_id = Users.user_id
      `);
      res.json(rows);
    } catch (err) {
      console.error('Error fetching dogs:', err);
      res.status(500).json({ error: 'Failed to fetch dogs' });
    }
  });

  return router;
};