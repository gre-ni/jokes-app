import type { Joke as JokeType } from "../types.ts";
import { JokeElement } from "./JokeElement.tsx";

type JokeListProps = {
    jokes: JokeType[];
};

export const JokeList = ({ jokes }: JokeListProps) => {
    return (
        <div>
            {jokes.map((joke) => (
                <JokeElement key={joke.id} joke={joke} />
            ))}
        </div>
    );
};
