import { visitString } from "../../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

const result = visitString("r" as RGB).with({
    [RGB.R]: () => {
        return 1;
    },
    [RGB.G]: () => {
        return 2;
    },
    [RGB.B]: () => {
        return 3;
    }
});
