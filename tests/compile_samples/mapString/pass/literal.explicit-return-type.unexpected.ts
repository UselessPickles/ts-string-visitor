import { mapString } from "../../../../src";

type RGB = "r" | "g" | "b";

const result = mapString("r" as RGB).with<number>({
    r: 1,
    g: 2,
    b: 3,
    handleUnexpected: -1
});

// tslint:disable-next-line:no-unused-variable
const test: number = result;
