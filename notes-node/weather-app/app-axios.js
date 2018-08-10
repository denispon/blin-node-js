var request = require('request');
var fs = require('fs');
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

const axios = require('axios');
var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAmLobs4rcfKmu29OErIx_jbrPJvDrSipY';
var encodedAddress = encodeURIComponent(argv.address);

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/b1608833aa74ab4b361c4a4bc629eb4d/${latitude},${longitude}`;
    
    return axios.get(weatherUrl);

    console.log(response.data);
}).then((weatherResponse)=>{
    //console.log(weatherResponse);
    console.log(JSON.stringify(weatherResponse.data, undefined, 2));
}).catch((e)=>{
    console.log('Error occured during fetching data from DarkSky server');
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to Google`s servers');
    }else{
        console.log(e.message);
    }
});