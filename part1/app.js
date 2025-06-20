const express = require('express');
const app = express();
const db = require('./db');


const dogsRoutes = require('./routes/dogs');
const walkRequestsRoutes = require('./routes/walkrequests');
const walkersRoutes = require('./routes/walkers');



app.use(express.json());
app.use('/api', dogsRoutes);
app.use('/api', walkRequestsRoutes);
app.use('/api', walkersRoutes);



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


db.query("DELETE FROM WalkRatings");
db.query("DELETE FROM WalkApplications");
db.query("DELETE FROM WalkRequests");
db.query("DELETE FROM Dogs");
db.query("DELETE FROM Users");

// data testing
db.query(`INSERT INTO Users (username, email, password_hash, role) VALUES
  ('alice123', 'alice@example.com', 'hashed123', 'owner'),
  ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
  ('carol123', 'carol@example.com', 'hashed789', 'owner')`, (err) => {
  if (err) return console.error("User insert error:", err.message);

  db.query(`INSERT INTO Dogs (owner_id, name, size) VALUES
    ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
    ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small')`, (err) => {
    if (err) return console.error("Dog insert error:", err.message);

    db.query(`INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
      VALUES ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open')`,
      (err, result) => {
        if (err) return console.error("WalkRequest insert error:", err.message);

        const requestId = result.insertId;



        db.query(`INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments, completed) VALUES
          (?,
          (SELECT user_id FROM Users WHERE username = 'bobwalker'),
          (SELECT user_id FROM Users WHERE username = 'alice123'),
          5, 'Great walk', true)`,
        [requestId], (err) => {
          if (err) return console.error("WalkRating insert error:", err.message);
          console.log("Test data inserted");
        });
    });
  });
});