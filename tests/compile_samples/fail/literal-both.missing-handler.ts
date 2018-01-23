import { visitString } from "../../../src";

type RGB = "r" | "g" | "b";

const result = visitString("r" as RGB | null | undefined).with({
    "r": () => {
        return 1;
    },
    "g": () => {
        return 2;
    },
    // Missing "b" handler
    handleNull: () => {
        return 0;
    },
    handleUndefined: () => {
        return 0;
    }
});
