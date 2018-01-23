import { visitString } from "../../../src/visitString";
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
    // handleUndefined is unnecessary
    handleUndefined: () => {
        return 0;
    }
});
