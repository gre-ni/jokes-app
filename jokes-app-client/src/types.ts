export type Category = "GENERAL" | "PROGRAMMING" | "KNOCK_KNOCK" | "DAD";

export type Joke = {
    id: number;
    setup: string;
    punchline: string;
    category: Category;
    rating: number;
};
