var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');

var app = express();

// View engine setup.
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register Handlebars partials.
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Register application routes before static files so that / and /travel
// are rendered by the MVC controllers instead of public HTML files.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);

// Serve CSS, images, and the remaining static customer-facing pages.
app.use(express.static(path.join(__dirname, 'public')));

// Catch 404 and forward to the error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler.
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;