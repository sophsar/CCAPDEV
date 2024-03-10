// npm init
// npm i install express express-handlebars body-parser mongoose passport passport-local connect-flash

/*
    TO-DO:

    (1) delete review
    (2) edit review
    (3) edit profile
    (4) change date & time format displayed on reviews to "mm-dd-yyy 00:00 AM/PM"
    (5) view profile of other users
    (6) helpful / unhelpful buttons
    (7) storing and using images
    (8) save owner reply to database 
*/

const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const { landingImg, resto_showcase, what_is, how_it_works, resto_list } = require('./data');

server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname         : 'hbs',
    defaultLayout   : 'index',
    layoutsDir      : 'views/layouts/',
    helpers: {
        eq: function(a, b) {
            return a === b;
        },
        toString: function(id) {
            return id.toString();
        },
        formatDate: function(date, format) {
            return moment(date).format(format);
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));

server.use(express.static('public'));

const port = process.env.PORT | 3000;
server.listen(port, function() {
    console.log('Listening at port ' + port);
})

/* i honestly dk what this is */

server.use(session({
    secret: 'secret', // should use a strong, randomly generated secret
    resave: false,
    saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(flash());

/* defining routes */

server.get('/', async function(req, res) {
    try {
        const loggedInUser = req.user;
        const guests = await loginGuest.find({});
        let data = {
            layout          : 'index',
            title           : 'BON APPÉTaft',
            landingImg      : landingImg,
            'resto-data'    : guests,
            'what_is'       : what_is,
            'how_it_works'  : how_it_works,
            isHome          : true
        };

        if (req.user) {
            if (req.user.status === 'user') {
                const users = await loginUser.find({});
                data.isUser = true;
                data['user-info'] = loggedInUser;
                console.log('User status: user');
            } else if (req.user.status === 'owner') {
                const owners = await loginOwner.find({});
                data.isOwner = true;
                data['user-info'] = loggedInUser;
                console.log('User status: owner');
            }
        } else {
            data.isGuest = true;
            console.log('User status: guest');
        }

        res.render('homepage', data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/resto', async function(req, res) {
    try {
        const owners = await loginOwner.find({});
        let data = {
            layout          : 'index',
            title           : 'Bon AppéTaft - Restaurants', 
            'resto-list'    : owners,
            isResto         : true
        };

        if (req.user) {
            if (req.user.status === 'user') {
                const users = await loginUser.find({});
                data.isUser = true;
            } else if (req.user.status === 'owner') {
                data.isOwner = true;
            }
        } else {
            data.isGuest = true;
        }

        res.render('resto', data);
    } catch (err) {
        console.error('Error fetching owners:', err);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/reviews', async function(req, res) {
    try {
        const owners = await loginOwner.find({});
        const reviews = await review.find({});
        const replies = await reply.find({});

        let data = {
            layout          : 'index', 
            title           : 'Bon AppéTaft - Reviews',
            errorMessage    : req.flash('error'),
            query           : req.query,
            reviews         : reviews,
            replies         : replies,
            isResto         : true
        };

        if (req.user) {
            if (req.user.status === 'user') {
                const users = await loginUser.find({});
                data.isUser = true;
            } else if (req.user.status === 'owner') {
                data.isOwner = true;
            }
        } else {
            data.isGuest = true;
        }

        res.render('reviews', data);
    } catch (err) {
        console.error('Error fetching owners:', err);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/login', function(req, res) {
    res.render('login', { 
        layout          : 'index', 
        title           : 'Bon AppéTaft - Login',
        errorMessage    : req.flash('error')
    });
});

server.get('/signup', function(req, res) {
    res.render('signup', { 
        layout      : 'index', 
        title       : 'Bon AppéTaft - Sign Up' });
});

server.get('/viewuser', async function(req, res) {
    try {
        const loggedInUser = req.query;
        const reviews = await review.find({});
        const replies = await reply.find({});

        res.render('user', { 
            layout          : 'index', 
            title           : 'Bon AppéTaft - User',
            'user-info'     : loggedInUser,
            isUser          : true,
            isResto         : true,
            isView          : true,
            'reviews'       : reviews,
            'replies'       : replies,
            errorMessage    : req.flash('error')
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/user', async function(req, res) {
    try {
        const loggedInUser = req.user;
        const reviews = await review.find({});
        const replies = await reply.find({});

        res.render('user', { 
            layout          : 'index', 
            title           : 'Bon AppéTaft - Profile',
            'user-info'     : loggedInUser,
            isUser          : true,
            isProfile       : true,
            isView          : false,
            'reviews'       : reviews,
            'replies'       : replies,
            errorMessage    : req.flash('error')
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/owner', async function(req, res) {
    try {
        const loggedInUser = req.user;
        const reviews = await review.find({});
        const replies = await reply.find({});
        
        res.render('owner', { 
            layout          : 'index', 
            title           : 'Bon AppéTaft - My Restaurant',
            isOwner         : true,
            isResto         : true,
            'owner-info'    : loggedInUser,
            'reviews'       : reviews,
            'replies'       : replies

        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).send('Internal Server Error');
    }
});


/* connect to database */

mongoose.connect('mongodb://localhost:27017/logininfo');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database:'));
db.once('open', () => {
    console.log('Successfully connected to database!');
});

// owner replies schema

const replySchema = new mongoose.Schema({
    userPfp             : { type: String },
    reviewID            : { type: String },
    username            : { type: String },
    restoName           : { type: String },
    replyText           : { type: String },
    timestamp           : { type: Date, default: Date.now }
});

const reply = mongoose.model('replies', replySchema);

server.post('/owner-reply', async (req, res) => {
    try {
        if (!req.user || !req.user.username) {
            return res.status(401).send('Unauthorized');
        }

        const newReply = new reply({
            userPfp         : req.user.pfpUrl,
            reviewID        : req.body.reviewId,
            username        : req.user.username,
            restoName       : req.user.restoName, 
            replyText       : req.body.replyText,
            timestamp       : Date.now()
        });

        await newReply.save();
        console.log('Reply successfully submitted.');
    } catch (error) {
        console.error('Error saving reply:', error);
        res.status(500).send('Internal Server Error');
    }
});

// reviews schema

const reviewSchema = new mongoose.Schema({
    userPfp             : { type: String },
    username            : { type: String },
    restoName           : { type: String },
    rating              : { type: Number },
    reviewText          : { type: String },
    reviewImg           : { type: String },
    timestamp           : { type: Date, default: Date.now }
});

const review = mongoose.model('reviews', reviewSchema);

server.post('/submit-review', async (req, res) => {
    try {
        if (!req.user || !req.user.username) {
            return res.status(401).send('Unauthorized');
        }

        const newReview = new review({
            userPfp             : req.user.pfpUrl,
            username            : req.user.username,
            restoName           : req.body.restaurantName,
            rating              : req.body.rating1,
            reviewText          : req.body.reviewText,
            reviewImg           : req.body.reviewImg,
            timestamp           : Date.now()
        });

        await newReview.save();        

   } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).send('Internal Server Error');
    }
});

// guest schema
const guestSchema = new mongoose.Schema({
    restoName          : { type: String },
    restoImg           : { type: String }
}, { versionKey     : false });

const loginGuest = mongoose.model('guests', guestSchema);

// user schema
const userSchema = new mongoose.Schema({
    pfpUrl          : { type: String },
    description     : { type: String },
    firstName       : { type: String },
    lastName        : { type: String },
    username        : { type: String },
    email           : { type: String },
    password        : { type: String },
    dob             : { type: Date },
    status          : { type: String, default: 'user' }
}, { versionKey     : false });

const loginUser = mongoose.model('users', userSchema);

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}

server.post('/create-user', function(req, res){
    const userInstance = loginUser({
        pfpUrl          : req.body.pfpUrl,
        description     : req.body.description,
        firstName       : req.body.firstName,
        lastName        : req.body.lastName,
        username        : req.body.username,
        email           : req.body.email,
        password        : req.body.password,
        dob             : req.body.dob
    })

    userInstance.save().then(function(users) {
        console.log('User created');
    }).catch(errorFn);
});

// owner schema
const ownerSchema = new mongoose.Schema({
    pfpUrl              : { type: String },
    description         : { type: String },
    firstName           : { type: String },
    lastName            : { type: String },
    username            : { type: String },
    email               : { type: String },
    password            : { type: String },
    dob                 : { type: Date },
    restoName           : { type: String },
    location            : { type: String },
    phoneNumber         : { type: String },
    openingTime         : { type: String },
    closingTime         : { type: String },
    status              : { type: String, default: 'owner' }
}, { versionKey         : false });

const loginOwner = mongoose.model('owners', ownerSchema);

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}

server.post('/create-owner', function(req, res){
    const ownerInstance = loginOwner({
        pfpUrl          : req.body.pfpUrl,
        description     : req.body.description,
        firstName       : req.body.firstName,
        lastName        : req.body.lastName,
        username        : req.body.username,
        email           : req.body.email,
        password        : req.body.password,
        dob             : req.body.dob,
        restoName       : req.body.restoName,
        location        : req.body.location,
        phoneNumber     : req.body.phoneNumber,
        openingTime     : req.body.openingTime,
        closingTime     : req.body.closingTime
    })

    ownerInstance.save().then(function(owners) {
        console.log('Owner created');    
    }).catch(errorFn);
});

// Configure Passport Local Strategy for user and owner login
passport.use('local', new LocalStrategy((username, password, done) => {
    Promise.all([
        loginUser.findOne({ $or: [{ username: username }, { email: username }] }),
        loginOwner.findOne({ $or: [{ username: username }, { email: username }] })
    ])
    .then(([users, owners]) => {
        if (!users && !owners) {
            return done(null, false, { message: 'User does not exist.' });
        }
        if (users && users.password === password) {
            return done(null, users);
        }
        if (owners && owners.password === password) {
            return done(null, owners);
        }
        return done(null, false, { message: 'Incorrect password.' });
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user.status }); // Serialize with type
});

passport.deserializeUser((obj, done) => {
    if (obj.type === 'user') {
        loginUser.findById(obj.id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err, null);
            });
    } else if (obj.type === 'owner') {
        loginOwner.findById(obj.id)
            .then(owner => {
                done(null, owner);
            })
            .catch(err => {
                done(err, null);
            });
    }
});

// Login route for both users and owners
server.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            // Check if the authenticated user is an owner
            if (user.status === 'owner') {
                // If the user is an owner, set req.owner to the authenticated owner object
                req.owner = user;
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

// Logout route
server.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
});