const express = require ('express');
const app = express();
const db = require('./db');

const dogsRoutes = require('./routes/dogs');
const walkRequestsRoutes = require ('./routes/walkerRequests');
const walkerRoutes = require('./routes/walkers');



app.use(express.json());
app.use('/api', dogsRoutes);
app.use('/api', walkRequestsRoutes);
app.use