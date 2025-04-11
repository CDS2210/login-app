var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// ✅ CORS setup FIRST
const corsOptions = {
  origin: 'https://lively-dune-0a1933f1e.6.azurestaticapps.net',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200 // 👈 Prevents issues with legacy clients
};

app.use(cors(corsOptions));

// ✅ Explicitly handle OPTIONS preflight for all routes
app.options('*', cors(corsOptions));

// Continue with the rest
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

