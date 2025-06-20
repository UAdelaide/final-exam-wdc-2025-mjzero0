

// clearing old data
db.query("DELETE FROM WalkRatings");
db.query("DELETE FROM WalkApplications");
db.query("DELETE FROM WalkRequsts");
db.query("DELETE FROM Dogs");
db.query("DELETE FROM Users");


//adding new data

db.query(`INSERT INTO Users (username, email, password_hash, role) VALUES
  ('alice123', 'alice@example.com', 'hashed123', 'owner'),
  ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
  ('carol123', 'carol@example.com', 'hashed789', 'owner')`);


  db.query(`INSERT INTO Dogs (owner_id, name, size) VALUES
  ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
  ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small')`);

  db.query(`INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
  ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
  ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted')`);
