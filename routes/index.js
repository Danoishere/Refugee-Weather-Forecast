var express = require('express');
var router = express.Router();
var i18n = require("i18n");
var ManageLocations = require('../locations/manageLocations');

/* GET home page. */
router.get('/', function(req, res, next) {
  var locations = ManageLocations.getAllLocations();
  res.render('index', {language: i18n.getLocale(req), locations: locations });
});

module.exports = router;
