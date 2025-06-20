const mysql = require('mysql2');



const db = mysql.createConnection({


host: 'localhost',
user: 'root',
password: '',
database: 'DogWalkService'



});


db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
  }
});




module.exports = db;



