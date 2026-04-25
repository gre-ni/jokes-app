export const GENERAL = "GENERAL";
export const PROGRAMMING = "PROGRAMMING";
export const KNOCK_KNOCK = "KNOCK_KNOCK";
export const DAD = "DAD";

export type Category =
    | typeof GENERAL
    | typeof PROGRAMMING
    | typeof KNOCK_KNOCK
    | typeof DAD;

export type Joke = {
    id: number;
    setup: string;
    punchline: string;
    category: Category;
    rating: number;
};
