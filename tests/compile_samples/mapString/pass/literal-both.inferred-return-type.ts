import { mapString } from "../../../../src";

type RGB = "r" | "g" | "b";

const result = mapString("r" as RGB | null | undefined).with({
    r: 1,
    g: 2,
    b: 3,
    handleNull: 0,
    handleUndefined: 0
});

// tslint:disable-next-line:no-unused-variable
const test: number = result;
