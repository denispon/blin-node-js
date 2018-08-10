var request = require('request');
var fs = require('fs');
const forecast = require('./forecast/forecast.js');
const argv = require('yargs')
              .options({
                lat: {
                  demand: true,
                  alias: 'latitude',
                  describe: 'latitude',
                  string : true
                },
                lng: {
                    demand: true,
                    alias: 'longitude',
                    describe: 'longitude',
                    string : true
                  },
              })
              .help()
              .alias('help', 'h')
              .argv;


console.log(argv);

forecast.getForcast(argv.lat, argv.lng, (errorMessage, result)=>{
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(
            `latitude: ${result.latitude},
            longitude: ${result.longitude},
            timezone: ${result.timezone},
            hourly_summary: ${result.hourly_summary},
            temperature: ${result.temperature},
            windSpeed: ${result.windSpeed},
            visibility: ${result.visibility}, 
            ozone: ${result.ozone}`  
        );
    }
});