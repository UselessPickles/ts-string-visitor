import { visitString } from "../../../dist/types";

type RGB = "r" | "g" | "b";

declare const rgb: RGB | null | undefined;

// Test param types
visitString(rgb).with({
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
visitString(rgb).with({
    r: (value) => {},
    g: (value) => {},
    b: (value) => {},
    handleNull: (value) => {},
    handleUndefined: (value) => {}
});

// Return type is inferred
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: (value) => 20,
    b: (value) => 30,
    handleNull: (value) => -1,
    handleUndefined: (value) => -1
});
// $ExpectType string
visitString(rgb).with({
    r: (value) => "10",
    g: (value) => "20",
    b: (value) => "30",
    handleNull: (value) => "-1",
    handleUndefined: (value) => "-1"
});

// Return type is inferred when "unhandled" entries exist
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: visitString.unhandled(),
    b: (value) => 30,
    handleNull: (value) => -1,
    handleUndefined: (value) => -1
});

// special handlers can be unhandled
// $ExpectType number
visitString(rgb).with({
    r: (value) => 10,
    g: (value) => 20,
    b: (value) => 30,
    handleNull: visitString.unhandled(),
    handleUndefined: visitString.unhandled(),
    handleUnexpected: visitString.unhandled()
});

// Missing value handler causes error
// $ExpectError
visitString(rgb).with({
    r: (value) => {},
    b: (value) => {},
    handleNull: (value) => {},
    handleUndefined: (value) => {}
});

// Missing null handler causes error
// $ExpectError
visitString(rgb).with({
    r: (value) => {},
    g: (value) => {},
    b: (value) => {},
    handleUndefined: (value) => {}
});

// Missing undefined handler causes error
// $ExpectError
visitString(rgb).with({
    r: (value) => {},
    g: (value) => {},
    b: (value) => {},
    handleNull: (value) => {}
});

// Unexpected value handler causes error
visitString(rgb).with({
    r: (value) => {},
    // $ExpectError
    oops: (value) => {},
    g: (value) => {},
    b: (value) => {},
    handleNull: (value) => {},
    handleUndefined: (value) => {}
});
