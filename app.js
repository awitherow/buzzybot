const twit = require('twit');
const config = require('./config');
const client = new twit(config);

console.log("Hooray! Buzzy Bot is running!");

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// POST a status update (Hello World!)
// exchange, open source donation, communities (buzzcoin.info/#community), get started, eventuall pool/referral
// pick 2 of the objects, after shuffling tweets array
// pick random tweet in tweets.status
// send in loop

var tweets = [{
        name: "exchange",
        status: ["Buy #BUZZ on the following exchanges! https://www.coinexchange.io/ and https://yobit.net/en/. Get your #BUZZCOIN today!", "Don't leave us just yet! Place your #BUZZ sell orders at 25 sats to create a massive wall! Go #BUZZCOIN!"]
    },
    {
        name: "os",
        status: ["Got a passion for #blockchain and #development? Get involved with our #opensource incentive program! https://goo.gl/1vCMss", "Blah"]
    },
    {
        name: "community",
        status: ["Get 24/7 support by joining our Discord server! https://t.co/XghGz66wYo", "Blah"]
    },
    {
        name: "get-started",
        status: ["New to #BUZZ? Take a look at our getting started page! http://buzzcoin.info/get-started.html", "Blah"]
    }
]

// Pick tweets
var result = tweets.map(function (tweets) {
    return tweets.status;
});

// Shuffle tweets
var randTweet = shuffle(result)
var result = result.slice(0, 1)[0]//.toString*/();
console.log(result);

/* client.post('statuses/destroy/:id', { id: '923608115655991297' }, function (err, data, response) {
    console.log(data)
  }) */

/* client.post('statuses/update', { status: result }, function(err, data, response) {
    console.log(data)
  }) */