import { mapString } from "../../../dist/types";

type RGB = "r" | "g" | "b";

declare const rgb: RGB | null | undefined;

// Return type is inferred
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: -1,
    handleUndefined: -1
});
// $ExpectType string
mapString(rgb).with({
    r: "10",
    g: "20",
    b: "30",
    handleNull: "-1",
    handleUndefined: "-1"
});

// Return type is inferred when "unhandled" entries exist
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: mapString.unhandled,
    b: 30,
    handleNull: -1,
    handleUndefined: -1
});

// handleUnexpected is allowed
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: -1,
    handleUndefined: -1,
    handleUnexpected: -1
});

// special handlers can be unhandled
// $ExpectType number
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: mapString.unhandled,
    handleUndefined: mapString.unhandled,
    handleUnexpected: mapString.unhandled
});

// Missing value handler causes error
// $ExpectError
mapString(rgb).with({
    r: 10,
    b: 30,
    handleNull: -1,
    handleUndefined: -1
});

// Unexpected value handler causes error
mapString(rgb).with({
    r: 10,
    // $ExpectError
    oops: 42,
    g: 20,
    b: 30,
    handleNull: -1,
    handleUndefined: -1
});

// missing null handler causes error
// $ExpectError
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleUndefined: -1
});

// missing undefined handler causes error
// $ExpectError
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: -1
});
