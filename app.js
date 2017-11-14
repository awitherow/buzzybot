if (process.env.NODE_ENV === "development") {
  require("dotenv").load();
}

// twitter client
var twit = require("twit");
var client = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// database
var db = require("./db");

// helper functions and tweets
var { shuffle, getRandomNumber } = require("./helpers");
var tweets = require("./tweets");

// create global variable to store this runs categories in.
var selectedCategories = [];

// varants
var MAX_TWEETS = 2;
var COUNT = 0;

async function sendRandomTweets(categories) {
  console.log("[INFO] Sending random tweets...");

  var previousTweets = await db.query(
    "SELECT * from tweets ORDER BY created DESC LIMIT 5"
  );

  var previousCategories = [];

  if (lastFiveTweets.isArray()) {
    previousCategories = previousTweets.reduce(prev => prev.category, []);
  }

  shuffle(categories)
    .filter(function(category) {
      // get previous categories and return if any of the previous categories
      if (previousCategories.indexOf(category.name)) return;

      // excludes inactive categories.
      if (category.active) {
        return category;
      }
    })
    .slice(0, MAX_TWEETS) // take only first two categories
    .map(function(category) {
      console.log("[INFO] sending tweet for category -> " + category.name);
      selectedCategories.push(category.name);

      var rand = getRandomNumber(0, category.tweets.length);
      var status = category.tweets[rand];

      console.log("[INFO] status chosen -> ", status);

      client.post("statuses/update", { status }, function(err, data, response) {
        if (err) {
          console.warn("[ERR] -> " + err);
        } else {
          console.log("[INFO] tweet successfully sent.");
        }

        if (COUNT === MAX_TWEETS) {
          selectedCategories.forEach(function(category) {
            db.query("insert into tweets(category) VALUES(${category})", {
              category
            });
          });
        }
      });
    });
}
