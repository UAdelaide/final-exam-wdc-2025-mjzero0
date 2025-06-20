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





app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});