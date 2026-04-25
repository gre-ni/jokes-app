const jokeSequence = (() => {
	let lastId = 0;
	return {
		/**
		 * Returns the next ID in the sequence.
		 *
		 * @return {number} the next ID in the sequence
		 */
		next: () => ++lastId,
	};
})();

/**
 * Simple in-memory DAO for working with joke instances.
 *
 * @type {{findById: (function(id: number): Joke | null), save: (function(joke: Joke): Joke), deleteById: (function(id: number): void), findAll: (function(category?: string): Joke[])}}
 */
const jokeDao = (() => {
	/**
	 * Internal in-memory store of jokes, keyed by ID.
	 *
	 * @type {{[key: number]: Joke}}
	 */
	const jokes = {};
	return {
		/**
		 * Finds all jokes, optionally filtered by category, ordered by ID ascending.
		 *
		 * @param {string} [category] optional category filter
		 * @return {Joke[]} the jokes
		 */
		findAll: (category) => {
			const all = Object.values(jokes).sort((a, b) => a.id - b.id);
			if (category) {
				return all.filter((j) => j.category === category);
			}
			return all;
		},

		/**
		 * Finds a joke by its ID.
		 *
		 * @param {number} id the joke ID
		 * @return {Joke | null} the joke or `null` if not found
		 */
		findById: (id) => jokes[id] ?? null,

		/**
		 * Finds a random joke, optionally filtered by category.
		 *
		 * @param {string} [category] optional category filter
		 * @return {Joke | null} a random joke or `null` if none exists
		 */
		findRandom: (category) => {
			const all = Object.values(jokes);
			const filtered = category ? all.filter((j) => j.category === category) : all;
			if (filtered.length === 0) return null;
			return filtered[Math.floor(Math.random() * filtered.length)];
		},

		/**
		 * Saves a joke.
		 *
		 * - If the joke has no ID, one is generated and the joke is inserted.
		 * - If the joke has an ID, it is updated. Throws if no matching joke exists.
		 *
		 * @param {Joke} joke the joke to save
		 * @return {Joke} the saved joke
		 */
		save: (joke) => {
			if (joke.id) {
				if (!(joke.id in jokes)) {
					throw new Error(`Attempting to update a non-existent joke '${joke.id}'`);
				}
			} else {
				joke.id = jokeSequence.next();
			}
			jokes[joke.id] = joke;
			return joke;
		},

		/**
		 * Deletes a joke by ID. Throws if no matching joke exists.
		 *
		 * @param {number} id the joke ID
		 */
		deleteById: (id) => {
			if (!(id in jokes)) {
				throw new Error(`Attempting to delete a non-existent joke '${id}'`);
			} else {
				delete jokes[id];
			}
		},
	};
})();

module.exports = jokeDao;
