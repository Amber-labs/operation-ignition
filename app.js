var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* Mongoose */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ignite');
var db = mongoose.connection;
/* End of Mongoose */
//Express sessions
var session = require('express-session');
//Express validator
var expressValidator = require('express-validator');
/* Passport */
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
/* End of Passport */

var index = require('./routes/index');
var users = require('./routes/accounts');
var api = require('./routes/api');
var accounts = require('./routes/accounts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//public assets
app.use(express.static(path.join(__dirname, 'public')));
// redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
// redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
//redirect JS angularjs
app.use('/js', express.static(__dirname + '/node_modules/angular'));
// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Express Session
app.use(session({
    //temporary secret
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport initialize
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'), root = namespace.shift(),formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//Global attributes
app.use(function(req,res, next){
    res.locals.user =req.user || null;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/api', api);
app.use('/accounts', accounts);

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
