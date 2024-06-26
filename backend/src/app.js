const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World The Jose' });
})

module.exports = app;