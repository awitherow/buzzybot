const twit = require("twit");
const config = require("./config");
const client = new twit(config);

console.log("[INFO] Horray! BUZZBOT is running...");

/**
 * Gets a random integer between a max and minimum.
 * @param {int} min minimum number for the random number return value.
 * @param {int} max maximum number for the random number return value.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var currentIndex = a.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = a[currentIndex];
    a[currentIndex] = a[randomIndex];
    a[randomIndex] = temporaryValue;
  }

  return a;
}

var categories = [
  {
    name: "exchange",
    tweets: [
      "Buy #BUZZ on the following exchanges! https://www.coinexchange.io/ and https://yobit.net/en/. Get your #BUZZCOIN today!",
      "Don't leave us just yet! Place your #BUZZ sell orders at 25 sats to create a massive wall! Go #BUZZCOIN!"
    ],
    active: true
  },
  {
    name: "os",
    tweets: [
      "#Passionate for #blockchain and #development? Get $BUZZ with our #opensource incentive program! https://goo.gl/1vCMss #innovation #buzzcoin #buzzfam",
      "OS_SECOND_TWEET"
    ],
    active: true
  },
  {
    name: "community",
    tweets: [
      "Get 24/7 $BUZZ support by joining our Discord server! https://t.co/XghGz66wYo #community #blockchain #cryptocommunity",
      "COMM_SECOND_TWEET"
    ],
    active: true
  },
  {
    name: "get-started",
    tweets: [
      "New to $BUZZ? Getting started has never been easier at http://buzzcoin.info/get-started.html",
      "GET_STARTED_SECOND_TWEET"
    ],
    active: true
  },
  {
    name: "pool",
    tweets: [
      "Interesting in getting #ProofofStake #rewards daily with $BUZZ? Join the #official #buzz #pool today! buzzcoin.info",
      "POOL_SECOND_TWEET"
    ],
    active: false
  }
];

shuffle(categories)
  .filter(function(category) {
    // excludes inactive categories.
    if (category.active) {
      return category;
    }
  })
  .slice(0, 2) // take only first two categories
  .map(function(category) {
    console.log("[INFO] sending tweet for category -> " + category.name);

    var rand = getRandomNumber(0, category.tweets.length);
    var status = category.tweets[rand];

    console.log("[INFO] status chosen -> ", status);

    client.post("statuses/update", { status }, function(err, data, response) {
      if (err) {
        console.warn("[ERR] -> " + err);
      } else {
        console.log("[INFO] tweet successfully sent.");
      }
    });
  });
