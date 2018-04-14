import { visitString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

declare const rgb: RGB;

// Test enum value computed property names (no compiler error).
// (only supported as of TS 2.6.1)
visitString(rgb).with({
    [RGB.R]: () => {},
    [RGB.G]: () => {},
    [RGB.B]: () => {}
});
