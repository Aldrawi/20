
const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample endpoint to save data
app.post('/api/save', (req, res) => {
  const { name, value } = req.body;
  const query = 'INSERT INTO saved_data (name, value) VALUES (?, ?)';
  db.query(query, [name, value], (err, result) => {
    if (err) {
      console.error('❌ Error inserting data:', err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Sample endpoint to fetch data
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM saved_data', (err, results) => {
    if (err) {
      console.error('❌ Error fetching data:', err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, data: results });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
