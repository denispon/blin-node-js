
// file system module to perform file operations
const fs = require('fs');
const yargs = require('yargs');
const axios = require('axios');
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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAmLobs4rcfKmu29OErIx_jbrPJvDrSipY`;

axios.get(geocodeUrl).then((response) =>{
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find this address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/b1608833aa74ab4b361c4a4bc629eb4d/${lat},${lng}`;


  console.log(response.data.results[0].formatted_address);

  return axios.get(weatherUrl);
}).then((response)=>{
    fs.writeFile("./responseFromWeatherAPI.txt", 
    JSON.stringify(response.data, undefined, 2), 
      ((err)=> {
          if(err) {
            return console.log(err);
          }
      }));
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;

  console.log(`Its currently ${temperature}. Feels like ${apparentTemperature}`);

}).catch((e) =>{
  if(e.code ==='ECONNREFUSED' || e.code ==='ENOTFOUND'){
    console.log('Unable to connect to Google Maps API server');
  }else{
    console.log("Something fucked up..."+ e);
  }
});
