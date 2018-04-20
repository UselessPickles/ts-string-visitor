import { visitString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

// Test param types
// $ExpectType (value: RGB | undefined) => void
visitString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: (value) => {
            // $ExpectType RGB.R
            value;
        },
        g: (value) => {
            // $ExpectType RGB.G
            value;
        },
        b: (value) => {
            // $ExpectType RGB.B
            value;
        },
        handleUndefined: (value) => {
            // $ExpectType undefined
            value;
        },
        handleUnexpected: (value) => {
            // $ExpectType string | null
            value;
        }
    });

// handleUnexpected is optional
// $ExpectType (value: RGB | undefined) => void
visitString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: () => {},
        g: () => {},
        b: () => {},
        handleUndefined: () => {}
    });

// Return type is inferred
// $ExpectType (value: RGB | undefined) => number
visitString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: () => 10,
        g: () => 20,
        b: () => 30,
        handleUndefined: () => -1
    });
// $ExpectType (value: RGB | undefined) => string
visitString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: () => "10",
        g: () => "20",
        b: () => "30",
        handleUndefined: () => "-1"
    });

// Missing value handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orUndefined()
    // $ExpectError
    .with({
        r: () => {},
        b: () => {},
        handleUndefined: () => {}
    });

// Missing undefined handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orUndefined()
    // $ExpectError
    .with({
        r: () => {},
        g: () => {},
        b: () => {}
    });

// Unexpected value handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: () => {},
        // $ExpectError
        oops: () => {},
        g: () => {},
        b: () => {},
        handleUndefined: () => {}
    });

// Unnecessary null handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orUndefined()
    .with({
        r: () => {},
        g: () => {},
        b: () => {},
        handleUndefined: () => {},
        // $ExpectError
        handleNull: () => {}
    });
