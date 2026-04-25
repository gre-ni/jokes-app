/* eslint-disable no-unused-vars */
const path = require("path");
const Service = require("./Service");

const Joke = require("../domain/joke");
const jokeDao = require("../dao/joke-dao");

const CATEGORY_MAP = {
    general: "GENERAL",
    programming: "PROGRAMMING",
    "knock-knock": "KNOCK_KNOCK",
    dad: "DAD",
};

const DEFAULT_RATING = 3;

loadJokesFromFile();

/**
 * Loads all jokes from the bundled jokes.json file into the in-memory store.
 * Unknown types fall back to GENERAL.
 */
function loadJokesFromFile() {
    const jokesPath = path.join(__dirname, "..", "jokes.json");
    const rawJokes = require(jokesPath);
    for (const raw of rawJokes) {
        const category = CATEGORY_MAP[raw.type] ?? "GENERAL";
        jokeDao.save(
            new Joke(null, raw.setup, raw.punchline, category, DEFAULT_RATING),
        );
    }
}

/**
 * Deletes a joke by ID.
 *
 * jokeId Long Joke id
 * no response value expected for this operation
 */
const deleteJoke = ({ jokeId }) =>
    new Promise(async (resolve, reject) => {
        try {
            jokeDao.deleteById(jokeId);
            resolve({ code: 204 });
        } catch (e) {
            reject(Service.rejectResponse("Not found", 404));
        }
    });

/**
 * Obtains a joke by its ID.
 *
 * jokeId Long Joke id
 * returns Joke
 */
const getJoke = ({ jokeId }) =>
    new Promise(async (resolve, reject) => {
        try {
            const joke = jokeDao.findById(jokeId);
            if (joke) {
                resolve(Service.successResponse(joke));
            } else {
                reject(Service.rejectResponse("Not found", 404));
            }
        } catch (e) {
            reject(Service.rejectResponse(e.message));
        }
    });

/**
 * Obtains a list of jokes, optionally filtered by category.
 *
 * category String Filter by category (optional)
 * returns List
 */
const getJokes = ({ category } = {}) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(Service.successResponse(jokeDao.findAll(category)));
        } catch (e) {
            reject(Service.rejectResponse(e.message));
        }
    });

/**
 * Obtains a random joke, optionally filtered by category.
 *
 * category String Filter by category (optional)
 * returns Joke
 */
const getRandomJoke = ({ category } = {}) =>
    new Promise(async (resolve, reject) => {
        try {
            const joke = jokeDao.findRandom(category);
            if (joke) {
                resolve(Service.successResponse(joke));
            } else {
                reject(Service.rejectResponse("Not found", 404));
            }
        } catch (e) {
            reject(Service.rejectResponse(e.message));
        }
    });

/**
 * Creates a new joke.
 *
 * joke Joke
 * returns Long (the new joke's ID)
 */
const postJoke = ({ joke }) =>
    new Promise(async (resolve, reject) => {
        try {
            const createdJoke = jokeDao.save(
                new Joke(
                    null,
                    joke.setup,
                    joke.punchline,
                    joke.category,
                    joke.rating,
                ),
            );
            resolve(Service.successResponse(createdJoke.id, 200));
        } catch (e) {
            reject(Service.rejectResponse(e.message));
        }
    });

/**
 * Updates an existing joke.
 *
 * jokeId Long Joke id
 * joke Joke
 * no response value expected for this operation
 */
const putJoke = ({ jokeId, joke }) =>
    new Promise(async (resolve, reject) => {
        try {
            jokeDao.save(
                new Joke(
                    Number(jokeId),
                    joke.setup,
                    joke.punchline,
                    joke.category,
                    joke.rating,
                ),
            );
            resolve({ code: 204 });
        } catch (e) {
            reject(Service.rejectResponse("Not found", 404));
        }
    });

module.exports = {
    deleteJoke,
    getJoke,
    getJokes,
    getRandomJoke,
    postJoke,
    putJoke,
};
