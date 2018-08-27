[![npm version](https://img.shields.io/npm/v/ts-string-visitor.svg)](https://www.npmjs.com/package/ts-string-visitor)
[![Join the chat at https://gitter.im/ts-string-visitor/Lobby](https://badges.gitter.im/ts-string-visitor/Lobby.svg)](https://gitter.im/ts-string-visitor/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/UselessPickles/ts-string-visitor.svg?branch=master)](https://travis-ci.org/UselessPickles/ts-string-visitor)
[![Coverage Status](https://coveralls.io/repos/github/UselessPickles/ts-string-visitor/badge.svg?branch=master)](https://coveralls.io/github/UselessPickles/ts-string-visitor?branch=master)

# ts-string-visitor

Generic TypeScript Visitor and Mapper for String Enums and String Literal Union Types

# Contents

<!-- TOC depthFrom:2 -->

-   [What is it?](#what-is-it)
-   [Other TypeScript Enum Projects](#other-typescript-enum-projects)
-   [Quick Start](#quick-start)
    -   [Installation](#installation)
    -   [Usage Example](#usage-example)
        -   [Visitor](#visitor)
        -   [Mapper](#mapper)
-   [Requirements](#requirements)
-   [General Usage and Terminology](#general-usage-and-terminology)
    -   [Visitor](#visitor-1)
    -   [Mapper](#mapper-1)
-   [Handling Null/Undefined](#handling-nullundefined)
-   [Handling Unexpected Values at Run Time](#handling-unexpected-values-at-run-time)
-   [Choosing to Not Handle Certain Values](#choosing-to-not-handle-certain-values)
-   [Visitor Method Return Values](#visitor-method-return-values)
-   [Being Explicit About Visitor/Mapper Result Type](#being-explicit-about-visitormapper-result-type)
-   [Visitor Method Parameters](#visitor-method-parameters)
-   [Sharing Visitor Methods Across Multiple Values](#sharing-visitor-methods-across-multiple-values)
    -   [Without Using Visitor Method Parameters](#without-using-visitor-method-parameters)
    -   [Using Visitor Method Parameters](#using-visitor-method-parameters)
-   [Visiting/Mapping String Enums](#visitingmapping-string-enums)
    -   [Visits/Maps Enum _Values_ - Not Names](#visitsmaps-enum-_values_---not-names)
    -   [Enum Visitor Method Parameter Types](#enum-visitor-method-parameter-types)
    -   [Only Literal String "Union Enums" Are Supported](#only-literal-string-union-enums-are-supported)
-   [What's up with this chained `visitString().with()` syntax?](#whats-up-with-this-chained-visitstringwith-syntax)

<!-- /TOC -->

## What is it?

`ts-string-visitor` implements a visitor pattern for TypeScript string enum types, and TypeScript string literal union types. This helps you avoid bugs caused by forgetting to handle a possible value, and helps you quickly find code that needs to be updated after refactoring a string enum or string literal union type. If your code uses `ts-string-visitor` and does not handle all possible values, the code will fail to compile. The compiler error messages will point you in the right direction to fix your code.

In addition to the very flexible visitor pattern, a much simpler "mapper" is also available for when you just need to directly map string literal or string enum values to some other value without any logic. All the same compiler checks apply to guarantee that you handle all possibilities.

## Other TypeScript Enum Projects

-   `ts-enum-util` [[github](https://github.com/UselessPickles/ts-enum-util), [npm](https://www.npmjs.com/package/ts-enum-util)] - Strictly typed utilities for working with TypeScript enums.

## Quick Start

### Installation

Install via [NPM](https://www.npmjs.com/package/ts-string-visitor):

```
npm i -s ts-string-visitor
```

### Usage Example

#### Visitor

Example of the generalized visitor.

```ts
import { visitString } from "ts-string-visitor";

type RGB = "r" | "g" | "b";

// Example function that uses visitString() to convert a RGB value
// to a display label
function getRgbLabel(rgb: RGB): string {
    // Pass the value to visitString(), and provide a visitor
    // implementation to visitString().with()
    return visitString(rgb).with({
        // The visitor must have a function property for every
        // possible value of the string literal union type.
        // TypeScript compilation will fail if you miss any values,
        // or if you include extras that don't exist in the type.
        r: () => {
            return "Red";
        },
        g: () => {
            // This function is called when "g" is passed in as the
            // value for 'rgb'. The return value of this function is
            // returned by visitString().with().
            return "Green";
        },
        b: () => {
            return "Blue";
        }
    });
}

const result = getRgbLabel("g"); // result === "Green"
```

#### Mapper

Example of the simpler Mapper, for when you just need to map string literal or string enum values to some other value without any logic.

```ts
import { mapString } from "ts-string-visitor";

type RGB = "r" | "g" | "b";

// Example function that uses mapString() to convert a RGB value
// to a display label
function getRgbLabel(rgb: RGB): string {
    // Pass the value to mapString(), and provide a mapper
    // implementation to mapString().with()
    return mapString(rgb).with({
        // The mapper must have a property for every
        // possible value of the string literal union type.
        // TypeScript compilation will fail if you miss any values,
        // or if you include extras that don't exist in the type.
        r: "Red",
        // This propery's value is looked up and returned when
        // "g" is passed in as the value for 'rgb'.
        g: "Green",
        b: "Blue"
    });
}

const result = getRgbLabel("g"); // result === "Green"
```

## Requirements

-   **TypeScript 2.7.1+**: The entire purpose of `ts-string-visitor` is the compile-time checks. It won't do you any good in a JavaScript project. TypeScript 2.7.1 is the minimum supported version, due to a dependency on `unique symbol` types. If you are stuck with an older version of TypeScript, then look at major version 2 of `ts-enum-util`, which supports TypeScript versions 2.4.1+
-   **TypeScript's "strictNullChecks" option**: `ts-string-visitor` helps ensure that you handle `null` and `undefined` values where applicable. To support this, you must compile your project with "strictNullChecks" so that the compiler will treat `null` and `undefined` as distinct types. This is not optional: code using `ts-string-visitor` will fail to compile at all if "strictNullChecks" are not enabled.
-   **ES6 Symbol**: Be sure to include a `Symbol` polyfill if you plan to target environments/browsers that do not natively support it.

## General Usage and Terminology

This section explains in general how to use `ts-string-visitor`, and defines some terminology that is used throughout this README.

### Visitor

A visitor is used to execute a function based on the value of a string literal union or string enum type.

The `visitString` method is used to "visit" a string literal or string enum value as follows:

`[result] = visitString([value]).with([visitor])`

Where:

-   `[value]` is a value whose type is either a string literal union or a string enum.
-   `[visitor]` is an object whose property names match all possible values of `[value]`'s type, and the property values are functions that will be called when the corresponding property name value is passed to `visitString`.
-   `[result]` is the value returned by whichever visitor function is called. NOTE: Visitors are not required to return a value. You may choose to implement a visitor that only performs logic for each possible string literal/enum value.

Note: Every visitor method must have the same return type. You may want to consider [Being Explicit About Visitor/Mapper Result Type](#being-explicit-about-visitormapper-result-type).

See the [Visitor](#visitor) usage example.

### Mapper

A mapper is used to simply convert the value of a string literal union or string enum type into some other value. This is less powerful than a visitor, but also simpler with less boilerplate code.

The `mapString` method is used to "map" a string literal or string enum value as follows:

`[result] = mapString([value]).with([mapper])`

Where:

-   `[value]` is a value whose type is either a string literal union or a string enum.
-   `[mapper]` is an object whose property names match all possible values of `[value]`'s type, and the property values are the mapped values that will be returned when the corresponding property name value is passed to `mapString`.
-   `[result]` is the value of whichever `[mapper]` property matched `[value]`.

Note: Every property of your mapper must be of the same type. You may want to consider [Being Explicit About Visitor/Mapper Result Type](#being-explicit-about-visitormapper-result-type).

See the [Mapper](#mapper) usage example.

## Handling Null/Undefined

The `visitString` and `mapString` methods are overloaded to handle every combination of its parameter being possibly `null` and/or `undefined`.

If (and only if) the parameter may be `null`, then your visitor/mapper MUST include a property named `handleNull`. The value of this property will be used to visit/map `null` values.

If (and only if) the parameter may be `undefined`, then your visitor/mapper MUST include a method named `handleUndefined`. The value of this property will be used to visit/map `undefined` values.

Example (Visitor):

```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB | null): string {
    // The type of 'rgb' includes 'null', so the visitor must
    // handle null
    return visitString(rgb).with({
        r: () => {
            return "Red";
        },
        g: () => {
            return "Green";
        },
        b: () => {
            return "Blue";
        },
        handleNull: () => {
            return "null";
        }
    });
}

const result = getRgbLabel(null); // result === "null"
```

Example (Mapper):

```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB | null): string {
    // The type of 'rgb' includes 'null', so the mapper must
    // handle null
    return mapString(rgb).with({
        r: "Red",
        g: "Green",
        b: "Blue",
        handleNull: "null"
    });
}

const result = getRgbLabel(null); // result === "null"
```

## Handling Unexpected Values at Run Time

When processing data from an external source at run time (e.g., data from an API), there's no guarantee that it will be constrained to the expected types/values in your TypeScript code. Both `visitString` and `mapString` will detect unexpected values at run time. The default behavior is to throw an error when an unexpected value is encountered at run time. The encountered value is included in the error message for convenience.

If you would like to override the default behavior, then you may provide the optional `handleUnexpected` property in your visitor or mapper implementation.

The parameter of the `handleUnexpected` method in a visitor is of type `string`, possibly unioned with type `null` and/or `undefined`, depending on whether `null`/`undefined` are unexpected values for the particular usage of `visitString`.

See also: [Visitor Method Parameters](#visitor-method-parameters) and [Handling Null/Undefined](#handling-nullundefined).

Example (Visitor):

```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB): string {
    return visitString(rgb).with({
        r: () => {
            return "Red";
        },
        g: () => {
            return "Green";
        },
        b: () => {
            return "Blue";
        },
        handleUnexpected: () => {
            return "Unexpected!";
        }
    });
}

// Type casting to force an unexpected value at run time
const result = getRgbLabel(("blah" as any) as RGB); // result === "Unexpected"
```

Example (Mapper):

```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB): string {
    return mapString(rgb).with({
        r: "Red",
        g: "Green",
        b: "Blue",
        handleUnexpected: "Unexpected!"
    });
}

// Type casting to force an unexpected value at run time
const result = getRgbLabel(("blah" as any) as RGB); // result === "Unexpected!"
```

## Choosing to Not Handle Certain Values

Sometimes you need to write code that is intentionally designed to only expect/handle a subset of possibilites, and you really just want to throw an error if one of the unsupported values is encountered. Simply provide `visitString.unhandled` or `mapString.unhandled` as the entry for an unhandled value in a visitor/mapper implementation, and an error will be thrown if that value is encountered at runtime.

Example (Visitor):

```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB): string {
    return visitString(rgb).with({
        r: () => {
            return "Red";
        },
        g: visitString.unhandled,
        b: () => {
            return "Blue";
        }
    });
}

// Throws error: "Unhandled value: g"
const result = getRgbLabel("g");
```

Example (Mapper):

```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB): string {
    return mapString(rgb).with({
        r: "Red",
        g: mapString.unhandled,
        b: "Blue"
    });
}

// Throws error: "Unhandled value: g"
const result = getRgbLabel("g");
```

## Visitor Method Return Values

Your visitor methods can return a value, which will be returned by the call to `visitString().with()`.

BEWARE: All visitor methods within a given visitor MUST have the same return type. If you have a mixture of return types, then the compiler will decide that one of them is correct, and the others are wrong. The resulting compiler error may be confusing if you and the compiler do not agree on what the correct return type should have been.

Keep reading to learn how to avoid this confusion...

## Being Explicit About Visitor/Mapper Result Type

When designing a visitor/mapper to return a value, it is often helpful to explicitly provide the desired return type as a template parameter to the `with()` function.

Example (Visitor):

```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB): string {
    // Tell the compiler that you intend to return a string from the
    // visitor
    return visitString(rgb).with<string>({
        // Compiler error for this property
        r: () => {
            return 10;
        },
        g: () => {
            return "Green";
        },
        b: () => {
            return "Blue";
        }
    });
}
```

Example (Mapper):

```ts
type RGB = "r" | "g" | "b";

function getRgbLabel(rgb: RGB): string {
    // Tell the compiler that you intend to return a string from the
    // mapper
    return mapString(rgb).with<string>({
        // Compiler error for this property
        r: 10,
        g: "Green",
        b: "Blue"
    });
}
```

In the above examples, it is guaranteed that the compiler will complain about the `"r"` property being/returning type `number` instead of `string`. If you did not provide the <string> hint then the compiler may infer the return type of the visitor/mapper to be `number` and confusingly complain that the OTHER properties are wrong!

## Visitor Method Parameters

The methods of the visitor implementation receive a single parameter: the value being visited. The type of the parameter for each method is EXACTLY the type of the value handled by that method.
Here's a simple (albeit pointless) identity visitor implementation to demonstrate:

```ts
type RGB = "r" | "g" | "b";

function rgbIdentity(rgb: RGB | null | undefined): RGB | null | undefined {
    return visitString(rgb).with({
        r: (value) => {
            // type of 'value' is exactly "r"
            // (not RGB | null | undefined)
            return value;
        },
        g: (value) => {
            // type of 'value' is exactly "g"
            return value;
        },
        b: (value) => {
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
        r: handleSupported,
        // Green is ugly - UNSUPPORTED!
        g: handleUnsupported,
        b: handleSupported,
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
    // Since this handler is not used for null/undefined, there's no
    // need to include those types for the param.
    // The type technically only needs to be ("r" | "b"), but type
    // RGB is more convenient and there's no harm in being overly
    // permissive in this case.
    const handleSupported = (value: RGB): boolean => {
        // Since the type 'value' does not include null/undefined, we
        // can safely call value.toupperCase() without performing a
        // null check first.
        // This is an example of why being restrictive with the type
        // of shared handler can be beneficial.
        console.log(`handling supported value: ${value.toUpperCase()}`);
        return true;
    };

    // This handler is used to handle null/undefined, so it MUST
    // include those types for the param.
    // Again, the type only technically needs to be
    // ("g" | null | undefined), but being more permissive can be
    // more convenient when it's not harmful.
    const handleUnsupported = (value: RGB | null | undefined): boolean => {
        console.warn(`unsupported color encountered: ${value}`);
        return false;
    };

    return visitString(rgb).with<boolean>({
        r: handleSupported,
        // Green is ugly - UNSUPPORTED!
        g: handleUnsupported,
        b: handleSupported,
        handleNull: handleUnsupported,
        handleUndefined: handleUnsupported
    });
}
```

## Visiting/Mapping String Enums

### Visits/Maps Enum _Values_ - Not Names

TypeScript string enums can also be visited/mapped with `ts-string-visitor`. The important detail to understand is that the _values_ (not the identifiers/names) of the enums are used as the visitor/mapper property names.

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
        // This works (my preferred style)
        [RGB.R]: () => {
            return "Red";
        },
        // This also works
        g: () => {
            return "Green";
        },
        // This does NOT work!
        B: () => {
            return "Blue";
        }
    });
}
```

NOTE: My preferred style of using the enum value as a computed property name (`[RGB.R]`) has limited support in some versions of TypeScript. See [Known Issues](#known-issues).

### Enum Visitor Method Parameter Types

Be aware that the type of a string enum value is a more specific type than a string literal type. For maximum compile-time type checking benefit, you should treat enums as enum types whenever possible, rather than string literals:

-   Compare against members of the enum, rather than string literals.
-   Use the enum type for variables, params, return types, etc., rather than type string.

### Only Literal String "Union Enums" Are Supported

`ts-string-visitor` can only work on string enums that qualify as "union enums":

-   All members are of type string (no number values!).
-   All members have literal (non-calculated) values.

Read more about "Union enums and enum member types" here: [Enums - TypeScript](https://www.typescriptlang.org/docs/handbook/enums.html)

## What's up with this chained `visitString().with()` syntax?

You might wonder why I didn't implement `ts-string-visitor` as a single overloaded `visitString` method that accepts both the value AND the visitor. The chained approach I settled on was necessary to:

-   Ensure that the type of visitor (whether it needs to handle null and/or undefined) is driven by whether the visited value may possibly be null/undefined. This is necessary to provide relevant compiler error messages when something isn't right with your code.
-   Allow the return type to be explicitly provided, while allowing the compiler to infer the type of the visited value.

Read more details about other approaches I tried and their flaws in [this github issue comment](https://github.com/Microsoft/TypeScript/issues/20643#issuecomment-352328395).
