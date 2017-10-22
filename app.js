const twit = require('twit');
const config = require('./config');
const client = new twit(config);

require('dotenv');

function searchTwitter() {
  const params = {
    q: '#buzzcoin',
    count: 100,
    result_type: ['recent', 'popular'],
    language: 'en'
  }

  return client.get('search/tweets', params)
    .then(function(res) {
      console.log(res);
    });
}
searchTwitter();
