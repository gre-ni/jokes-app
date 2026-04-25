import { type Joke } from "../types.ts";

type JokeProps = {
    joke: Joke;
};

export const JokeElement = ({ joke }: JokeProps) => {
    return (
        <div key={joke.id}>
            <h3>{joke.setup}</h3>
            <p>{joke.punchline}</p>
            <div>
                <p>Category: {joke.category}</p>
                <p>Rating: {joke.rating}</p>
            </div>
        </div>
    );
};
