var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressLayouts=require("express-ejs-layouts");
var validator = require('express-validator');
var flash = require('connect-flash');

var mongo = require('mongodb');
var monk = require('monk');
var db;

var terms = require('./routes/terms');
var tags = require('./routes/tags');
var definitions = require('./routes/definitions');

if (process.env.NODE_ENV === "production") {
  db = monk(process.env.MONGODB_URI);
}
else if (process.env.NODE_ENV === "test") {
  db = monk('localhost:27017/developers-dictionary-test');
}
else {
  db = monk('localhost:27017/developers-dictionary-development');
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
   secret: 'secret',
   proxy: true,
   resave: true,
   saveUninitialized: true
}));
app.use(flash());

app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', terms);
app.use('/tags', tags);
app.use('/definitions', definitions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
