import { visitString } from "../../../dist/types";

type RGB = "r" | "g" | "b";

declare const rgb: RGB | null;

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
    handleUnexpected: (value) => {
        // $ExpectType string | undefined
        value;
    }
});

// handleUnexpected is optional
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    handleNull: () => {}
});

// Return type is inferred
// $ExpectType number
visitString(rgb).with({
    r: () => 10,
    g: () => 20,
    b: () => 30,
    handleNull: () => -1
});
// $ExpectType string
visitString(rgb).with({
    r: () => "10",
    g: () => "20",
    b: () => "30",
    handleNull: () => "-1"
});

// Missing value handler causes error
// $ExpectError
visitString(rgb).with({
    r: () => {},
    b: () => {},
    handleNull: () => {}
});

// Missing null handler causes error
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
    handleNull: () => {}
});

// Unnecessary undefined handler causes error
visitString(rgb).with({
    r: () => {},
    g: () => {},
    b: () => {},
    handleNull: () => {},
    // $ExpectError
    handleUndefined: () => {}
});
