const twit = require('twit');
const config = require('./config');
const client = new twit(config);

require('dotenv');

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
                    console.log('Sorry, BuzzyBot could not retweet :(');
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
// Automate bot every 60 mins
setInterval(retweet, 3600000);
