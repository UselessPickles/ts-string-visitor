import { mapString } from "../../../dist/types";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

declare const rgb: RGB;

// Return type is inferred
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30
});
// $ExpectType string
mapString(rgb).with({
    r: "10",
    g: "20",
    b: "30"
});

// handleUnexpected is allowed
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleUnexpected: -1
});

// Missing value handler causes error
// $ExpectError
mapString(rgb).with({
    r: 10,
    b: 30
});

// Unexpected value handler causes error
mapString(rgb).with({
    r: 10,
    // $ExpectError
    oops: 42,
    g: 20,
    b: 30
});

// Unnecessary null handler causes error
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    // $ExpectError
    handleNull: -1
});

// Unnecessary undefined handler causes error
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    // $ExpectError
    handleUndefined: -1
});
