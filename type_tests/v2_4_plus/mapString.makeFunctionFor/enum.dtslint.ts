import { mapString } from "../../../src";

enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

// Return type is inferred
// $ExpectType (value: RGB) => number
mapString.makeFunctionFor<RGB>().with({
    r: 10,
    g: 20,
    b: 30
});
// $ExpectType (value: RGB) => string
mapString.makeFunctionFor<RGB>().with({
    r: "10",
    g: "20",
    b: "30"
});

// handleUnexpected is allowed
// $ExpectType (value: RGB) => number
mapString.makeFunctionFor<RGB>().with({
    r: 10,
    g: 20,
    b: 30,
    handleUnexpected: -1
});

// Missing value handler causes error
// $ExpectError
mapString.makeFunctionFor<RGB>().with({
    r: 10,
    b: 30
});

// Unexpected value handler causes error
mapString.makeFunctionFor<RGB>().with({
    r: 10,
    // $ExpectError
    oops: 42,
    g: 20,
    b: 30
});
