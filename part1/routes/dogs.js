const express = require('express');
const router = express.Router();

const db = require('../db');


router.get('/dogs', (req, res) => {


const query = '
SELECT d.name AS dog_name, d.size, u.username AS owner_username
FROM Dogs d
JOIN Users u ON d.owner_id = u.user_id





'



}