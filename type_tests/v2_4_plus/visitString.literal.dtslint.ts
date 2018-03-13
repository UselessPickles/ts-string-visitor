import { visitString } from "../../src";

type RGB = "r" | "g" | "b";

declare const rgb: RGB;
declare const rgbOrNull: RGB | null;
declare const rgbOrUndefined: RGB | undefined;
declare const rgbOrNil: RGB | null | undefined;

// $ExpectType void
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
    }
});

// $ExpectType void
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
    handleUnexpected: (value) => {
        // $ExpectType string | null | undefined
        value;
    }
});

// $ExpectType void
visitString(rgbOrNull).with({
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
    }
});

// $ExpectType void
visitString(rgbOrNull).with({
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

// $ExpectType void
visitString(rgbOrUndefined).with({
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
    handleUndefined: (value) => {
        // $ExpectType undefined
        value;
    }
});

// $ExpectType void
visitString(rgbOrUndefined).with({
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
    handleUndefined: (value) => {
        // $ExpectType undefined
        value;
    },
    handleUnexpected: (value) => {
        // $ExpectType string | null
        value;
    }
});

// $ExpectType void
visitString(rgbOrNil).with({
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
    }
});

// $ExpectType void
visitString(rgbOrNil).with({
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
