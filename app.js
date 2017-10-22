const twit = require('twit');
const config = require('./config');
const client = new twit(config);

require('dotenv');

function searchTwitter() {
  const params = {
    q: 'buzzcoin',
    count: 100,
    result_type: ['recent'],
    language: 'en'
  }

  return client.get('search/tweets', params)
    .then(function(res) {
      const tweet = res.data.statuses[0];
      if (!tweet) {
        throw new Error('No related tweets found!');
      }
      return tweet;
    });
}

function retweet() {
  return searchTwitter()
    .then(function(status) {
      console.log("Buzzy Bot retweeted something:", status.id_str);
      return client.post('statuses/retweet/:id', { id : status.id_str });
    })
    .catch(function(err) {
      console.log("Sorry, Buzzy Bot had an error:", err);
    });
}

function postTweet() {
  client.post('statuses/update', { status: 'I got Buzzy Bot running! @_buzzcoin $BUZZ #buzzcoin #proofofstake' }, function(err, data, response) {
    console.log("Posted a status!");
  })
}

postTweet();
retweet();
