const twit = require('twit');
const config = require('./config');
const client = new twit(config);

console.log("Hooray! Buzzy Bot is running!");

// POST a status update (Hello World!)

client.post('statuses/update', { status: 'Hello world! The #BUZZFAM Bot is running!' }, function(err, data, response) {
    console.log(data)
  })