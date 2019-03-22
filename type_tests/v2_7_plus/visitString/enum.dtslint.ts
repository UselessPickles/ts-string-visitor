import { visitString } from "../../../dist/types";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

declare const rgb: RGB;

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
    handleUnexpected: (value) => {
        // $ExpectType string | null | undefined
        value;
    }
});

// handleUnexpected is optional
visitString(rgb).with({
    r: (value) => {},
    g: (value) => {},
    b: (value) => {}
});

// Return type is inferred
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: (value) => 20,
    b: (value) => 30
});
// $ExpectType string
visitString(rgb).with({
    r: (value) => "10",
    g: (value) => "20",
    b: (value) => "30"
});

// Return type is inferred when "unhandled" entries exist
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: visitString.unhandled,
    b: (value) => 30
});

// special handlers can be unhandled
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: (value) => 20,
    b: (value) => 30,
    handleUnexpected: visitString.unhandled
});

// Missing value handler causes error
// $ExpectError
visitString(rgb).with<void>({
    r: (value) => {},
    b: (value) => {}
});

// Unexpected value handler causes error
visitString(rgb).with({
    r: (value) => {},
    // $ExpectError
    oops: (value) => {},
    g: (value) => {},
    b: (value) => {}
});

// Unnecessary null handler causes error
visitString(rgb).with({
    r: (value) => {},
    g: (value) => {},
    b: (value) => {},
    // $ExpectError
    handleNull: (value) => {}
});

// Unnecessary undefined handler causes error
visitString(rgb).with({
    r: (value) => {},
    g: (value) => {},
    b: (value) => {},
    // $ExpectError
    handleUndefined: (value) => {}
});

// Test enum value computed property names (no compiler error).
// (only supported as of TS 2.6.1)
visitString(rgb).with({
    [RGB.R]: () => {},
    [RGB.G]: () => {},
    [RGB.B]: () => {}
});

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
