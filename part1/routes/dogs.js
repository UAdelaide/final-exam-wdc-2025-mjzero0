const express = require('express');
const router = express.Router();
const db = require('../db');




router.get('/dogs', (req, res) => {
  const sql = 