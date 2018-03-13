import { mapString } from "../../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

mapString("r" as RGB).with({
    r: 1,
    g: 2,
    b: 3
});
