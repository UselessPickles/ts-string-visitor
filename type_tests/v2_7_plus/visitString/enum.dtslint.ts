import { visitString } from "../../../dist/types";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

declare const rgb: RGB;

// Test enum value computed property names with inferred parameter types
// (only supported as of TS 2.7.1)
visitString(rgb).with({
    [RGB.R]: (value) => {
        // $ExpectType RGB.R
        value;
    },
    [RGB.G]: (value) => {
        // $ExpectType RGB.G
        value;
    },
    [RGB.B]: (value) => {
        // $ExpectType RGB.B
        value;
    }
});
