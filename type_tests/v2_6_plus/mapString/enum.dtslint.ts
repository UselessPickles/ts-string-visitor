import { mapString } from "../../../dist/types";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

declare const rgb: RGB;

// Test enum value computed property names (no compiler error).
// (only supported as of TS 2.6.1)
mapString(rgb).with({
    [RGB.R]: 10,
    [RGB.G]: 20,
    [RGB.B]: 30
});
