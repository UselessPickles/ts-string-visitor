import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

visitString("r" as RGB).with({
    "r": (value: RGB) => {
        // empty
    },
    "g": (value: RGB) => {
        // empty
    },
    "b": (value: RGB) => {
        // empty
    },
    // missing "null" in param type
    handleUnexpected: (value: string | undefined) => {
        // empty
    }
});
