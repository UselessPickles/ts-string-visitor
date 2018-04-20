import { mapString } from "../../../src";

type RGB = "r" | "g" | "b";

// Return type is inferred
// $ExpectType (value: "r" | "g" | "b" | undefined) => number
mapString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleUndefined: -1
    });
// $ExpectType (value: "r" | "g" | "b" | undefined) => string
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
// $ExpectType (value: "r" | "g" | "b" | undefined) => number
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

// Unnecessary null handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleUndefined: -1,
        // $ExpectError
        handleNull: -1
    });
