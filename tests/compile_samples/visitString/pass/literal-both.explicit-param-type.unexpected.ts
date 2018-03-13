import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

visitString("r" as RGB | null | undefined).with({
    r: (value: RGB) => {
        // empty
    },
    g: (value: RGB) => {
        // empty
    },
    b: (value: RGB) => {
        // empty
    },
    handleNull: (value: null) => {
        // empty
    },
    handleUndefined: (value: undefined) => {
        // empty
    },
    handleUnexpected: (value: string) => {
        // empty
    }
});
