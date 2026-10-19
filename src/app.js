require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./routes'));

app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
