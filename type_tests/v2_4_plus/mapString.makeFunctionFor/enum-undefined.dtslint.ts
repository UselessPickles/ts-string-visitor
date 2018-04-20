import { mapString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

// Return type is inferred
// $ExpectType (value: RGB | undefined) => number
mapString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleUndefined: -1
    });
// $ExpectType (value: RGB | undefined) => string
mapString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: "10",
        g: "20",
        b: "30",
        handleUndefined: "-1"
    });

// handleUnexpected is allowed
// $ExpectType (value: RGB | undefined) => number
mapString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleUnexpected: -1,
        handleUndefined: -1
    });

// Missing value handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orUndefined()
    // $ExpectError
    .with({
        r: 10,
        b: 30,
        handleUndefined: -1
    });

// Missing undefined handler causes error
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
    .orUndefined()
    .with({
        r: 10,
        // $ExpectError
        oops: 42,
        g: 20,
        b: 30,
        handleUndefined: -1
    });
