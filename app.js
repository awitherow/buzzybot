var Twitter = require('twitter');
var client = new Twitter(require('./config.js'));

client.post('statuses/update', {status: 'Wooooo! I got the BuzzyBot running!'}, function(error, tweet, response) {
  if (!error) {
    console.log(tweet);
  }
  else {
    console.log(error);
  }
});
