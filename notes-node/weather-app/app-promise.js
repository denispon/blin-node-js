
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
