var express = require('express');
var router = express.Router();
var weatherService = require('./../weather/WeatherService');
var storage = require('node-persist');

router.get('/refresh', function(req, res, next){
  var updateResult = weatherService.updateWeatherDataForAllLocations();
  res.json({success: updateResult});
});

module.exports = router;
