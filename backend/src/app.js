const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit:'50mb'}));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World The Jose' });
})

app.use('/recepcion', require('./routes/recepcion'));
app.use('/admin', require('./routes/admin'));
app.use('/usuario', require('./routes/usuario'));

module.exports = app;