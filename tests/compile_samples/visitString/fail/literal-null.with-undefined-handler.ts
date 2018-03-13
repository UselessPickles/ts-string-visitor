import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

visitString("r" as RGB | null).with({
    r: () => {
        return 1;
    },
    g: () => {
        return 2;
    },
    b: () => {
        return 3;
    },
    handleNull: () => {
        return 0;
    },
    // handleUndefined is unnecessary
    handleUndefined: () => {
        return 0;
    }
});
