const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;
var app = express();



app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err)=>{
        if(err){
            console.log(err.message);
        }
    });
    next();
});

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=>{
    // res.send('<h2> Hello Express! </h2> ');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcome:'Hello lads'
    });
});

app.use((req, res, next)=>{
    res.render('maintenance.hbs');
});


// app.get('/about', (req, res)=>{
//     // res.send('<h2> Hello Express! </h2> ');
//     res.send('About Page');
// });

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));