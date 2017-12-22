import {
    StringVisitor,
    StringVisitorWithNull,
    StringVisitorWithUndefined,
     StringVisitorWithNullAndUndefined
} from "./StringVisitor";

/**
 * A wrapper around a string literal or string enum value to be visited.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * NOTE: No runtime implementation of this class actually exists. This is only used for compile-time
 *       typing. {@link StringVisiteeWithNullAndUndefined} contains the implementation that is
 *       applicable to all "StringVisitee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export declare class StringVisitee<S extends string> {
    /**
     * Visits the wrapped value using the supplied visitor.
     * Calls the visitor method whose name matches the wrapped value.
     *
     * @template R - The return type of the visitor methods.
     *
     * @param visitor - A visitor implementation for type S that returns type R.
     * @returns The return value of the visitor method that is called.
     */
    public with<R>(visitor: StringVisitor<S, R>): R;
}

/**
 * A wrapper around a string literal or string enum value to be visited.
 * For values that may be null.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * NOTE: No runtime implementation of this class actually exists. This is only used for compile-time
 *       typing. {@link StringVisiteeWithNullAndUndefined} contains the implementation that is
 *       applicable to all "StringVisitee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export declare class StringVisiteeWithNull<S extends string> {
    /**
     * Visits the wrapped value using the supplied visitor.
     * If the wrapped value is null, calls the visitor's {@link StringNullVisitor#handleNull} method.
     * Otherwise, calls the visitor method whose name matches the wrapped value.
     *
     * @template R - The return type of the visitor methods.
     *
     * @param visitor - A visitor implementation for type S that returns type R.
     * @returns The return value of the visitor method that is called.
     */
    public with<R>(visitor: StringVisitorWithNull<S, R>): R;
}

/**
 * A wrapper around a string literal or string enum value to be visited.
 * For values that may be undefined.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * NOTE: No runtime implementation of this class actually exists. This is only used for compile-time
 *       typing. {@link StringVisiteeWithNullAndUndefined} contains the implementation that is
 *       applicable to all "StringVisitee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export declare class StringVisiteeWithUndefined<S extends string> {
    /**
     * Visits the wrapped value using the supplied visitor.
     * If the wrapped value is undefined, calls the visitor's {@link StringNullVisitor#handleUndefined} method.
     * Otherwise, calls the visitor method whose name matches the wrapped value.
     *
     * @template R - The return type of the visitor methods.
     *
     * @param visitor - A visitor implementation for type S that returns type R.
     * @returns The return value of the visitor method that is called.
     */
    public with<R>(visitor: StringVisitorWithUndefined<S, R>): R;
}

/**
 * A wrapper around a string literal or string enum value to be visited.
 * For values that may be null and undefined.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * NOTE: This class provides the run-time implementation for ALL "StringVisitee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export class StringVisiteeWithNullAndUndefined<S extends string> {
    /**
     * Do not use this constructor directly. Use the {@link visitString} function to get an instance of this class.
     * @param value - The value to be wrapped by this "visitee".
     */
    public constructor(private readonly value: S | null | undefined) { }

    /**
     * Visits the wrapped value using the supplied visitor.
     * If the wrapped value is null, calls the visitor's {@link StringNullVisitor#handleNull} method.
     * If the wrapped value is undefined, calls the visitor's {@link StringNullVisitor#handleUndefined} method.
     * Otherwise, calls the visitor method whose name matches the wrapped value.
     *
     * @template R - The return type of the visitor methods.
     *
     * @param visitor - A visitor implementation for type S that returns type R.
     * @returns The return value of the visitor method that is called.
     */
    public with<R>(visitor: StringVisitorWithNullAndUndefined<S, R>): R {
        if (this.value === null) {
            return visitor.handleNull(this.value);
        } else if (this.value === undefined) {
            return visitor.handleUndefined(this.value);
        } else {
            return (visitor as StringVisitor<S, R>)[this.value](this.value);
        }
    }
}
