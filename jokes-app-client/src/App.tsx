import { JokeList } from "./components/JokeList";
import type { Joke as JokeType } from "./types.ts";
import type { Category } from "./types.ts";
import { useState, useEffect } from "react";

function App() {
    const [jokeData, setJokeData] = useState<JokeType[] | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<Category | undefined>();

    const categories: Category[] = [
        "DAD",
        "GENERAL",
        "KNOCK_KNOCK",
        "PROGRAMMING",
    ];

    const changeCategory = (e) => {
        setSelectedType(e.target.value);
    };

    useEffect(() => {
        const fetchAllData = async (): Promise<void> => {
            const response = await fetch("http://localhost:8080/jokes");
            const fetchedData = (await response.json()) as JokeType[];
            setJokeData(fetchedData);
        };
        const fetchSelectedData = async (category: Category): Promise<void> => {
            const response = await fetch(
                `http://localhost:8080/jokes?category=${category}`,
            );
            const fetchedData = (await response.json()) as JokeType[];
            setJokeData(fetchedData);
        };

        if (selectedType === undefined) {
            fetchAllData();
        } else {
            fetchSelectedData(selectedType);
        }
    }, [selectedType]);

    if (jokeData === undefined) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="max-w-md m-auto">
            <select onChange={changeCategory}>
                {categories.map((category) => (
                    <option>{category}</option>
                ))}
            </select>
            <JokeList jokes={jokeData} />
        </div>
    );
}

export default App;
