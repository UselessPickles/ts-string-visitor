import { mapString } from "../../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

mapString("r" as RGB).with({
    [RGB.R]: 1,
    [RGB.G]: 2,
    [RGB.B]: 3
});
