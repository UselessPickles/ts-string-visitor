import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

const result = visitString("r" as RGB | null | undefined).with({
    "r": () => {
        return 1;
    },
    "g": () => {
        return 2;
    },
    "b": () => {
        return 3;
    },
    handleNull: () => {
        return 0;
    },
    handleUndefined: () => {
        return 0;
    },
    handleUnexpected: () => {
        return -1;
    }
});

// tslint:disable-next-line:no-unused-variable
const test: number = result;
