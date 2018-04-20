import {
    StringVisitee,
    StringVisiteeWithNull,
    StringVisiteeWithUndefined,
    StringVisiteeWithNullAndUndefined
} from "./StringVisitee";
import { StringVisitorFunctionFactory } from "./StringVisitorFunctionFactory";

/**
 * Union of all "StringVisitee" types.
 */
type AnyStringVisitee<S extends string> =
    | StringVisitee<S>
    | StringVisiteeWithNull<S>
    | StringVisiteeWithUndefined<S>
    | StringVisiteeWithNullAndUndefined<S>;

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
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export function visitString<S extends string>(value: S): StringVisitee<S>;

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
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export function visitString<S extends string>(
    value: S | null
): StringVisiteeWithNull<S>;

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
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export function visitString<S extends string>(
    value: S | undefined
): StringVisiteeWithUndefined<S>;

/**
 * The first step to using the visitor pattern on the value of a string literal type or string enum.
 * This method creates a "visitee" wrapper object, whose "with()" method must be called with a visitor
 * implementation.
 *
 * Example: visitString(aStringEnumValue).with({ ... }).
 * See also, {@link StringVisiteeWithNullAndUndefined#with} and {@link StringVisitorWithNullAndUndefined}.
 *
 * @template S - A string literal type or string enum type.
 *
 * @param value - The value to visit. Must a string literal type or a string enum.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export function visitString<S extends string>(
    value: S | null | undefined
): StringVisiteeWithNullAndUndefined<S>;

export function visitString<S extends string>(
    value: S | null | undefined
): AnyStringVisitee<S> {
    // NOTE: The run time type of StringVisitee created does not necessarily match the compile-time
    //       type. This results in unusual StringVisitee.with() implementations.
    if (value === null) {
        return StringVisiteeWithNull.instance;
    } else if (value === undefined) {
        return StringVisiteeWithUndefined.instance;
    } else {
        return new StringVisitee<S>(value);
    }
}

export namespace visitString {
    export function makeFunctionFor<
        S extends string
    >(): StringVisitorFunctionFactory<S> {
        return StringVisitorFunctionFactory.instance;
    }
}
