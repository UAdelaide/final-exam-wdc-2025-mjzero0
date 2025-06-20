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


db.query(`INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments, completed) VALUES
  (?,
   (SELECT user_id FROM Users WHERE username = 'bobwalker'),
   (SELECT user_id FROM Users WHERE username = 'alice123'),
   5, 'Great walk', true)`,
  [requestId],
  (err) => {
    if (err) return console.error("WalkRating insert error:", err.message);
    console.log("✅ Test data inserted");
});
