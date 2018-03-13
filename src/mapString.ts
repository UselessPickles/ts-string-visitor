import {
    StringMappee,
    StringMappeeWithNull,
    StringMappeeWithUndefined,
    StringMappeeWithNullAndUndefined
} from "./StringMappee";
import { StringMapperFunctionFactory } from "./StringMapperFunctionFactory";

/**
 * Union of all "StringMappee" types.
 */
type AnyStringMappee<S extends string> =
    | StringMappee<S>
    | StringMappeeWithNull<S>
    | StringMappeeWithUndefined<S>
    | StringMappeeWithNullAndUndefined<S>;

/**
 * The first step to mapping the value of a string literal type or string enum.
 * This method creates a "mappee" wrapper object, whose "with()" method must be called with a mapper
 * implementation.
 *
 * Example: mapString(aStringEnumValue).with({ ... }).
 *
 * See also, {@link StringMappee#with} and {@link StringMapper}.
 *
 * @template S - A string literal type or string enum type.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "mappee" wrapper around the provided value, whose "with()" method must be called with a
 *         mapper implementation.
 */
export function mapString<S extends string>(value: S): StringMappee<S>;

/**
 * The first step to mapping the value of a string literal type or string enum.
 * This method creates a "mappee" wrapper object, whose "with()" method must be called with a mapper
 * implementation.
 *
 * Example: mapString(aStringEnumValue).with({ ... }).
 *
 * See also, {@link StringMappeeWithNull#with} and {@link StringMapperWithNull}.
 *
 * @template S - A string literal type or string enum type.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "mappee" wrapper around the provided value, whose "with()" method must be called with a
 *         mapper implementation.
 */
export function mapString<S extends string>(
    value: S | null
): StringMappeeWithNull<S>;

/**
 * The first step to mapping the value of a string literal type or string enum.
 * This method creates a "mappee" wrapper object, whose "with()" method must be called with a mapper
 * implementation.
 *
 * Example: mapString(aStringEnumValue).with({ ... }).
 *
 * See also, {@link StringMappeeWithUndefined#with} and {@link StringMapperWithUndefined}.
 *
 * @template S - A string literal type or string enum type.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "mappee" wrapper around the provided value, whose "with()" method must be called with a
 *         mapper implementation.
 */
export function mapString<S extends string>(
    value: S | undefined
): StringMappeeWithUndefined<S>;

/**
 * The first step to mapping the value of a string literal type or string enum.
 * This method creates a "mappee" wrapper object, whose "with()" method must be called with a mapper
 * implementation.
 *
 * Example: mapString(aStringEnumValue).with({ ... }).
 * See also, {@link StringMappeeWithNullAndUndefined#with} and {@link StringMapperWithNullAndUndefined}.
 *
 * @template S - A string literal type or string enum type.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "mappee" wrapper around the provided value, whose "with()" method must be called with a
 *         mapper implementation.
 */
export function mapString<S extends string>(
    value: S | null | undefined
): StringMappeeWithNullAndUndefined<S>;

export function mapString<S extends string>(
    value: S | null | undefined
): AnyStringMappee<S> {
    // NOTE: The run time type of StringMappee created does not necessarily match the compile-time
    //       type. This results in unusual StringMappee.with() implementations.
    if (value === null) {
        return new StringMappeeWithNull<S>();
    } else if (value === undefined) {
        return new StringMappeeWithUndefined<S>();
    } else {
        return new StringMappee<S>(value);
    }
}

export namespace mapString {
    export function makeFunctionFor<
        S extends string
    >(): StringMapperFunctionFactory<S> {
        return new StringMapperFunctionFactory<S>();
    }
}
