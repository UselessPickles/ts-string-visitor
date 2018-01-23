import { visitString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

visitString("r" as RGB).with({
    "r": (value) => {
        // tslint:disable-next-line:no-unused-variable
        const test: RGB.R = value;
    },
    "g": (value) => {
        // tslint:disable-next-line:no-unused-variable
        const test: RGB.G = value;
    },
    "b": (value) => {
        // tslint:disable-next-line:no-unused-variable
        const test: RGB.B = value;
    }
});
