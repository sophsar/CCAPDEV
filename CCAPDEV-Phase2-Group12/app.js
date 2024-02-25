// npm init
// npm i install express express-handlebars body-parser
// npm i mongodb
// npm i mongoose

const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(express.json());
server.use(express.urlencoded({extended: true}));

const handlebars = require('express-handlebars');
const { landingImg, resto_showcase, what_is, how_it_works, resto_list } = require('./data');

server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

server.use(express.static('public'));

// homepage
server.get('/', function(req, resp) {
    resp.render('homepage', {
        layout: 'index',
        title: 'BON APPÉTaft',
        landingImg: landingImg,
        'resto-data': resto_showcase,
        'what_is': what_is,
        'how_it_works': how_it_works,
        isHome: true
    })
})

server.get('/resto', function(req, res) {
    res.render('resto', { 
        layout          : 'index',
        title           : 'Bon AppéTaft - Restaurants', 
        'resto-list'    : resto_list,
        isResto         : true 
    });
});

server.get('/profile', function(req, res) {
    res.render('profile', { layout: 'index', title: 'Profile', isProfile: true });
});

server.get('/signup', function(req, res) {
    res.render('signup', { layout: 'index', title: 'Bon AppéTaft - Sign Up' });
});

server.get('/login', function(req, res) {
    res.render('login', { layout: 'index', title: 'Bon AppéTaft - Login' });
});


const port = process.env.PORT | 3000;
server.listen(port, function() {
    console.log('Listening at port ' + port);
})

/* connect to database */
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/your-database-name';
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});