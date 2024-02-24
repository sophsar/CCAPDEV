/* 
    INSTALL COMMAND:

    (1) npm init
    (2) npm i express express-handlebars body-parser
*/

const express = require('express');
const server = express();
const bodyParser = require('body-parser');

server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));    

server.use(express.static('public'));

const { resto_showcase, how_it_works, what_is } = require('./data');

server.get('/', function(req, res) { 
    res.render('index', { 
        layout          : 'main',
        title           : 'Bon AppéTaft - Home',
        'resto-data'    : resto_showcase,
        'what_is'       : what_is,
        'how_it_works'  : how_it_works
    });
});

const port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log(`Server started on port ${port}`);
});

