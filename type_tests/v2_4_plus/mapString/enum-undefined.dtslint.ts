import { mapString } from "../../../dist/types";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

declare const rgb: RGB | undefined;

// Return type is inferred
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleUndefined: -1
});
// $ExpectType string
mapString(rgb).with({
    r: "10",
    g: "20",
    b: "30",
    handleUndefined: "-1"
});

// handleUnexpected is allowed
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleUndefined: -1,
    handleUnexpected: -1
});

// Missing value handler causes error
// $ExpectError
mapString(rgb).with({
    r: 10,
    b: 30,
    handleUndefined: -1
});

// Unexpected value handler causes error
mapString(rgb).with({
    r: 10,
    // $ExpectError
    oops: 42,
    g: 20,
    b: 30,
    handleUndefined: -1
});

// missing undefined handler causes error
// $ExpectError
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30
});

// Unnecessary null handler causes error
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    // $ExpectError
    handleNull: -1,
    handleUndefined: -1
});
