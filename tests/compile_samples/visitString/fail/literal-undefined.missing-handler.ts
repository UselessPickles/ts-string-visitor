import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

const result = visitString("r" as RGB | undefined).with({
    "r": () => {
        return 1;
    },
    "g": () => {
        return 2;
    },
    // Missing "b" handler
    handleUndefined: () => {
        return 0;
    }
});
