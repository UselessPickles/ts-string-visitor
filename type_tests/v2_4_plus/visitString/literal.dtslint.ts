import { visitString } from "../../../dist/types";

type RGB = "r" | "g" | "b";

declare const rgb: RGB;

// Test param types
visitString(rgb).with({
    r: (value) => {
        // $ExpectType "r"
        value;
    },
    g: (value) => {
        // $ExpectType "g"
        value;
    },
    b: (value) => {
        // $ExpectType "b"
        value;
    },
    handleUnexpected: (value) => {
        // $ExpectType string | null | undefined
        value;
    }
});

// handleUnexpected is optional
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {}
});

// Return type is inferred
// $ExpectType number
visitString(rgb).with({
    r: () => 10,
    g: () => 20,
    b: () => 30
});
// $ExpectType string
visitString(rgb).with({
    r: () => "10",
    g: () => "20",
    b: () => "30"
});

// Missing value handler causes error
// $ExpectError
visitString(rgb).with({
    r: () => {},
    b: () => {}
});

// Unexpected value handler causes error
visitString(rgb).with({
    r: () => {},
    // $ExpectError
    oops: () => {},
    g: () => {},
    b: () => {}
});

// Unnecessary null handler causes error
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    // $ExpectError
    handleNull: () => {}
});

// Unnecessary undefined handler causes error
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    // $ExpectError
    handleUndefined: () => {}
});
