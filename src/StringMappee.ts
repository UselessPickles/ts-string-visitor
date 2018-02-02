import {
    StringMapperCore,
    StringMapper,
    StringMapperWithNull,
    StringMapperWithUndefined,
    StringMapperWithNullAndUndefined
} from "./StringMapper";

/**
 * A wrapper around a string literal or string enum value to be mapped.
 * Do not use this class directly. Use the {@link mapString} function to get an instance of this class.
 *
 * @template S - A string literal type or string enum type.
 */
export class StringMappee<S extends string> {
    /**
     * Do not use this constructor directly. Use the {@link mapString} function to get an instance of this class.
     * @param value - The value to be wrapped by this "mappee".
     */
    public constructor(private readonly value: S) { }

    /**
     * Maps the wrapped value using the supplied mapper.
     * Returns the value of the mapper's property whose name matches the wrapped value.
     *
     * @template T - The data type that the string literal or enum value will be mapped to.
     *
     * @param mapper - A mapper implementation for type S that returns type T.
     * @returns The mapped value from the mapper.
     */
    public with<R>(mapper: StringMapper<S, R>): R {
        if (this.value in mapper) {
            return (mapper as StringMapperCore<S, R>)[this.value];
        } else if ("handleUnexpected" in mapper) {
            return mapper.handleUnexpected!;
        } else {
            throw new Error(`Unexpected value: ${this.value}`);
        }
    }
}

/**
 * A wrapper around a string literal or string enum value to be mapped.
 * For values that may be null.
 * Do not use this class directly. Use the {@link mapString} function to get an instance of this class.
 *
 * NOTE: At run time, this class is used by {@link mapString} ONLY for handling null values.
 *       {@link StringMappee} contains the core run time implementation that is applicable to all
 *       "StringMappee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export class StringMappeeWithNull<S extends string> {
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
    public with<R>(mapper: StringMapperWithNull<S, R>): R {
        // This class is used at run time for mapping null values regardless of the compile time
        // type being visited, so we actually have to check if handleNull exists.
        if ("handleNull" in mapper) {
            return mapper.handleNull;
        } else if ("handleUnexpected" in mapper) {
            return mapper.handleUnexpected!;
        } else {
            throw new Error(`Unexpected value: null`);
        }
    }
}

/**
 * A wrapper around a string literal or string enum value to be mapped.
 * For values that may be undefined.
 * Do not use this class directly. Use the {@link mapString} function to get an instance of this class.
 *
 * NOTE: At run time, this class is used by {@link mapString} ONLY for handling undefined values.
 *       {@link StringMappee} contains the core run time implementation that is applicable to all
 *       "StringMappee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
export class StringMappeeWithUndefined<S extends string> {
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
    public with<R>(mapper: StringMapperWithUndefined<S, R>): R {
        // This class is used at run time for mapping undefined values regardless of the compile time
        // type being visited, so we actually have to check if handleUndefined exists.
        if ("handleUndefined" in mapper) {
            return mapper.handleUndefined;
        } else if ("handleUnexpected" in mapper) {
            return mapper.handleUnexpected!;
        } else {
            throw new Error(`Unexpected value: undefined`);
        }
    }
}

/**
 * A wrapper around a string literal or string enum value to be mapped.
 * For values that may be null and undefined.
 * Do not use this class directly. Use the {@link mapString} function to get an instance of this class.
 *
 * NOTE: No run time implementation of this class actually exists. This is only used for compile-time
 *       typing. {@link StringMappee} contains the core run time implementation that is applicable to all
 *       "StringMappee" classes, while {@link StringMappeeWithNull} and {@link StringMappeeWithUndefined}
 *       are used at run time to handle null and undefined values.
 *
 * @template S - A string literal type or string enum type.
 */
export declare class StringMappeeWithNullAndUndefined<S extends string> {
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
    public with<R>(mapper: StringMapperWithNullAndUndefined<S, R>): R;
}
