/* 
    INSTALL COMMAND:

    (1) npm init
    (2) npm i express express-handlebars body-parser
    (3) npm install mongodb
    (4) npm install mongoose
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

const { resto_showcase, how_it_works, what_is, resto_list } = require('./data');

/* define routes */

server.get('/', function(req, res) { 
    res.render('index', { 
        layout          : 'main',
        title           : 'Bon AppéTaft - Home',
        'resto-data'    : resto_showcase,
        'what_is'       : what_is,
        'how_it_works'  : how_it_works,
        isHome          : true
    });
});

server.get('/resto', function(req, res) {
    res.render('resto', { 
        title           : 'Bon AppéTaft - Restaurants', 
        'resto-list'    : resto_list,
        isResto         : true 
    });
});

server.get('/profile', function(req, res) {
    res.render('profile', { title: 'Profile', isProfile: true });
});

server.get('/signup', function(req, res) {
    res.render('signup', { title: 'Bon AppéTaft - Sign Up' });
});

server.get('/login', function(req, res) {
    res.render('login', { title: 'Bon AppéTaft - Login' });
});

const port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log(`Server started on port ${port}`);
});

/* connect to database */

const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/your-database-name';
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
