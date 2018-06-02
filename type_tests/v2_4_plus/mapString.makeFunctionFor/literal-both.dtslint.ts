import { mapString } from "../../../dist/types";

type RGB = "r" | "g" | "b";

// Return type is inferred
// $ExpectType (value: "r" | "g" | "b" | null | undefined) => number
mapString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleNull: -1,
        handleUndefined: -1
    });
// $ExpectType (value: "r" | "g" | "b" | null | undefined) => string
mapString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    .with({
        r: "10",
        g: "20",
        b: "30",
        handleNull: "-1",
        handleUndefined: "-1"
    });

// handleUnexpected is allowed
// $ExpectType (value: "r" | "g" | "b" | null | undefined) => number
mapString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    .with({
        r: 10,
        g: 20,
        b: 30,
        handleUnexpected: -1,
        handleNull: -1,
        handleUndefined: -1
    });

// Missing value handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    // $ExpectError
    .with({
        r: 10,
        b: 30,
        handleNull: -1,
        handleUndefined: -1
    });

// Missing null handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    // $ExpectError
    .with({
        r: 10,
        g: 20,
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
        b: 30,
        handleNull: -1
    });

// Unexpected value handler causes error
mapString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    .with({
        r: 10,
        // $ExpectError
        oops: 42,
        g: 20,
        b: 30,
        handleNull: -1,
        handleUndefined: -1
    });
