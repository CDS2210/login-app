var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// ✅ 1. CORS configuration object
const corsOptions = {
  origin: 'https://lively-dune-0a1933f1e.6.azurestaticapps.net',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

// ✅ 2. Handle preflight requests **first**
app.options('*', cors(corsOptions));

// ✅ 3. Then apply CORS middleware globally
app.use(cors(corsOptions));

// ✅ 4. Standard middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Optional static
// app.use(express.static(path.join(__dirname, 'public')));

// ✅ 5. Debug logger (optional)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// ✅ 6. Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ✅ 7. Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;



