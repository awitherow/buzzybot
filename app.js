var Twitter = require('twitter');
var client = new Twitter(require('./config.js'));

console.log("Hooray! Buzzy Bot is running!");

//Search parameters
var params = {
  q: '#buzzcoin',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

//Start a search for Buzzcoin related tweets
client.get('search/tweets', params, function(err, data, response) {
  if(!err){
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }
      client.post('favorites/create', id, function(err, response){
        if(err){
          console.log(err[0].message);
        }
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})
