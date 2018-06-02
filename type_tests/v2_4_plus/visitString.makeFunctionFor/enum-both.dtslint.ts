import { visitString } from "../../../dist/types";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

// Test param types
// $ExpectType (value: RGB | null | undefined) => void
visitString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
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
        handleUndefined: (value) => {
            // $ExpectType undefined
            value;
        },
        handleUnexpected: (value) => {
            // $ExpectType string
            value;
        }
    });

// handleUnexpected is optional
// $ExpectType (value: RGB | null | undefined) => void
visitString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    .with({
        r: () => {},
        g: () => {},
        b: () => {},
        handleNull: () => {},
        handleUndefined: () => {}
    });

// Return type is inferred
// $ExpectType (value: RGB | null | undefined) => number
visitString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    .with({
        r: () => 10,
        g: () => 20,
        b: () => 30,
        handleNull: () => -1,
        handleUndefined: () => -1
    });
// $ExpectType (value: RGB | null | undefined) => string
visitString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    .with({
        r: () => "10",
        g: () => "20",
        b: () => "30",
        handleNull: () => "-1",
        handleUndefined: () => "-1"
    });

// Missing value handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    // $ExpectError
    .with({
        r: () => {},
        b: () => {},
        handleNull: () => {},
        handleUndefined: () => {}
    });

// Missing null handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    // $ExpectError
    .with({
        r: () => {},
        g: () => {},
        b: () => {},
        handleUndefined: () => {}
    });

// Missing undefined handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    // $ExpectError
    .with({
        r: () => {},
        g: () => {},
        b: () => {},
        handleNull: () => {}
    });

// Unexpected value handler causes error
visitString
    .makeFunctionFor<RGB>()
    .orNullorUndefined()
    .with({
        r: () => {},
        // $ExpectError
        oops: () => {},
        g: () => {},
        b: () => {},
        handleNull: () => {},
        handleUndefined: () => {}
    });
