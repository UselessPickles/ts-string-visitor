/**
 * A visitor interface for visiting the value of a string literal type or a string enum type.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 */
export declare type StringVisitor<S extends string, R> = {
    [P in S]: (value: P) => R;
};
/**
 * A visitor interface for visiting a null value.
 * This is never used by itself, but combined with {@link StringVisitor} as needed.
 *
 * @template R - The return type of the visitor method.
 */
export interface NullStringVisitor<R> {
    /**
     * Called when a visited string's value is null.
     * @param value - null
     * @return Whatever you want.
     */
    handleNull: (value: null) => R;
}
/**
 * A visitor interface for visiting an undefined value.
 * This is never used by itself, but combined with {@link StringVisitor} as needed.
 *
 * @template R - The return type of the visitor method.
 */
export interface UndefinedStringVisitor<R> {
    /**
     * Called when a visited string's value is undefined.
     * @param value - undefined
     * @return Whatever you want.
     */
    handleUndefined: (value: undefined) => R;
}
/**
 * Combines {@link StringVisitor} with {@link NullStringVisitor} for visiting a string literal/enum
 * that may be null.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 */
export declare type StringVisitorWithNull<S extends string, R> = StringVisitor<S, R> & NullStringVisitor<R>;
/**
 * Combines {@link StringVisitor} with {@link UndefinedStringVisitor} for visiting a string literal/enum
 * that may be undefined.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 */
export declare type StringVisitorWithUndefined<S extends string, R> = StringVisitor<S, R> & UndefinedStringVisitor<R>;
/**
 * Combines {@link StringVisitor} with {@link NullStringVisitor} and {@link UndefinedStringVisitor}
 * for visiting a string literal/enum that may be null or undefined.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 */
export declare type StringVisitorWithNullAndUndefined<S extends string, R> = StringVisitor<S, R> & NullStringVisitor<R> & UndefinedStringVisitor<R>;
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
    with<R>(visitor: StringVisitor<S, R>): R;
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
    with<R>(visitor: StringVisitorWithNull<S, R>): R;
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
    with<R>(visitor: StringVisitorWithUndefined<S, R>): R;
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
export declare class StringVisiteeWithNullAndUndefined<S extends string> {
    private readonly value;
    /**
     * Do not use this constructor directly. Use the {@link visitString} function to get an instance of this class.
     * @param value - The value to be wrapped by this "visitee".
     */
    constructor(value: S | null | undefined);
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
    with<R>(visitor: StringVisitorWithNullAndUndefined<S, R>): R;
}
/**
 * The first step to using the visitor pattern on the value of a string literal type or string enum.
 * This method creates a "visitee" wrapper object, whose "with()" method must be called with a visitor
 * implementation.
 *
 * Example: visitString(aStringEnumValue).with({ ... }).
 *
 * See also, {@link StringVisitee#with} and {@link StringVisitor}.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export declare function visitString<S extends string>(value: S): StringVisitee<S>;
/**
 * The first step to using the visitor pattern on the value of a string literal type or string enum.
 * This method creates a "visitee" wrapper object, whose "with()" method must be called with a visitor
 * implementation.
 *
 * Example: visitString(aStringEnumValue).with({ ... }).
 *
 * See also, {@link StringVisiteeWithNull#with} and {@link StringVisitorWithNull}.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export declare function visitString<S extends string>(value: S | null): StringVisiteeWithNull<S>;
/**
 * The first step to using the visitor pattern on the value of a string literal type or string enum.
 * This method creates a "visitee" wrapper object, whose "with()" method must be called with a visitor
 * implementation.
 *
 * Example: visitString(aStringEnumValue).with({ ... }).
 *
 * See also, {@link StringVisiteeWithUndefined#with} and {@link StringVisitorWithUndefined}.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export declare function visitString<S extends string>(value: S | undefined): StringVisiteeWithUndefined<S>;
/**
 * The first step to using the visitor pattern on the value of a string literal type or string enum.
 * This method creates a "visitee" wrapper object, whose "with()" method must be called with a visitor
 * implementation.
 *
 * Example: visitString(aStringEnumValue).with({ ... }).
 * See also, {@link StringVisiteeWithNullAndUndefined#with} and {@link StringVisitorWithNullAndUndefined}.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export declare function visitString<S extends string>(value: S | null | undefined): StringVisiteeWithNullAndUndefined<S>;
export default visitString;
