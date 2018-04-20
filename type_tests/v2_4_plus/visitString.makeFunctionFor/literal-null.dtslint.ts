import { visitString } from "../../../src";

type RGB = "r" | "g" | "b";

// Test param types
// $ExpectType (value: "r" | "g" | "b" | null) => void
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: (value) => {
            // $ExpectType "r"
            value;
        },
        g: (value) => {
            // $ExpectType "g"
            value;
        },
        b: (value) => {
            // $ExpectType "b"
            value;
        },
        handleNull: (value) => {
            // $ExpectType null
            value;
        },
        handleUnexpected: (value) => {
            // $ExpectType string | undefined
            value;
        }
    });

// handleUnexpected is optional
// $ExpectType (value: "r" | "g" | "b" | null) => void
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: () => {},
        g: () => {},
        b: () => {},
        handleNull: () => {}
    });

// Return type is inferred
// $ExpectType (value: "r" | "g" | "b" | null) => number
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: () => 10,
        g: () => 20,
        b: () => 30,
        handleNull: () => -1
    });
// $ExpectType (value: "r" | "g" | "b" | null) => string
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: () => "10",
        g: () => "20",
        b: () => "30",
        handleNull: () => "-1"
    });

// Missing value handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    // $ExpectError
    .with({
        r: () => {},
        b: () => {},
        handleNull: () => {}
    });

// Missing null handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    // $ExpectError
    .with({
        r: () => {},
        g: () => {},
        b: () => {}
    });

// Unexpected value handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: () => {},
        // $ExpectError
        oops: () => {},
        g: () => {},
        b: () => {},
        handleNull: () => {},
        handleUndefined: () => {}
    });

// Unnecessary undefined handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: () => {},
        g: () => {},
        b: () => {},
        handleNull: () => {},
        // $ExpectError
        handleUndefined: () => {}
    });
