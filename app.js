const twit = require('twit');
const config = require('./config');
const client = new twit(config);

require('dotenv');

// Defining Buzzcoin parameters
var retweet = function() {
    var params = {
        q: '#buzzcoin, $BUZZ',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }

    client.get('search/tweets', params, function(err, data) {
      // if there no errors
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
                // if there was an error while tweeting
                if (err) {
                    console.log('Sorry, BuzzyBot could not retweet :(');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Buzzy Bot could not find a Buzzy tweet to retweet :(');
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3600000);
