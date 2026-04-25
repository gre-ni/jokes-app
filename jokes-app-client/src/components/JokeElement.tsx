import type { Joke as JokeType } from "../types.ts";

type JokeProps = {
    joke: JokeType;
};

// const deleteJoke = (id: number) => {

// }

export const JokeElement = ({ joke }: JokeProps) => {
    return (
        <div key={joke.id} className="my-4 p-4 rounded bg-lighter-bg">
            <div className="mb-2">
                <h3 className="">{joke.setup}</h3>
                <p>{joke.punchline}</p>
            </div>
            <div className="flex flex-row gap-3">
                <p className="bg-highlight py-1 px-3 rounded-sm">
                    {joke.category}
                </p>
                <div className="">{joke.rating}</div>
                {/* <button onClick={(joke.id) => deleteJoke}></button> */}
            </div>
        </div>
    );
};
