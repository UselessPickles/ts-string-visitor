import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

visitString("r" as RGB | undefined).with({
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
