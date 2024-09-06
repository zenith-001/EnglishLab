// server.js
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',   // MySQL host
  user: 'root',        // MySQL username
  password: '',        // MySQL password (default is empty in XAMPP)
  database: 'english_lab'  // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

// Serve static files (like HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch data from MySQL (example route)
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM movies_list', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data from the database.');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});