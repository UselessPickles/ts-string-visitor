import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

visitString("r" as RGB | undefined).with({
    "r": (value: RGB) => {
        // empty
    },
    "g": (value: RGB) => {
        // empty
    },
    "b": (value: RGB) => {
        // empty
    },
    handleUndefined: (value: undefined) => {
        // empty
    }
});
