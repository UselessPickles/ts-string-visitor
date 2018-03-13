import { visitString } from "../../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

visitString("r" as RGB).with({
    r: () => {
        return 1;
    },
    g: () => {
        return 2;
    },
    b: () => {
        return 3;
    }
});
