import { visitString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

declare const rgb: RGB | undefined;

// Test param types
visitString(rgb).with({
    r: (value) => {
        // $ExpectType RGB.R
        value;
    },
    g: (value) => {
        // $ExpectType RGB.G
        value;
    },
    b: (value) => {
        // $ExpectType RGB.B
        value;
    },
    handleUndefined: (value) => {
        // $ExpectType undefined
        value;
    },
    handleUnexpected: (value) => {
        // $ExpectType string | null
        value;
    }
});

// handleUnexpected is optional
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    handleUndefined: () => {}
});

// Return type is inferred
// $ExpectType number
visitString(rgb).with({
    r: () => 10,
    g: () => 20,
    b: () => 30,
    handleUndefined: () => -1
});
// $ExpectType string
visitString(rgb).with({
    r: () => "10",
    g: () => "20",
    b: () => "30",
    handleUndefined: () => "-1"
});

// Missing value handler causes error
// $ExpectError
visitString(rgb).with({
    r: () => {},
    b: () => {},
    handleUndefined: () => {}
});

// Missing undefined handler causes error
// $ExpectError
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {}
});

// Unexpected value handler causes error
visitString(rgb).with({
    r: () => {},
    // $ExpectError
    oops: () => {},
    g: () => {},
    b: () => {},
    handleUndefined: () => {}
});

// Unnecessary null handler causes error
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    // $ExpectError
    handleNull: () => {},
    handleUndefined: () => {}
});
