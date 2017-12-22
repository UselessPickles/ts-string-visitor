[![npm version](https://img.shields.io/npm/v/ts-string-visitor.svg)](https://www.npmjs.com/package/ts-string-visitor)
[![Build Status](https://travis-ci.org/UselessPickles/ts-string-visitor.svg?branch=master)](https://travis-ci.org/UselessPickles/ts-string-visitor)
[![Coverage Status](https://coveralls.io/repos/github/UselessPickles/ts-string-visitor/badge.svg?branch=master)](https://coveralls.io/github/UselessPickles/ts-string-visitor?branch=master)

# ts-string-visitor
Generic TypeScript Visitor for String Enums and String Literal Union Types

# Contents
<!-- TOC depthFrom:2 -->

- [What is it?](#what-is-it)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
    - [Installation](#installation)
    - [Import `visitString`](#import-visitstring)
    - [Usage Example](#usage-example)
- [Handling Null/Undefined](#handling-nullundefined)
- [Visitor Method Return Values](#visitor-method-return-values)
- [Being Explicit About Return Type](#being-explicit-about-return-type)
- [Visitor Method Parameters](#visitor-method-parameters)
- [Sharing Visitor Methods Across Multiple Values](#sharing-visitor-methods-across-multiple-values)
    - [Without Using Visitor Method Parameters](#without-using-visitor-method-parameters)
    - [Using Visitor Method Parameters](#using-visitor-method-parameters)
- [Visiting Enums](#visiting-enums)
- [Enum Visitor Method Parameter Types](#enum-visitor-method-parameter-types)
- [Enum Limitations](#enum-limitations)
    - [Only Literal String "Union Enums" Supported](#only-literal-string-union-enums-supported)
    - [Visitor Method Parameter Type Not Inferred](#visitor-method-parameter-type-not-inferred)
- [What's up with this chained `visitString().with()` syntax?](#whats-up-with-this-chained-visitstringwith-syntax)

<!-- /TOC -->

## What is it?
`ts-string-visitor` implements a visitor pattern for TypeScript string enum types, and TypeScript string literal union types. This helps you avoid bugs caused by forgetting to handle a possible value, and helps you quickly find code that needs to be updated after refactoring a string enum or string literal union type. If your code uses `ts-string-visitor` and does not handle all possible values, the code will fail to compile, and the compiler error messages will point you in the right direction to fix your code.


## Requirements
* **TypeScript**: The main benefit of `ts-string-visitor` is the compile-time checks. It won't do you any good in a JavaScript project.
* **TypeScript's "strictNullChecks" option**: `ts-string-visitor` helps ensure that you handle `null` and `undefined` values where applicable. To support this, you must compile your project with "strictNullChecks" so that the compiler will treat `null` and `undefined` as distinct types. This is not optional: code using `ts-string-visitor` will fail to compile at all if "strictNullChecks" are not enabled.


## Quick Start
### Installation
Install via NPM:
```
npm install -s ts-string-visitor
```

### Import `visitString`
Import the `visitString` method. It is available as both a named export, and the default export, so you can import it either way:
```ts
import visitString from "ts-string-visitor";
```
or
```ts
import { visitString } from "ts-string-visitor";
```

### Usage Example
```ts
// Example string literal union type
type RGB = "r" | "g" | "b";

// Example function that uses visitString() to convert a RGB value
// to a display label
function getRgbLabel(rgb: RGB): string {
    // Pass the value to visitString(), and provide a visitor implementation
    // to visitString().with()
    return visitString(rgb).with({
        // The visitor must have a function property for every possible
        // value of the string literal union type. TypeScript compilation
        // will fail if you miss any values, or if you include extras that
        // don't exist in the type.
        "r": () => {
            return "Red";
        },
        "g": () => {
            // This function is called when "g" is passed in as the value
            // for 'rgb'.
            // The return value of this function is returned by
            // visitString().with().
            return "Green";
        },
        "b": () => {
            return "Blue";
        }
    });
}

const result = getRgbLabel("g"); // result === "Green"
```

## Handling Null/Undefined
The `visitString` method is overloaded to handle every combination of its parameter being possibly `null` and/or `undefined`.

If (and only if) the parameter may be `null`, then your visitor MUST include a method named `handleNull`. This method will be called if a `null` value is passed to `visitString`.

If (and only if) the parameter may be `undefined`, then your visitor MUST include a method named `handleUndefined`. This method will be called if and `undefined` value is passed to `visitString`.

Example:
```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB | null): string {
    // The type of 'rgb' includes 'null', so the visitor must handle null
    return visitString(rgb).with({
        "r": () => {
            return "Red";
        },
        "g": () => {
            return "Green";
        },
        "b": () => {
            return "Blue";
        },
        handleNull: () => {
            return "null";
        }
    });
}

const result = getRgbLabel(null); // result === "null"
```

## Visitor Method Return Values
Your visitor methods can return a value, which will be returned by the call to `visit().with()`.

BEWARE: All visitor methods within a given visitor MUST have the same return type. If you have a mixture of return types, then the compiler will decide that one of them is correct, and the others are wrong. The resulting compiler error may be confusing if you and the compiler do not agree on what the correct return type should have been.

Keep reading to learn how to avoid this confusion...

## Being Explicit About Return Type
When designing a visitor to return a value, it is often helpful to explicitly provide the desired return type as a template parameter to the `with()` function:
```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB): string {
    // Tell the compiler that you intend to return a string from the
    // visitor
    return visitString(rgb).with<string>({
        "r": () => {
            // Now it is guaranteed that the compiler will complain about
            // this particular method returning number instead of string.
            // If you did not provide the <string> hint, then the compiler
            // may infer the return type of the visitor to be number
            // (based on this method) and confusingly complain that the
            // OTHER methods are wrong!
            return 10;
        },
        "g": () => {
            return "Green";
        },
        "b": () => {
            return "Blue";
        }
    });
}
```

## Visitor Method Parameters
The methods of the visitor implementation received a single parameter: the value being visited. The type of the parameter for each method is EXACTLY the type of the value handled by that method.
Here's a simple (albeit pointless) identity visitor implementation to demonstrate:
```ts
type RGB = "r" | "g" | "b";

function rgbIdentity(rgb: RGB | null | undefined): RGB | null | undefined {
    return visitString(rgb).with({
        "r": (value) => {
            // type of 'value' is exactly "r" (not RGB | null | undefined)
            return value;
        },
        "g": (value) => {
            // type of 'value' is exactly "g"
            return value;
        },
        "b": (value) => {
            // type of 'value' is exactly "b"
            return value;
        },
        handleNull: (value) => {
            // type of 'value' is exactly null
            return value;
        },
        handleUndefined: (value) => {
            // type of 'value' is exactly undefined
            return value;
        }
    });
}

const result = rgbIdentity("g"); // result === "g"
```

## Sharing Visitor Methods Across Multiple Values
Sometimes you want to handle multiple values in the same way, but duplicating code is bad. Here's some examples of how you can share code across multiple values in a visitor.

### Without Using Visitor Method Parameters
If your shared code does not need to reference the value being visited, then it is very simple to share visitor methods across multiple values:
```ts
type RGB = "r" | "g" | "b";

// test if a color value is "supported"
function isSupportedColor(rgb: RGB | null | undefined): boolean {
    // pre-define a handler for all "supported" values
    const handleSupported = (): boolean => {
        return true;
    };

    // pre-defined a handler for all "unsupported" values
    const handleUnsupported = (): boolean => {
        return false;
    };

    return visitString(rgb).with<boolean>({
        "r": handleSupported,
        // Green is ugly - UNSUPPORTED!
        "g": handleUnsupported,
        "b": handleSupported,
        handleNull: handleUnsupported,
        handleUndefined: handleUnsupported
    });
}
```

### Using Visitor Method Parameters
If your shared code needs to reference the value being visited, then you have to be conscious of the parameter types involved. The type of the parameter of the shared method must include the types of all values it will handle. Let's enhance the previous example to log every value that is visited.
```ts
type RGB = "r" | "g" | "b";

// test if a color value is "supported"
function isSupportedColor(rgb: RGB | null | undefined): boolean {
    // Since this handler is not used for null/undefined, there's no need
    // to include those types for the param.
    // The type technically only needs to be ("r" | "b"), but type RGB is
    // more convenient and there's no harm in being overly permissive in
    // this case.
    const handleSupported = (value: RGB): boolean => {
        // Since the type 'value' does not include null/undefined, we can
        // safely call value.toupperCase() without performing a null check
        // first.
        // This is an example of why being restrictive with the type of
        // shared handler can be beneficial.
        console.log(`handling supported value: ${value.toUpperCase()}`);
        return true;
    };

    // This handler is used to handle null/undefined, so it MUST include
    // those types for the param.
    // Again, the type only technically needs to be
    // ("g" | null | undefined), but being more permissive can be more
    // convenient when it's not harmful.
    const handleUnsupported = (value: RGB | null | undefined): boolean => {
        console.warn(`unsupported color encountered: ${value}`);
        return false;
    };

    return visitString(rgb).with<boolean>({
        "r": handleSupported,
        // Green is ugly - UNSUPPORTED!
        "g": handleUnsupported,
        "b": handleSupported,
        handleNull: handleUnsupported,
        handleUndefined: handleUnsupported
    });
}
```

## Visiting Enums
TypeScript string enums can also be visited with `ts-string-visitor`. The important detail to understand is that the *values* (not the identifiers/names) of the enums are used as the string visitor method names.
```ts
enum RGB {
    // "R" is the name of the identifier.
    // "r" is the value.
    R = "r",
    G = "g",
    B = "b"
}

function getRgbLabel(rgb: RGB): string {
    return visitString(rgb).with<string>({
        // This works
        "r": () => {
            return "Red";
        },
        // This also works (I prefer this style)
        [RGB.G]: () => {
            return "Green";
        },
        // This does NOT work!
        "B": () => {
            return "Blue";
        }
    });
}
```

## Enum Visitor Method Parameter Types
Be aware that the type of a string enum value is a more specific type than a string literal type. For maximum compile-time type checking benefit, you should treat enums as enum types whenever possible, rather than string literals:
* Compare against members of the enum, rather than string literals.
* Use the enum type for variables, params, return types, etc., rather than type string.

## Enum Limitations
### Only Literal String "Union Enums" Supported
`ts-string-visitor` can only work on string enums that qualify as "union enums":
* All members are of type string (no number values!).
* All members have literal (non-calculated) values.

Read more about "Union enums and enum member types" here: [Enums - TypeScript](https://www.typescriptlang.org/docs/handbook/enums.html)

### Visitor Method Parameter Type Not Inferred
Unfortunately, the TypeScript compiler cannot infer the type of the visitor method parameter if you use the enum value as the property name.

I have reported this issue on the [github TypeScript repo](https://github.com/Microsoft/TypeScript/issues/20856).
(UPDATE: This issue is already fixed in the nightly build of TypeScript and should be included in in some future release)

There are two work-arounds to this:
1. Explicity declare the type of the parameter.
1. Use a string literal for the property name.

Example:
```ts
enum RGB {
    R = "r",
    G = "g",
    B = "b"
}

function rgbIdentity(rgb: RGB): RGB {
    return visitString(rgb).with<RGB>({
        // ERROR: type of `value` not inferred properly!
        // Type is implicitly 'any'
        [RGB.R]: (value) => {
            return value;
        },
        // Work-around option #1
        [RGB.G]: (value: RGB.G) => {
            return value;
        },
        // Work-around option #2
        "b": (value) => {
            return value;
        }
    });
}
```

## What's up with this chained `visitString().with()` syntax?
You might wonder why I didn't implement `ts-string-visitor` as a single overloaded `visitString` method that accepts both the value AND the visitor. The chained approach I settled on was necessary to:
* Ensure that the type of visitor (whether it needs to handle null and/or undefined) is driven by whether the visited value may possibly be null/undefined. This is necessary to provide relevant compiler error messages when something isn't right with your code.
* Allow the return type to be explicitly provided, while allowing the compiler to infer the type of the visited value.

Read more details about other approaches I tried and their flaws in [this github issue comment](https://github.com/Microsoft/TypeScript/issues/20643#issuecomment-352328395).