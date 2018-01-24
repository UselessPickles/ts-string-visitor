import { mapString } from "../../../../src";

type RGB = "r" | "g" | "b";

mapString("r" as RGB).with({
    "r": 1,
    "g": 2,
    "b": 3,
    // handler for a value that doesn't exist
    "o": 4
});