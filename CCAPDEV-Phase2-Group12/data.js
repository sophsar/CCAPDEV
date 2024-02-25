const landingImg = '/images/picha.png';

const resto_showcase = [
    {
        'resto-name': 'The Barn',
        'resto-image': '/images/the-barn.png'
    },
    {
        'resto-name': 'BOK Chicken',
        'resto-image': '/images/bok.png'
    },
    {
        'resto-name': 'Eat Fresh',
        'resto-image': '/images/eat-fresh.png'
    },
    {
        'resto-name': 'Topside',
        'resto-image': '/images/topside.png'
    },
    {
        'resto-name': 'Ate Rica\'s Bacsilog',
        'resto-image': '/images/bacsilog.png'
    }
];

const what_is = [
    {
        'what-is-BON': 'what is BON',
        'appetaft': 'APPÉTaft?',
        'content1': 'Welcome to BON APPÉTaft, where culinary exploration meets community insights!',
        'content2': 'At BON APPÉTaft, we\'re passionate about connecting students, residents, and food enthusiasts with the vibrant dining scene in Taft, Manila. Whether you\'re craving a hearty bowl of ramen, a sizzling plate of sisig, or a cozy café for late-night study sessions, we\'ve got you covered'
    }

]

const how_it_works = [
    {
        'info-name': 'Browse Reviews: ',
        'info': 'Dive into our extensive database of restaurant reviews. From hole-in-the-wall joints to trendy bistros, discover the flavors that await you.'
    },
    {
        'info-name': 'Star Ratings: ',
        'info': 'Our star ratings reflect real diners’ experiences. Did that adobo hit the spot? Was the service impeccable? Let the stars guide your culinary journey.'
    },
    {
        'info-name': 'Write Your Own Story: ',
        'info': 'Sign up, leave reviews, and become part of our food-loving community. Your insights matter!'
    }
];

module.exports.what_is = what_is;
module.exports.how_it_works = how_it_works;
module.exports.resto_showcase = resto_showcase;
module.exports.landingImg = landingImg;

/* for resto.hbs */

const resto_list = [
    {
        'resto-name': 'The Barn',
        'resto-image': '/images/the-barn.png',
        'location': 'No. 2226 Fidel Reyes St., Manila, Philippines',
        'phone': '+63-###-###-####',
        'hours': '10:00 AM - 02:00 PM',
        'description': 'Indulge in fine dining at our upscale brasserie, where culinary excellence awaits.'
    },
    {
        'resto-name': 'BOK Chicken',
        'resto-image': '/images/bok.png',
        'location': '877 Dagonoy St, Malate, Manila, 1004 Metro Manila',
        'phone': '+63-###-###-####',
        'hours': '10:30 AM - 03:00 PM',
        'description': 'Ensuring that our BOKada is left with enjoyable and fulfilled experience.'
    },
    {
        'resto-name': 'Eat Fresh',
        'resto-image': '/images/eat-fresh.png',
        'location': 'Providence Tower, 2471 Leon Guinto St, Malate, Manila, 1000 Metro Manila',
        'phone': '+63-###-###-####',
        'hours': '09:00 AM - 11:00 PM',
        'description': 'Embark on a culinary journey to the vibrant streets of Hong Kong with every bite at Eat Fresh!'
    },
    {
        'resto-name': 'Topside',
        'resto-image': '/images/topside.png',
        'location': '2589 Leon Guinto street Vito Cruz , Manila, Philippines',
        'phone': '+63-###-###-####',
        'hours': '11:00 AM - 09:00 PM',
        'description': 'A Mexican-Nautical themed Diner serving 9 flavorful Chicken wings, Burritos, Tacos and more!'
    },
    {
        'resto-name': 'Ate Rica\'s Bacsilog',
        'resto-image': '/images/bacsilog.png',
        'location': '2305 Fidel Reyes St. Malate Manila City',
        'phone': '+63-###-###-####',
        'hours': '07:00 AM - 07:00 PM',
        'description': 'We serve tasty, quality, fast, and clean superior-SILOG meals in schools, commercial spaces, & supermarkets.'
    }
];

module.exports.resto_list = resto_list;