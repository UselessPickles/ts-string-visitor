import { visitString } from "../../../dist/types";

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
    r: (value) => {},
    g: (value) => {},
    b: (value) => {},
    handleUndefined: (value) => {}
});

// Return type is inferred
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: (value) => 20,
    b: (value) => 30,
    handleUndefined: (value) => -1
});
// $ExpectType string
visitString(rgb).with({
    r: (value) => "10",
    g: (value) => "20",
    b: (value) => "30",
    handleUndefined: (value) => "-1"
});

// Return type is inferred when "unhandled" entries exist
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: visitString.unhandled,
    b: (value) => 30,
    handleUndefined: (value) => -1
});

// special handlers can be unhandled
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: (value) => 20,
    b: (value) => 30,
    handleUndefined: visitString.unhandled,
    handleUnexpected: visitString.unhandled
});

// Missing value handler causes error
// $ExpectError
visitString(rgb).with<void>({
    r: (value) => {},
    b: (value) => {},
    handleUndefined: (value) => {}
});

// Missing undefined handler causes error
// $ExpectError
visitString(rgb).with<void>({
    r: (value) => {},
    g: (value) => {},
    b: (value) => {}
});

// Unexpected value handler causes error
visitString(rgb).with({
    r: (value) => {},
    // $ExpectError
    oops: (value) => {},
    g: (value) => {},
    b: (value) => {},
    handleUndefined: (value) => {}
});

// Unnecessary null handler causes error
visitString(rgb).with({
    r: (value) => {},
    g: (value) => {},
    b: (value) => {},
    // $ExpectError
    handleNull: (value) => {},
    handleUndefined: (value) => {}
});
