import { visitString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

// Test param types
// $ExpectType (value: RGB) => void
visitString.makeFunctionFor<RGB>().with({
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
    handleUnexpected: (value) => {
        // $ExpectType string | null | undefined
        value;
    }
});

// handleUnexpected is optional
// $ExpectType (value: RGB) => void
visitString.makeFunctionFor<RGB>().with({
    r: () => {},
    g: () => {},
    b: () => {}
});

// Return type is inferred
// $ExpectType (value: RGB) => number
visitString.makeFunctionFor<RGB>().with({
    r: () => 10,
    g: () => 20,
    b: () => 30
});
// $ExpectType (value: RGB) => string
visitString.makeFunctionFor<RGB>().with({
    r: () => "10",
    g: () => "20",
    b: () => "30"
});

// Missing value handler causes error
// $ExpectError
visitString.makeFunctionFor<RGB>().with({
    r: () => {},
    b: () => {}
});

// Unexpected value handler causes error
visitString.makeFunctionFor<RGB>().with({
    r: () => {},
    // $ExpectError
    oops: () => {},
    g: () => {},
    b: () => {}
});

// Unnecessary null handler causes error
visitString.makeFunctionFor<RGB>().with({
    r: () => {},
    g: () => {},
    b: () => {},
    // $ExpectError
    handleNull: () => {}
});

// Unnecessary undefined handler causes error
visitString.makeFunctionFor<RGB>().with({
    r: () => {},
    g: () => {},
    b: () => {},
    // $ExpectError
    handleUndefined: () => {}
});
