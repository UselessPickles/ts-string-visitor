import { mapString } from "../../../dist/types";

type RGB = "r" | "g" | "b";

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

// handleUnexpected is allowed
mapString(rgb).with({
    r: 10,
    g: 20,
    b: 30,
    handleNull: -1,
    handleUnexpected: -1
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

// Unnecessary undefined handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleNull: -1,
        // $ExpectError
        handleUndefined: -1
    });
