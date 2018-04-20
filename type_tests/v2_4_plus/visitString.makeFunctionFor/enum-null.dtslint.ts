import { visitString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

// Test param types
// $ExpectType (value: RGB | null) => void
visitString
    .makeFunctionFor<RGB>()
    .orNull()
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
// $ExpectType (value: RGB | null) => void
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
// $ExpectType (value: RGB | null) => number
visitString
    .makeFunctionFor<RGB>()
    .orNull()
    .with({
        r: () => 10,
        g: () => 20,
        b: () => 30,
        handleNull: () => -1
    });
// $ExpectType (value: RGB | null) => string
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
        handleNull: () => {}
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
