
// file system module to perform file operations
const fs = require('fs');
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const forecast = require('./forecast/forecast.js');
const argv = yargs
      .option({
        a : {
          demend : true,
          alias: 'address',
          describe: 'Address to fetch weather for',
          string: true
        }
      })
      .help()
      .alias('help', 'h')
      .argv;

geocode.geocodeAddress(argv.address, (geoCodeErrorMessage, geocodeResult) =>{
  if(geoCodeErrorMessage){
    console.log(geoCodeErrorMessage);
  }else{
    forecast.forecast(geocodeResult.lat, geocodeResult.lng, (forecastErrorMessage, forecastResult) => {
      if(forecastErrorMessage){
        console.log(forecastErrorMessage);
      }else{
        console.log(`Forecast for ${argv.address}`);
        console.log(`${forecastResult.hourly_summary}`);
        console.log(`Currently the temperature is ${forecastResult.temperature},
          wind speed: ${forecastResult.windSpeed},
          visibility: ${forecastResult.visibility},
          ozon amount: ${forecastResult.ozone}`
        );
      }
    });
  }
});