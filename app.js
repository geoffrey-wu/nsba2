var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var editBioRouter = require('./routes/edit-bio');
var editPasswordRouter = require('./routes/edit-password');
var editProfileRouter = require('./routes/edit-profile');
var combineRouter = require('./routes/combine');
var draftRouter = require('./routes/draft');
var draftOrderRouter = require('./routes/draft-order');
var gmRouter = require('./routes/gms');
var loginRouter = require('./routes/login');
var mockDraftRouter = require('./routes/mock-draft');
var myTeamRouter = require('./routes/my-team');
var playersRouter = require('./routes/players');
var playoffsRouter = require('./routes/playoffs');
var profileRouter = require('./routes/profile');
var rrRouter = require('./routes/rr');
var rulesRouter = require('./routes/rules');
var signupRouter = require('./routes/signup');
var staffRouter = require('./routes/staff');
var teamsRouter = require('./routes/teams');

var apiRouter = require('./routes/api');

var cssRouter = require('./routes/_css');
var imageRouter = require('./routes/_images');
var jsRouter = require('./routes/_scripts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: 3145728 })); // 3 MB (for sending pictures)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.secretKey1 ? process.env.secretKey1 : 'secretKey1', process.env.secretKey2 ? process.env.secretKey2 : 'secretKey2']
}));
app.use(express.static(path.join(__dirname, 'public')));

// set rootPath so I can use it later
app.use((req, res, next) => {
    req.rootPath = __dirname;
    next();
});

app.use('/', indexRouter);
app.use('/edit-bio', editBioRouter);
app.use('/edit-password', editPasswordRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/combine', combineRouter);
app.use('/draft', draftRouter);
app.use('/draft-order', draftOrderRouter);
app.use('/gms', gmRouter);
app.use('/login', loginRouter);
app.use('/mock-draft', mockDraftRouter);
app.use('/my-team', myTeamRouter);
app.use('/players', playersRouter);
app.use('/playoffs', playoffsRouter);
app.use('/players', playersRouter);
app.use('/profile', profileRouter);
app.use('/rr', rrRouter);
app.use('/rules', rulesRouter);
app.use('/signup', signupRouter);
app.use('/staff', staffRouter);
app.use('/teams', teamsRouter);

app.use('/*.css', cssRouter);
app.use('/*.js', jsRouter);
app.use('/*.png', imageRouter);

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Light socket.io to update draft picks real-time.
 * Note: only used to update *display*.
 * No socket calls affect who is actually drafted.
 */
var { Server } = require('socket.io');
var URLorigin;
if (process.env.NODE_ENV === 'production') {
    URLorigin = "https://nsba2.herokuapp.com";
} else {
    URLorigin = "http://localhost:3000";
}

const io = new Server(6700, {
    cors: {
        origin: URLorigin,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log('user connected to socket at port 6700');

    socket.on('new pick', (data) => {
        io.emit('new pick', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

module.exports = app;
