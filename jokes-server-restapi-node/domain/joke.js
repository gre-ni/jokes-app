/**
 * Creates a new joke.
 *
 * @param {number|null} id the ID
 * @param {string} setup the setup (question) of the joke
 * @param {string} punchline the punchline of the joke
 * @param {"GENERAL"|"PROGRAMMING"|"KNOCK_KNOCK"|"DAD"} category the category
 * @param {number} rating the rating (1–5)
 * @constructor
 */
const Joke = function (id, setup, punchline, category, rating) {
	this.id = id;
	this.setup = setup;
	this.punchline = punchline;
	this.category = category;
	this.rating = rating;
};

module.exports = Joke;
