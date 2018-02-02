import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

const result = visitString("r" as RGB).with({
    "r": () => {
        return 1;
    },
    "g": () => {
        return 2;
    },
    "b": () => {
        return 3;
    },
    handleUnexpected: () => {
        return -1;
    }
});

// tslint:disable-next-line:no-unused-variable
const test: number = result;
