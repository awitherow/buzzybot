const twit = require('twit');
const config = require('./config');
const client = new twit(config);

require('dotenv');

console.log("Hooray! Buzzy Bot is running!");

// Posting Bot
var messages = ["New to the #BUZZFAM? Get started with BUZZ at http://buzzcoin.info/get-started.html", "You guys apart of our 24/7 Discord server? If not, what are you missing out on?! https://t.co/XghGz66wYo"];
var messageLocation = 0;

var postTweet = function() {
    client.post('statuses/update', {
        status: messages[messageLocation]
    }, function(err, data, response) {
        console.log("Posted tweet!");
    });
    messageLocation += 1;
}

postTweet();

setInterval(postTweet, 43200000);

// Defining Buzzcoin parameters
var retweet = function() {
    var params = {
        q: '#buzzcoin, $BUZZ',  // Content we want to look for, BUZZCOIN
        result_type: 'recent',
        lang: 'en'
    }

    client.get('search/tweets', params, function(err, data) {
      // If there no errors
        if (!err) {
          // ID of status to retweet
            var retweetId = data.statuses[0].id_str;
            // Retweet
            client.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Buzzy Bot retweeted something! ID:', retweetId);
                }
                // If there is an error
                if (err) {
                    console.log('Sorry, BuzzyBot could not retweet, you may have already retweeted it :(');
                }
            });
        }
        // Not able to find tweet
        else {
          console.log('Buzzy Bot could not find a Buzzy tweet to retweet :(');
        }
    });
}

// Run the retweet function
retweet();
// Automate bot every minute
setInterval(retweet, 60000);
