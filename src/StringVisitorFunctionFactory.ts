import {
    StringVisitorCore,
    StringVisitor,
    StringVisitorWithNull,
    StringVisitorWithUndefined,
    StringVisitorWithNullAndUndefined
} from "./StringVisitor";

/**
 * A factory class used to create function that implements a string visitor.
 * Used for visiting values that are not expected to be null or undefined.
 */
export class StringVisitorFunctionFactory<S extends string> {
    /**
     * An instance that is reused as an optimization.
     * This class has no state, so there is no reason to create multiple instances.
     */
    public static readonly instance = new StringVisitorFunctionFactory<
        string
    >();

    /**
     * Gets a string visitor function factory for values that may possibly be null.
     * @return a string visitor function factory for values that may possibly be null.
     */
    public orNull(): StringVisitorFunctionFactoryWithNull<S> {
        return StringVisitorFunctionFactoryWithNull.instance;
    }

    /**
     * Gets a string visitor function factory for values that may possibly be undefined.
     * @return a string visitor function factory for values that may possibly be undefined.
     */
    public orUndefined(): StringVisitorFunctionFactoryWithUndefined<S> {
        return StringVisitorFunctionFactoryWithUndefined.instance;
    }

    /**
     * Gets a string visitor function factory for values that may possibly be null or undefined.
     * @return a string visitor function factory for values that may possibly be null or undefined.
     */
    public orNullorUndefined(): StringVisitorFunctionFactoryWithNullAndUndefined<
        S
    > {
        return StringVisitorFunctionFactoryWithNullAndUndefined.instance;
    }

    /**
     * Creates a string visitor function using the provided string visitor.
     * @param visitor - A string visitor implementation.
     * @return A function that applies the provided string visitor implementation to provided value.
     */
    public with<R>(visitor: StringVisitor<S, R>): (value: S) => R {
        return (value: S) => {
            if (visitor.hasOwnProperty(value)) {
                return (visitor as StringVisitorCore<S, R>)[value](value);
            } else if (visitor.hasOwnProperty("handleUnexpected")) {
                return visitor.handleUnexpected!(value);
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

/**
 * A factory class used to create function that implements a string visitor.
 * Used for visiting values that are expected to possibly be null.
 */
export class StringVisitorFunctionFactoryWithNull<S extends string> {
    /**
     * An instance that is reused as an optimization.
     * This class has no state, so there is no reason to create multiple instances.
     */
    public static readonly instance = new StringVisitorFunctionFactoryWithNull<
        string
    >();

    /**
     * Creates a string visitor function using the provided string visitor.
     * @param visitor - A string visitor implementation.
     * @return A function that applies the provided string visitor implementation to provided value.
     */
    public with<R>(
        visitor: StringVisitorWithNull<S, R>
    ): (value: S | null) => R {
        return (value: S | null) => {
            if (value === null) {
                return visitor.handleNull(value);
            } else if (visitor.hasOwnProperty(value)) {
                return (visitor as StringVisitorCore<S, R>)[value](value);
            } else if (visitor.hasOwnProperty("handleUnexpected")) {
                return visitor.handleUnexpected!(value);
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

/**
 * A factory class used to create function that implements a string visitor.
 * Used for visiting values that are expected to possibly be undefined.
 */
export class StringVisitorFunctionFactoryWithUndefined<S extends string> {
    /**
     * An instance that is reused as an optimization.
     * This class has no state, so there is no reason to create multiple instances.
     */
    public static readonly instance = new StringVisitorFunctionFactoryWithUndefined<
        string
    >();

    /**
     * Creates a string visitor function using the provided string visitor.
     * @param visitor - A string visitor implementation.
     * @return A function that applies the provided string visitor implementation to provided value.
     */
    public with<R>(
        visitor: StringVisitorWithUndefined<S, R>
    ): (value: S | undefined) => R {
        return (value: S | undefined) => {
            if (value === undefined) {
                return visitor.handleUndefined(value);
            } else if (visitor.hasOwnProperty(value)) {
                return (visitor as StringVisitorCore<S, R>)[value](value);
            } else if (visitor.hasOwnProperty("handleUnexpected")) {
                return visitor.handleUnexpected!(value);
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

/**
 * A factory class used to create function that implements a string visitor.
 * Used for visiting values that are expected to possibly be null or undefined.
 */
export class StringVisitorFunctionFactoryWithNullAndUndefined<
    S extends string
> {
    /**
     * An instance that is reused as an optimization.
     * This class has no state, so there is no reason to create multiple instances.
     */
    public static readonly instance = new StringVisitorFunctionFactoryWithNullAndUndefined<
        string
    >();

    /**
     * Creates a string visitor function using the provided string visitor.
     * @param visitor - A string visitor implementation.
     * @return A function that applies the provided string visitor implementation to provided value.
     */
    public with<R>(
        visitor: StringVisitorWithNullAndUndefined<S, R>
    ): (value: S | null | undefined) => R {
        return (value: S | null | undefined) => {
            if (value === undefined) {
                return visitor.handleUndefined(value);
            } else if (value === null) {
                return visitor.handleNull(value);
            } else if (visitor.hasOwnProperty(value)) {
                return (visitor as StringVisitorCore<S, R>)[value](value);
            } else if (visitor.hasOwnProperty("handleUnexpected")) {
                return visitor.handleUnexpected!(value);
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}
