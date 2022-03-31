var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var port = process.env.PORT || 3000;
require('dotenv').config()
require('./db/db.js')

var indexRouter = require('./routes/index');

var accountRouter = require('./routes/accounts');
var categoryRouter = require('./routes/categories');
var transectionRouter = require('./routes/transections');

var app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Plug router
 // root server
app.use('/accounts', accountRouter);
app.use('/categories', categoryRouter);
app.use('/transections', transectionRouter);
// app.use('/', indexRouter);
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});

module.exports = app;
