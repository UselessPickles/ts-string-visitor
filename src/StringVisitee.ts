import {
    StringVisitorCore,
    StringVisitor,
    StringVisitorWithNull,
    StringVisitorWithUndefined,
    StringVisitorWithNullAndUndefined
} from "./StringVisitor";

/**
 * A wrapper around a string literal or string enum value to be visited.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * @template S - A string literal type or string enum type.
 */
export class StringVisitee<S extends string> {
    /**
     * Do not use this constructor directly. Use the {@link visitString} function to get an instance of this class.
     * @param value - The value to be wrapped by this "visitee".
     */
    public constructor(private readonly value: S) {}

    /**
     * Visits the wrapped value using the supplied visitor.
     * Calls the visitor method whose name matches the wrapped value.
     *
     * @template R - The return type of the visitor methods.
     *
     * @param visitor - A visitor implementation for type S that returns type R.
     * @returns The return value of the visitor method that is called.
     */
    public with<R>(visitor: StringVisitor<S, R>): R {
        if (visitor.hasOwnProperty(this.value)) {
            const handler = (visitor as StringVisitorCore<S, R>)[this.value];
            return handler(this.value);
        } else if (visitor.handleUnexpected) {
            return visitor.handleUnexpected(this.value);
        } else {
            throw new Error(`Unexpected value: ${this.value}`);
        }
    }
}

/**
 * A wrapper around a string literal or string enum value to be visited.
 * For values that may be null.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * NOTE: At run time, this class is used by {@link visitString} ONLY for handling null values.
 *       {@link StringVisitee} contains the core run time implementation that is applicable to all
 *       "StringVisitee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export class StringVisiteeWithNull<S extends string> {
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
    public with<R>(visitor: StringVisitorWithNull<S, R>): R {
        // This class is used at run time for visiting null values regardless of the compile time
        // type being visited, so we actually have to check if handleNull exists.
        if (visitor.handleNull) {
            return visitor.handleNull(null);
        } else if (visitor.handleUnexpected) {
            return visitor.handleUnexpected((null as any) as S);
        } else {
            throw new Error(`Unexpected value: null`);
        }
    }
}

/**
 * A wrapper around a string literal or string enum value to be visited.
 * For values that may be undefined.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * NOTE: At run time, this class is used by {@link visitString} ONLY for handling undefined values.
 *       {@link StringVisitee} contains the core run time implementation that is applicable to all
 *       "StringVisitee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export class StringVisiteeWithUndefined<S extends string> {
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
    public with<R>(visitor: StringVisitorWithUndefined<S, R>): R {
        // This class is used at run time for visiting undefined values regardless of the compile time
        // type being visited, so we actually have to check if handleUndefined exists.
        if (visitor.handleUndefined) {
            return visitor.handleUndefined(undefined);
        } else if (visitor.handleUnexpected) {
            return visitor.handleUnexpected((undefined as any) as S);
        } else {
            throw new Error(`Unexpected value: undefined`);
        }
    }
}

/**
 * A wrapper around a string literal or string enum value to be visited.
 * For values that may be null and undefined.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * NOTE: No run time implementation of this class actually exists. This is only used for compile-time
 *       typing. {@link StringVisitee} contains the core run time implementation that is applicable to all
 *       "StringVisitee" classes, while {@link StringVisiteeWithNull} and {@link StringVisiteeWithUndefined}
 *       are used at run time to handle null and undefined values.
 *
 * @template S - A string literal type or string enum type.
 */
export declare class StringVisiteeWithNullAndUndefined<S extends string> {
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
    public with<R>(visitor: StringVisitorWithNullAndUndefined<S, R>): R;
}
