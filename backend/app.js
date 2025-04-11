var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Setup express app
var app = express();

// ✅ 1. CORS config (do this BEFORE anything else)
const corsOptions = {
  origin: 'https://lively-dune-0a1933f1e.6.azurestaticapps.net',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// ✅ 2. Logger and body parsing
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ 3. Static files (optional)
// app.use(express.static(path.join(__dirname, 'public')));

// ✅ 4. Add a debug logger (optional, for troubleshooting)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// ✅ 5. Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ✅ 6. Error handling (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;


