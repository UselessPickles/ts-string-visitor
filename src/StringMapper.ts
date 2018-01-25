/**
 * Interface for an object that maps a string literal or string enumvalue to a value of type T.
 *
 * @template S - A string literal type or string enum type.
 * @template T - The type of the value that the string literal or string enum is mapped to.
 */
export type StringMapper<S extends string, T> = {
    [P in S]: T;
};

/**
 * Interface for an object that maps a null value to a value of type T.
 * This is never used by itself, but combined with {@link StringMapper} as needed.
 *
 * @template T - The type of the value that the string literal or string enum is mapped to.
 */
export interface NullStringMapper<T> {
    handleNull: T;
}

/**
 * Interface for an object that maps an undefined value to a value of type T.
 * This is never used by itself, but combined with {@link StringMapper} as needed.
 *
 * @template T - The type of the value that the string literal or string enum is mapped to.
 */
export interface UndefinedStringMapper<T> {
    handleUndefined: T;
}

/**
 * Combines {@link StringMapper} with {@link NullStringMapper} for mapping a string literal/enum
 * that may be null.
 *
 * @template S - A string literal type or string enum type.
 * @template T - The type of the value that the string literal or string enum is mapped to.
 */
export type StringMapperWithNull<S extends string, T> =
    & StringMapper<S, T>
    & NullStringMapper<T>;

/**
 * Combines {@link StringMapper} with {@link UndefinedStringMapper} for mapping a string literal/enum
 * that may be undefined.
 *
 * @template S - A string literal type or string enum type.
 * @template T - The type of the value that the string literal or string enum is mapped to.
 */
export type StringMapperWithUndefined<S extends string, T> =
    & StringMapper<S, T>
    & UndefinedStringMapper<T>;

/**
 * Combines {@link StringMapper} with {@link NullStringMapper} and {@link UndefinedStringMapper}
 * for mapping a string literal/enum that may be null or undefined.
 *
 * @template S - A string literal type or string enum type.
 * @template T - The type of the value that the string literal or string enum is mapped to.
 */
export type StringMapperWithNullAndUndefined<S extends string, T> =
    & StringMapper<S, T>
    & NullStringMapper<T>
    & UndefinedStringMapper<T>;
