var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//1. Configure "body-parser" to handle form data
var bodyParser = require('body-parser')
bodyParser.urlencoded({ extended: false })

//2. Connect MongoDB using "mongoose"
var mongoose = require('mongoose')
// Note: "toygame" is the database name
var db= "mongodb+srv://anhktgch211377:thTf0JNXMXabavuF@cluster0.gf0g2.mongodb.net/toygame"
mongoose.connect(db)
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error('Database connection error: ' + err))

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//3. Declare & use ToyRouter
var ToyRouter = require('./routes/toy');
app.use('/toy', ToyRouter);

// Handle 404 errors
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Configure the server port (default: 3001)
var port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Server is running at: http://localhost:" + port)
})

module.exports = app;
