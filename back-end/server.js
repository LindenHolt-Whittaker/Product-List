const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Database
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Endpoints
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/products', (req, res) => {
  db.all(`SELECT * FROM products WHERE product_id > ${req.query.from} AND product_id <= ${req.query.to}`, (err, rows) => {
    res.send(rows);
  });
});
