// To access an SQLite database, you can use the sqlite3 module for Node.js.
// Here is an example of how you can modify the code to use an SQLite database:



const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Open database connection
const db = new sqlite3.Database('mydb.sqlite3');

// Parse incoming JSON data
app.use(bodyParser.json());

// Authentication endpoint
app.post('/authenticate', (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  // Check if user exists and password matches
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.get(sql, [username, password], (err, row) => {
    if (err) {
      return resS.status(500).json({ message: 'Internal server error' });
    }
    if (!row) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate authentication token
    const token = jwt.sign({ sub: row.username }, 'secretkey', { expiresIn: '1h' });

    // Send response with token
    res.status(200).json({ token });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// in this example, we open a connection to an SQLite database using the sqlite3 module
//  and use a SQL query to check if the user exists and the password matches. 
//  If the authentication is successful, we generate an authentication token and send it back to the client.

// Note that you will need to create a table called users in your SQLite database with columns for username and password.
//  You can use the following SQL command to create the table:


// sql
// Copy code
// CREATE TABLE users (
//   username TEXT PRIMARY KEY,
//   password TEXT NOT NULL
// );