import { mapString } from "../../../dist/types";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

declare const rgb: RGB | null;

// Return type is inferred
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: -1
});
// $ExpectType string
mapString(rgb).with({
    r: "10",
    g: "20",
    b: "30",
    handleNull: "-1"
});

// Return type is inferred when "unhandled" entries exist
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: mapString.unhandled,
    b: 30,
    handleNull: -1
});

// handleUnexpected is allowed
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: -1,
    handleUnexpected: -1
});

// special handlers can be unhandled
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: mapString.unhandled,
    handleUnexpected: mapString.unhandled
});

// Missing value handler causes error
// $ExpectError
mapString(rgb).with({
    r: 10,
    b: 30,
    handleNull: -1
});

// Unexpected value handler causes error
mapString(rgb).with({
    r: 10,
    // $ExpectError
    oops: 42,
    g: 20,
    b: 30,
    handleNull: -1
});

// missing null handler causes error
// $ExpectError
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30
});

// Unnecessary undefined handler causes error
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: -1,
    // $ExpectError
    handleUndefined: -1
});
