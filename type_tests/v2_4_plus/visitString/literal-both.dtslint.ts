import { visitString } from "../../../src";

type RGB = "r" | "g" | "b";

declare const rgb: RGB | null | undefined;

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
    handleNull: (value) => {
        // $ExpectType null
        value;
    },
    handleUndefined: (value) => {
        // $ExpectType undefined
        value;
    },
    handleUnexpected: (value) => {
        // $ExpectType string
        value;
    }
});

// handleUnexpected is optional
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    handleNull: () => {},
    handleUndefined: () => {}
});

// Return type is inferred
// $ExpectType number
visitString(rgb).with({
    r: () => 10,
    g: () => 20,
    b: () => 30,
    handleNull: () => -1,
    handleUndefined: () => -1
});
// $ExpectType string
visitString(rgb).with({
    r: () => "10",
    g: () => "20",
    b: () => "30",
    handleNull: () => "-1",
    handleUndefined: () => "-1"
});

// Missing value handler causes error
// $ExpectError
visitString(rgb).with({
    r: () => {},
    b: () => {},
    handleNull: () => {},
    handleUndefined: () => {}
});

// Missing null handler causes error
// $ExpectError
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    handleUndefined: () => {}
});

// Missing undefined handler causes error
// $ExpectError
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    handleNull: () => {}
});

// Unexpected value handler causes error
visitString(rgb).with({
    r: () => {},
    // $ExpectError
    oops: () => {},
    g: () => {},
    b: () => {},
    handleNull: () => {},
    handleUndefined: () => {}
});
