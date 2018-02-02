import { mapString } from "../../../../src";

type RGB = "r" | "g" | "b";

const result = mapString("r" as RGB | undefined).with<number>({
    "r": 1,
    "g": 2,
    "b": 3,
    handleUndefined: 0,
    handleUnexpected: -1
});

// tslint:disable-next-line:no-unused-variable
const test: number = result;
