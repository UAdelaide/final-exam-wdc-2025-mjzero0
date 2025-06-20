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



//testing data
db.query(`INSERT INTO Users (username, email, password_hash, role) VALUES
  ('alice123', 'alice@example.com', 'hashed123', 'owner'),
  ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
  ('carol123', 'carol@example.com', 'hashed789', 'owner')
`);

db.query(`INSERT INTO Dogs (owner_id, name, size) VALUES
  ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
  ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small')`);