var i18n = require("i18n");
var CalculateWeatherMetrics = function(){};

CalculateWeatherMetrics.createForecastMetrics = function(location, hourlyData){
  if(hourlyData !== undefined && location !== undefined){

    //location.weatherData = hourlyData;
    location.weatherDataDay = hourlyData.slice(0,6);
    location.weatherDataNight = hourlyData.slice(7,14);

    location.maxTempDay = CalculateWeatherMetrics.getMax('tempC', location.weatherDataDay);
    location.minTempDay = CalculateWeatherMetrics.getMin('tempC', location.weatherDataDay);
    location.maxTempNight = CalculateWeatherMetrics.getMax('tempC', location.weatherDataNight);
    location.minTempNight = CalculateWeatherMetrics.getMin('tempC', location.weatherDataNight);

    location.maxWindForceDay = CalculateWeatherMetrics.getMax('windspeedKmph', location.weatherDataDay);
    location.minWindForceDay = CalculateWeatherMetrics.getMin('windspeedKmph', location.weatherDataDay);
    location.maxWindForceNight = CalculateWeatherMetrics.getMax('windspeedKmph', location.weatherDataNight);
    location.minWindForceNight = CalculateWeatherMetrics.getMin('windspeedKmph', location.weatherDataNight);

    location.maxWaterTemperatureDay = CalculateWeatherMetrics.getMax('waterTemp_C', location.weatherDataDay);
    location.minWaterTemperatureDay = CalculateWeatherMetrics.getMin('waterTemp_C', location.weatherDataDay);
    location.maxWaterTemperatureNight = CalculateWeatherMetrics.getMax('waterTemp_C', location.weatherDataNight);
    location.minWaterTemperatureNight = CalculateWeatherMetrics.getMin('waterTemp_C', location.weatherDataNight);

    location.maxWaveHeightDay = CalculateWeatherMetrics.getMax('swellHeight_m', location.weatherDataDay);
    location.maxWaveHeightNight = CalculateWeatherMetrics.getMax('swellHeight_m', location.weatherDataNight);

    location.windDirectionDay = CalculateWeatherMetrics.getWindDirection(location.weatherDataDay);
    location.windDirectionNight = CalculateWeatherMetrics.getWindDirection(location.weatherDataNight);

    return location;
  }
  return false;
};


CalculateWeatherMetrics.getWindDirection = function(hourlyData){
  var windDirections = [];
  hourlyData.forEach(function (hour){
    windDirections.push(hour.winddir16Point);
  });

  var direction = CalculateWeatherMetrics.mode(windDirections);
  return i18n.__(direction.toUpperCase());
};

CalculateWeatherMetrics.mode = function(array)
{
  if (array.length === 0)
  return null;

  var modeMap = {},
  maxEl = array[0],
  maxCount = 1;

  for(var i = 0; i < array.length; i++)
  {
    var el = array[i];

    if (modeMap[el] === null)
    modeMap[el] = 1;
    else
    modeMap[el]++;

    if (modeMap[el] > maxCount)
    {
      maxEl = el;
      maxCount = modeMap[el];
    }
    else if (modeMap[el] == maxCount)
    {
      maxEl += '&' + el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
};

CalculateWeatherMetrics.getMax = function(prop, hourlyData){
  console.log('GETMAX ' + prop);
  var value = 0;
  hourlyData.forEach(function (hour){
    console.log('- Check ' + hour[prop] );
    if(+hour[prop] > +value){
      console.log('- Take ' + hour[prop] );
      value = hour[prop];
    }
  });
  return value;
};

CalculateWeatherMetrics.getMin = function(prop, hourlyData){
  console.log('GETMIN ' + prop);
  var value = 100;
  hourlyData.forEach(function (hour){
    console.log('- Check if ' + hour[prop] + ' < ' + value );
    if(+hour[prop] < +value){
      console.log('- Take ' + hour[prop] );
      value = hour[prop];
    }
  });
  return value;
};

module.exports =  CalculateWeatherMetrics;
