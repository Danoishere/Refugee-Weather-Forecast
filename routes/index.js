var express = require('express');
var router = express.Router();
var storage = require('node-persist');

storage.initSync();

/* GET home page. */
router.get('/', function(req, res, next) {
  var locations = storage.valuesWithKeyMatch('loc:');
  res.render('index', { title: res.__('Hello'), locations:locations });
});

module.exports = router;
