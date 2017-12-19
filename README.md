# ts-string-visitor
Generic TypeScript Visitor for String Enums and String Literal Union Types

## What is it?

`ts-string-visitor` implements a visitor pattern for TypeScript string enum types, and typescript stringliteral union types. This helps you avoid bugs caused by forgetting to handle a possible value, and helps you quickly find code that needs to be updated after refactoring a string enum or string literal union type.

## Quick Example
Before getting into details, here's a quick example of how it looks to use `ts-string-visitor`.

For demonstration purposes, let's define a string literal union type:
```ts
type RGB = "r" | "g" | "b";
```

And a simple function that converts an enum value into a user-friendly display label:
```ts
function getRgbLabel(rgb: RGB): string {
    return visitString(rgb).with({
        "r": () => {
            return "Red";
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

The pass a string enum type, or string literal union type, to the `visitString()` method. Call `with()` on the result, passing in a visitor implementation.

The visitor must implement a method for each possible string value of the type that was passed in to `visitString()`. The code will fail to compile if you have any missing or extra properties in your visitor implementation.

## Requirements
* **TypeScript**: The main benefit of `ts-string-visitor` is the compile-time checks. It won't do you any good in
a JavaScript project.
* **TypeScript's "strictNullChecks" option**: `ts-string-visitor` helps ensure that you handle `null` and `undefined` values where applicable. To support this, you must compile your project with "strictNullChecks" so that the compiler will treat `null` and `undefined` as distinct types. This is not optional: code using `ts-string-visitor` will fail to compile at all if "strictNullChecks" are not enabled.

