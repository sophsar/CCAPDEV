// npm init
// npm i install express express-handlebars body-parser mongoose passport passport-local connect-flash bcrypt

const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const { landingImg, resto_showcase, what_is, how_it_works, owner_what_is, owner_how_it_works, resto_list } = require('./data');

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
        },
        getHelpfulCount: function(reviewId, interactions) {
            const interaction = interactions.find(interaction => interaction._id === reviewId);
            return interaction ? interaction.helpfulCount : 0;
        },
        getUnhelpfulCount: function(reviewId, interactions) {
            const interaction = interactions.find(interaction => interaction._id === reviewId);
            return interaction ? interaction.unhelpfulCount : 0;
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

server.use(session({
    secret: 'secret',
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
            'resto-data'          : guests,
            'what_is'             : what_is,
            'how_it_works'        : how_it_works,
            'owner_what_is'       : owner_what_is,
            'owner_how_it_works'  : owner_how_it_works,
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
        const reviews = await review.aggregate([
            {
                $group: {
                    _id: "$restoName",
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        reviews.forEach(review => {
            review.averageRating = parseFloat(review.averageRating.toFixed(2));
        });

        let data = {
            layout          : 'index',
            title           : 'Bon AppéTaft - Restaurants', 
            'resto-list'    : owners,
            'reviews'       : reviews,
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
        const interactions = await interaction.aggregate([
            {
                $group: {
                    _id: "$reviewId",
                    helpfulCount: { $sum: { $cond: [{ $eq: ["$status", true] }, 1, 0] } },
                    unhelpfulCount: { $sum: { $cond: [{ $eq: ["$status", false] }, 1, 0] } }
                }
            }
        ]);

        let data = {
            layout          : 'index', 
            title           : 'Bon AppéTaft - Reviews',
            errorMessage    : req.flash('error'),
            query           : req.query,
            reviews         : reviews,
            replies         : replies,
            interactions    : interactions
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

server.post('/login', async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err) { return next(err); }
            if (!user) {
                req.flash('error', info.message);
                return res.redirect('/login');
            }
            req.logIn(user, async (err) => {
                if (err) { return next(err); }

                if (req.body.remember) {
                    const { username, password } = req.body;
                    res.cookie('remember_me', { username, password }, { maxAge: 1814400000 }); // 3 weeks
                } else {
                    res.clearCookie('remember_me');
                }

                if (user.status === 'owner') {
                    req.owner = user;
                }
                return res.redirect('/');
            });
        } catch (error) {
            console.error('Error during login:', error);
            req.flash('error', 'An error occurred during login. Please try again.');
            return res.redirect('/login');
        }
    })(req, res, next);
});

server.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
});

/* delete a review */

server.post('/delete-review', async (req, res) => {
    try {
        const reviewIdToDelete = req.body.reviewId;

        const deletedReview = await review.findByIdAndDelete(reviewIdToDelete);

        if (!deletedReview) {
            return res.status(404).send('Review not found');
        }

    } catch (error) {
        console.error('Error deleting review:', error);
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

// interaction schema

const interactionSchema = new mongoose.Schema({
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    username: { type: String },
    status: { type: Boolean } // true for helpful, false for unhelpful
});

const interaction = mongoose.model('interactions', interactionSchema);

server.post('/submit-interaction', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('Unauthorized');
        }

        const { reviewId, status } = req.body;
        const username = req.user.username;

        const existingInteraction = await interaction.findOne({ reviewId, username });

        if (existingInteraction) {
            if (existingInteraction.status === status) {
                await interaction.findByIdAndDelete(existingInteraction._id);
                return res.status(200).json({ deleted: true });
            }
            existingInteraction.status = status;
            await existingInteraction.save();
            return res.status(200).json({ updated: true });
        }

        const newInteraction = new interaction({
            reviewId: reviewId,
            username: username,
            status: status
        });

        await newInteraction.save();

        res.status(200).json({ saved: true });
    } catch (error) {
        console.error('Error saving interaction:', error);
        res.status(500).send('Internal Server Error');
    }
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

server.post('/create-user', async function(req, res){
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password with a salt factor of 10
        const userInstance = loginUser({
            pfpUrl          : req.body.pfpUrl,
            description     : req.body.description,
            firstName       : req.body.firstName,
            lastName        : req.body.lastName,
            username        : req.body.username,
            email           : req.body.email,
            password        : hashedPassword, // Save the hashed password
            dob             : req.body.dob
        });

        await userInstance.save();
        console.log('User created');
        res.redirect('/login'); // Redirect to login page after successful signup
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
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

server.post('/create-owner', async function(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password with a salt factor of 10
        const ownerInstance = loginOwner({
            pfpUrl          : req.body.pfpUrl,
            description     : req.body.description,
            firstName       : req.body.firstName,
            lastName        : req.body.lastName,
            username        : req.body.username,
            email           : req.body.email,
            password        : hashedPassword, // Save the hashed password
            dob             : req.body.dob,
            restoName       : req.body.restoName,
            location        : req.body.location,
            phoneNumber     : req.body.phoneNumber,
            openingTime     : req.body.openingTime,
            closingTime     : req.body.closingTime
        });

        await ownerInstance.save();
        console.log('Owner created');
        res.redirect('/login'); // Redirect to login page after successful signup
    } catch (error) {
        console.error('Error creating owner:', error);
        res.status(500).send('Internal Server Error');
    }
});

passport.use('local', new LocalStrategy(async (username, password, done) => {
    try {
        const [user, owner] = await Promise.all([
            loginUser.findOne({ $or: [{ username: username }, { email: username }] }),
            loginOwner.findOne({ $or: [{ username: username }, { email: username }] })
        ]);

        if (!user && !owner) {
            return done(null, false, { message: 'User does not exist.' });
        }

        if (user) {
            const passwordMatchUser = await bcrypt.compare(password, user.password);
            if (passwordMatchUser) {
                return done(null, user);
            }
        }

        if (owner) {
            const passwordMatchOwner = await bcrypt.compare(password, owner.password);
            if (passwordMatchOwner) {
                return done(null, owner);
            }
        }

        return done(null, false, { message: 'Incorrect password.' });
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user.status });
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
