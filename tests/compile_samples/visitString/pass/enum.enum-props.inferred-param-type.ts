import { visitString } from "../../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

visitString("r" as RGB).with({
    [RGB.R]: value => {
        // tslint:disable-next-line:no-unused-variable
        const test: RGB.R = value;
    },
    [RGB.G]: value => {
        // tslint:disable-next-line:no-unused-variable
        const test: RGB.G = value;
    },
    [RGB.B]: value => {
        // tslint:disable-next-line:no-unused-variable
        const test: RGB.B = value;
    }
});
