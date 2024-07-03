const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));
app.use(morgan('dev'));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({limit: '100mb'}));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World The Jose' });
})

app.use('/recepcion', require('./routes/recepcion'));
app.use('/admin', require('./routes/admin'));
app.use('/usuario', require('./routes/usuario'));
app.use('/login', require('./routes/login'));

module.exports = app;