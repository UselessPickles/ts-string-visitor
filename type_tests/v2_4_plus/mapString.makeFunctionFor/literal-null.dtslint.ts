import { mapString } from "../../../dist/types";

type RGB = "r" | "g" | "b";

// Return type is inferred
// $ExpectType (value: "r" | "g" | "b" | null) => number
mapString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleNull: -1
    });
// $ExpectType (value: "r" | "g" | "b" | null) => string
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
// $ExpectType (value: "r" | "g" | "b" | null) => number
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
