var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var staffRouter = require('./routes/staff');

var apiRouter = require('./routes/api');

var imageRouter = require('./routes/images');
var jsRouter = require('./routes/javascript');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set rootPath so I can use it later
app.use((req, res, next) => {
    req.rootPath = __dirname;
    next();
});

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/staff', staffRouter);

app.use('/*.js', jsRouter);
app.use('/*.png', imageRouter);

app.use('/api', apiRouter);

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

module.exports = app;
