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

module.exports = {
  getRandomNumber,
  shuffle
};
