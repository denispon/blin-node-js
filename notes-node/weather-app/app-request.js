var request = require('request');
var fs = require('fs');
const geocode = require('./geocode/geocode.js');
const argv = require('yargs')
              .options({
                a: {
                  demand: true,
                  alias: 'address',
                  describe: 'Address to fetch weather for',
                  string : true
                }
              })
              .help()
              .alias('help', 'h')
              .argv;
              
geocode.getGeocodeData(argv.address, (errorMessage, results)=>{
  if(errorMessage){
    console.log('Unable to connect to Google servers.')
  }else{
    console.log(`formatted address: ${results.formatted_address}`); // Print the HTML for the Google homepage.
    console.log('lat', results.lat);
    console.log('lng', results.lng);
    console.log('status', results.status);

  }
});

