/**
 * Generic method signature for a string visitor handler method.
 * @template S - The type of the parameter to the handler. Must be a string literal, null, or undefined.
 * @template R - The return type of the handler. Defaults to void.
 * @param value - The value being visited by the visitor.
 * @returns A result to be returned by the visitor,
 */
export type StringVisitorHandler<S extends string | null | undefined, R = void> = (value: S) => R;

/**
 * A visitor interface for visiting the value of a string literal type or a string enum type.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 */
export type StringVisitor<S extends string, R> = {
    [P in S]: StringVisitorHandler<P, R>;
};

/**
 * A visitor interface for visiting a null value.
 * This is never used by itself, but combined with {@link StringVisitor} as needed.
 *
 * @template R - The return type of the visitor method.
 */
export interface NullStringVisitor<R> {
    handleNull: StringVisitorHandler<null, R>;
}

/**
 * A visitor interface for visiting an undefined value.
 * This is never used by itself, but combined with {@link StringVisitor} as needed.
 *
 * @template R - The return type of the visitor method.
 */
export interface UndefinedStringVisitor<R> {
    handleUndefined: StringVisitorHandler<undefined, R>;
}

/**
 * Combines {@link StringVisitor} with {@link NullStringVisitor} for visiting a string literal/enum
 * that may be null.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 */
export type StringVisitorWithNull<S extends string, R> =
    & StringVisitor<S, R>
    & NullStringVisitor<R>;

/**
 * Combines {@link StringVisitor} with {@link UndefinedStringVisitor} for visiting a string literal/enum
 * that may be undefined.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 */
export type StringVisitorWithUndefined<S extends string, R> =
    & StringVisitor<S, R>
    & UndefinedStringVisitor<R>;

/**
 * Combines {@link StringVisitor} with {@link NullStringVisitor} and {@link UndefinedStringVisitor}
 * for visiting a string literal/enum that may be null or undefined.
 *
 * @template S - A string literal type or string enum type.
 * @template R - The return type of the visitor methods.
 */
export type StringVisitorWithNullAndUndefined<S extends string, R> =
    & StringVisitor<S, R>
    & NullStringVisitor<R>
    & UndefinedStringVisitor<R>;
