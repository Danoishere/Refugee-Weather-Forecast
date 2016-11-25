var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var index = require('./routes/index');
var weather = require('./routes/weather');
var manageLocations = require('./locations/manageLocations');
var users = require('./routes/users');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var i18n = require("i18n");
var storage = require('node-persist');
//console.log(_('Hello, World!'));

var app = express();

var hbs = expressHbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  helpers: {
    __: function () {  return i18n.__.apply(this, arguments); },
    __n: function () { return i18n.__n.apply(this, arguments); },
    toLower: function() {
      if(arguments !== undefined && arguments['0'] !== undefined){
        return arguments['0'].toLowerCase();
      }else{
        return '';
      }
    }
  }
});

manageLocations.addLocation('Zürich','CH','39.269036','26.507553');

// view engine setup
app.engine('.hbs', hbs);
app.set('view engine', 'hbs');

app.use(cookieParser());

// set up language
i18n.configure({
  defaultLocale: 'en',
  cookie: 'locale',
  fallbacks: {
    'fa': 'en',
    'ar':'en'
  },
  queryParameter: 'lang',
  directoryPermissions: '755',
  autoReload: true,
  updateFiles: true,
  locales:['en', 'ar','fa'],
  directory: __dirname + '/locales'
});


app.get('/fa', function (req, res) {
  res.cookie('locale', 'fa', { maxAge: 900000, httpOnly: true });
  res.redirect('back');
});
app.get('/ar', function (req, res) {
  res.cookie('locale', 'ar', { maxAge: 900000, httpOnly: true });
  res.redirect('back');
});
app.get('/en', function (req, res) {
  res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true });
  res.redirect('back');
});
app.use(i18n.init);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/weather', weather);
app.use('/users', users);

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
