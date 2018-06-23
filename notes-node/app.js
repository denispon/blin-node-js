const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const yargs = require('yargs');
const argv = yargs
            .command('add', 'Add a new note', {
                title:titleOptions,
                body:bodyOptions

            })
            .command('read', 'read a note', {
                title:titleOptions
            })
            .command('list', 'show all notes')
            .command('remove', 'remove a note', {
                title:titleOptions
            })
            .help()
            .argv;
const command = argv._[0];

if(command === 'add'){
   var note = notes.addNote(argv.title, argv.body);
   if(note != null && note != 'undefined'){
    notes.logNote(note);
   }else{
    console.log("Note with title: " + argv.title +
    " and body: " + argv.body + " is already exists");
   }
}else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);  
    allNotes.forEach(note => {
        notes.logNote(note);
    }); 
    
} else if(command === 'read'){
    debugger;
    var noteToRead = notes.getNote(argv.title);
    if(noteToRead){
        notes.logNote(noteToRead);
    }else{
        console.log("Note was not found");
    }
}else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note was removed" : "Note was not found";
    console.log(message);
}else{
    console.log('Command not recognized');
}

