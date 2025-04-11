const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// ✅ Configure CORS properly
const corsOptions = {
  origin: 'https://lively-dune-0a1933f1e.6.azurestaticapps.net',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support

// ✅ Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ✅ Error Handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;



