var i18n = require("i18n");
var beaufort = require('beaufort')

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

    var options = {unit: 'kmh', getName: false};
    location.maxWindForceDay = beaufort(+CalculateWeatherMetrics.getMax('windspeedKmph', location.weatherDataDay), options);
    location.minWindForceDay = beaufort(+CalculateWeatherMetrics.getMin('windspeedKmph', location.weatherDataDay), options);
    location.maxWindForceNight = beaufort(+CalculateWeatherMetrics.getMax('windspeedKmph', location.weatherDataNight), options);
    location.minWindForceNight = beaufort(+CalculateWeatherMetrics.getMin('windspeedKmph', location.weatherDataNight), options);

    location.maxWaterTemperatureDay = CalculateWeatherMetrics.getMax('waterTemp_C', location.weatherDataDay);
    location.minWaterTemperatureDay = CalculateWeatherMetrics.getMin('waterTemp_C', location.weatherDataDay);
    location.maxWaterTemperatureNight = CalculateWeatherMetrics.getMax('waterTemp_C', location.weatherDataNight);
    location.minWaterTemperatureNight = CalculateWeatherMetrics.getMin('waterTemp_C', location.weatherDataNight);

    location.maxWaveHeightDay = CalculateWeatherMetrics.getMax('swellHeight_m', location.weatherDataDay);
    location.maxWaveHeightNight = CalculateWeatherMetrics.getMax('swellHeight_m', location.weatherDataNight);

    location.windDirectionDay = CalculateWeatherMetrics.getWindDirection(location.weatherDataDay);
    location.windDirectionNight = CalculateWeatherMetrics.getWindDirection(location.weatherDataNight);

    location.waveIconDay = CalculateWeatherMetrics.getWaveIcon(location.maxWaveHeightDay);
    location.waveIconNight = CalculateWeatherMetrics.getWaveIcon(location.maxWaveHeightNight);

    location.weatherIconDay = CalculateWeatherMetrics.getWeatherIcon(location.weatherDataDay);
    location.weatherIconNight = CalculateWeatherMetrics.getWeatherIcon(location.weatherDataNight);

    return location;
  }
  return false;
};

CalculateWeatherMetrics.getWeatherIcon = function(hourlyData){
  var iconUrls = [];
  hourlyData.forEach(function (hour){
    iconUrls.push(hour.weatherIconUrl[0].value);
  });

  console.log('icon-url' + CalculateWeatherMetrics.mode(iconUrls));

  return CalculateWeatherMetrics.mode(iconUrls);
};

CalculateWeatherMetrics.getWaveIcon = function(waveHeight){
  if(+waveHeight <= 0.5){
    return 'Wave0_5.png';
  }else if(+waveHeight <= 1){
    return 'Wave1_0.png';
  }else if(+waveHeight <= 1.5){
    return 'Wave1_5.png';
  }else{
    return 'Wave2_0.png';
  }
};

CalculateWeatherMetrics.getWindDirection = function(hourlyData){
  var windDirections = [];
  hourlyData.forEach(function (hour){
    windDirections.push(hour.winddir16Point);
  });

  var direction = CalculateWeatherMetrics.mode(windDirections);
  return i18n.__(direction.toUpperCase());
};

CalculateWeatherMetrics.mode = function(array){
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
