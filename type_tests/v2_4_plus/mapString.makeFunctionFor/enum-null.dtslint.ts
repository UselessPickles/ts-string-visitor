import { mapString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

// Return type is inferred
// $ExpectType (value: RGB | null) => number
mapString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleNull: -1
    });
// $ExpectType (value: RGB | null) => string
mapString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: "10",
        g: "20",
        b: "30",
        handleNull: "-1"
    });

// handleUnexpected is allowed
// $ExpectType (value: RGB | null) => number
mapString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleUnexpected: -1,
        handleNull: -1
    });

// Missing value handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orNull()
    // $ExpectError
    .with({
        r: 10,
        b: 30,
        handleNull: -1
    });

// Missing null handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    // $ExpectError
    .with({
        r: 10,
        g: 20,
        b: 30
    });

// Unexpected value handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: 10,
        // $ExpectError
        oops: 42,
        g: 20,
        b: 30,
        handleNull: -1
    });
