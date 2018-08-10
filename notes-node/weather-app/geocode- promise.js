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



var geocodeAddress = (address) =>{
    return new Promise(function(resolve, reject){

        var encodedAddress = encodeURIComponent(address);

        request({
                url : 'https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAmLobs4rcfKmu29OErIx_jbrPJvDrSipY' ,
                json : true
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to Google servers.');
            }else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address.');
            }else if(response.statusCode !== 200){
                reject(`error:${error} , statusCode: ${response.statusCode}` ); // Print the error if one occurred
            }else{
                resolve({
                
                    formatted_address : body.results[0].formatted_address, // Print the HTML for the Google homepage.
                    lat : body.results[0].geometry.location.lat,
                    lng : body.results[0].geometry.location.lng,
                    status :  body.status
                });
            }
        });

        });
      

} 
geocodeAddress(argv.address).then((location) =>{
    console.log(JSON.stringify(location, undefined, 2));

},
(errorMassege)=>{
    console.log(errorMassege);
});