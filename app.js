var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose')

var indexRouter = require('./routes/index');

var app = express();
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/NNPTUD-C4';
var dbStatus = 'connecting';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', function (req, res) {
  res.send({
    status: 'ok',
    database: dbStatus
  });
});

app.use('/', indexRouter);
//localhost:3000/users
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/roles', require('./routes/roles'));
app.use('/api/v1/products', require('./routes/products'))
app.use('/api/v1/categories', require('./routes/categories'))
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/inventory', require('./routes/inventory'))

mongoose.connect(mongoUri)
  .then(function () {
    dbStatus = 'connected';
    console.log('connected');
  })
  .catch(function (error) {
    dbStatus = 'unavailable';
    console.error('MongoDB connection failed:', error.message);
  });

mongoose.connection.on('connected', function () {
  dbStatus = 'connected';
  console.log('connected');
});

mongoose.connection.on('error', function (error) {
  dbStatus = 'unavailable';
  console.error('MongoDB error:', error.message);
});

mongoose.connection.on('disconnected', function () {
  dbStatus = 'disconnected';
  console.log('disconnected');
});

mongoose.connection.on('disconnecting', function () {
  dbStatus = 'disconnecting';
  console.log('disconnecting');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  if (req.originalUrl.startsWith('/api/') || req.accepts('json')) {
    return res.send({
      message: err.message
    });
  }

  res.render('error');
});

module.exports = app;
