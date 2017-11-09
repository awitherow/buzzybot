const config = require("./config");
const twit = require("twit");
const client = new twit(config);

const { shuffle, getRandomNumber } = require("./helpers");
const tweets = require("./tweets");

// create global variable to store this runs categories in.
var selectedCategories = [];

// constants
var MAX_TWEETS = 2;

function sendRandomTweets(categories) {
  console.log("[INFO] Sending random tweets...");

  shuffle(categories)
    .filter(function(category) {
      // get previous categories and return if any of the previous categories
      // match the current one being parsed over.
      // TODO: get last six entries from postgres database
      if (prevCategories.indexOf(category.name)) return;

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

        // TODO: add entry to postgres database
      });
    });
}

sendRandomTweets(tweets);
