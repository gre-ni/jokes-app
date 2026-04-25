import { JokeList } from "./components/JokeList";
import { JokeForm } from "./components/JokeForm.tsx";
import type { Joke as JokeType } from "./types.ts";
import type { Category } from "./types.ts";
import { useState, useEffect } from "react";
import { categories } from "./utils.ts";

function App() {
    type AllOptions = Category | undefined | "ALL";

    const [jokeData, setJokeData] = useState<JokeType[] | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<AllOptions>(undefined);

    const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value as AllOptions);
        console.log(selectedType);
    };

    useEffect(() => {
        const fetchAllData = async (): Promise<void> => {
            const response = await fetch("http://localhost:8080/jokes");
            const fetchedData = (await response.json()) as JokeType[];
            setJokeData(fetchedData);
        };
        const fetchSelectedData = async (
            category: Category | undefined,
        ): Promise<void> => {
            const response = await fetch(
                `http://localhost:8080/jokes?category=${category}`,
            );
            const fetchedData = (await response.json()) as JokeType[];
            setJokeData(fetchedData);
        };

        if (selectedType === undefined || selectedType === "ALL") {
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
            <div className="flex flex-row gap-2">
                <p>Select category:</p>
                <select onChange={changeCategory} defaultValue={"ALL"}>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                    <option value={"ALL"}>ALL</option>
                </select>
            </div>
            <JokeForm />
            <JokeList jokes={jokeData} />
        </div>
    );
}

export default App;
