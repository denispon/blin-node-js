console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');

//var filteredArray = _.uniq(['Denis','343', 'Denis', 1, 2, '3', 5]);

//console.log(filteredArray);

const yargs = require('yargs');
console.log('Process',process.argv);


const argv = yargs.argv;
const command = argv._[0];
console.log('Yargs', argv);
console.log('Command: ', command);

if(command === 'add'){
   var node = notes.addNote(argv.title, argv.body);
   if(node != null && node != 'undefined'){
    console.log("Note with title: " + argv.title +
    " and body: " + argv.body + " is successfully added");
   }else{
    console.log("Note with title: " + argv.title +
    " and body: " + argv.body + " is already exists");
   }
}else if(command === 'list'){
    notes.getAll();
} else if(command === 'read'){
    notes.readNote(argv.title, argv.body);
}else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? " aaa   Note was removed" : "Note was not found";
    console.log(message);
}else{
    console.log('Command not recognized');
}


//console.log(_.isString('Denis'));
//console.log(_.isString(true ));

//var res = notes.add(7, -3);

//console.log(res);

//var user = os.userInfo();
//console.log(user);

//fs.appendFile('greetings.txt', 'Hello ' +  user.username + '!\n');

//fs.appendFile('greetings.txt', 'Hello ' + user.username + ' You are ' +  notes.age);
