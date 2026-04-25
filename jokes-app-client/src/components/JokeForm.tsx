import { useState } from "react";
import type { Category } from "../types.ts";
import { categories } from "../utils.ts";

type JokeTextType = {
    setup: string;
    punchline: string;
};

export const JokeForm = () => {
    // States with all elements separatelt:
    const [category, setCategory] = useState<Category>("GENERAL");
    const [jokeText, setJokeText] = useState<JokeTextType>({
        setup: "",
        punchline: "",
    });
    const [rating, setRating] = useState<number>(3);

    // Event handlers:
    const handleCategorySelection = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCategory(e.target.value as Category);
        console.log(category);
    };

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "setup") {
            setJokeText({ ...jokeText, setup: e.target.value });
        } else if (e.target.name === "punchline") {
            setJokeText({ ...jokeText, punchline: e.target.value });
        }
    };

    const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number(e.target.value) as number);
    };

    // Submission
    const submitJoke = async (e: React.SubmitEvent): Promise<void> => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/jokes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                setup: jokeText.setup,
                punchline: jokeText.punchline,
                category: category,
                rating: rating,
            }),
        });
        console.log(response);
    };

    return (
        <div className="my-4 p-4 border-2 rounded">
            <form onSubmit={submitJoke} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Your setup"
                    name="setup"
                    onChange={handleText}
                />
                <input
                    type="text"
                    placeholder="Your punchline"
                    name="punchline"
                    onChange={handleText}
                />
                <select
                    onChange={handleCategorySelection}
                    defaultValue="GENERAL"
                >
                    {categories.map((category) => (
                        <option value={category} key={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Rating"
                    min="1"
                    max="5"
                    onChange={handleRating}
                />
                <button type="submit">Submit Joke</button>
            </form>
        </div>
    );
};
