import {
    StringMapper,
    StringMapperWithNull,
    StringMapperWithUndefined,
    StringMapperWithNullAndUndefined
} from "./StringMapper";

/**
 * A wrapper around a string literal or string enum value to be mapped.
 * Do not use this class directly. Use the {@link mapString} function to get an instance of this class.
 *
 * NOTE: No runtime implementation of this class actually exists. This is only used for compile-time
 *       typing. {@link StringMappeeWithNullAndUndefined} contains the implementation that is
 *       applicable to all "StringMappee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export declare class StringMappee<S extends string> {
    /**
     * Maps the wrapped value using the supplied mapper.
     * Returns the value of the mapper's property whose name matches the wrapped value.
     *
     * @template T - The data type that the string literal or enum value will be mapped to.
     *
     * @param mapper - A mapper implementation for type S that returns type T.
     * @returns The mapped value from the mapper.
     */
    public with<R>(mapper: StringMapper<S, R>): R;
}

/**
 * A wrapper around a string literal or string enum value to be mapped.
 * For values that may be null.
 * Do not use this class directly. Use the {@link mapString} function to get an instance of this class.
 *
 * NOTE: No runtime implementation of this class actually exists. This is only used for compile-time
 *       typing. {@link StringMappeeWithNullAndUndefined} contains the implementation that is
 *       applicable to all "StringMappee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export declare class StringMappeeWithNull<S extends string> {
    /**
     * Maps the wrapped value using the supplied mapper.
     * If the wrapped value is null, returns the mapper's {@link StringNullmapper#handleNull} value.
     * Otherwise, returns the value of the mapper's property whose name matches the wrapped value.
     *
     * @template T - The data type that the string literal or enum value will be mapped to.
     *
     * @param mapper - A mapper implementation for type S that returns type T.
     * @returns The mapped value from the mapper.
     */
    public with<R>(mapper: StringMapperWithNull<S, R>): R;
}

/**
 * A wrapper around a string literal or string enum value to be mapped.
 * For values that may be undefined.
 * Do not use this class directly. Use the {@link mapString} function to get an instance of this class.
 *
 * NOTE: No runtime implementation of this class actually exists. This is only used for compile-time
 *       typing. {@link StringMappeeWithNullAndUndefined} contains the implementation that is
 *       applicable to all "StringMappee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export declare class StringMappeeWithUndefined<S extends string> {
    /**
     * Maps the wrapped value using the supplied mapper.
     * If the wrapped value is undefined, returns the mapper's {@link StringNullmapper#handleUndefined} value.
     * Otherwise, returns the value of the mapper's property whose name matches the wrapped value.
     *
     * @template T - The data type that the string literal or enum value will be mapped to.
     *
     * @param mapper - A mapper implementation for type S that returns type T.
     * @returns The mapped value from the mapper.
     */
    public with<R>(mapper: StringMapperWithUndefined<S, R>): R;
}

/**
 * A wrapper around a string literal or string enum value to be mapped.
 * For values that may be null and undefined.
 * Do not use this class directly. Use the {@link mapString} function to get an instance of this class.
 *
 * NOTE: This class provides the run-time implementation for ALL "StringMappee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export class StringMappeeWithNullAndUndefined<S extends string> {
    /**
     * Do not use this constructor directly. Use the {@link mapString} function to get an instance of this class.
     * @param value - The value to be wrapped by this "mappee".
     */
    public constructor(private readonly value: S | null | undefined) { }

    /**
     * Maps the wrapped value using the supplied mapper.
     * If the wrapped value is null, returns the mapper's {@link StringNullmapper#handleNull} value.
     * If the wrapped value is undefined, returns the mapper's {@link StringNullmapper#handleUndefined} value.
     * Otherwise, returns the value of the mapper's property whose name matches the wrapped value.
     *
     * @template T - The data type that the string literal or enum value will be mapped to.
     *
     * @param mapper - A mapper implementation for type S that returns type T.
     * @returns The mapped value from the mapper.
     */
    public with<R>(mapper: StringMapperWithNullAndUndefined<S, R>): R {
        if (this.value === null) {
            return mapper.handleNull;
        } else if (this.value === undefined) {
            return mapper.handleUndefined;
        } else {
            return (mapper as StringMapper<S, R>)[this.value];
        }
    }
}
