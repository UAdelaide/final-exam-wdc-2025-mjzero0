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
