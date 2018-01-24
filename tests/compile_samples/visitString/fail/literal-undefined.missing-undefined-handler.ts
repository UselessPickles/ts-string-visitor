import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

visitString("r" as RGB | undefined).with({
    "r": () => {
        return 1;
    },
    "g": () => {
        return 2;
    },
    "b": () => {
        return 3;
    }
    // missing handleUndefined
});
