import { mapString } from "../../../dist/types";

type RGB = "r" | "g" | "b";

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

// Return type is inferred when "unhandled" entries exist
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: mapString.unhandled(),
    b: 30
});

// handleUnexpected is allowed
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleUnexpected: -1
});

// special handlers can be unhandled
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleUnexpected: mapString.unhandled()
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
