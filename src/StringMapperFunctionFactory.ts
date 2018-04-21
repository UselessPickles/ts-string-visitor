import {
    StringMapperCore,
    StringMapper,
    StringMapperWithNull,
    StringMapperWithUndefined,
    StringMapperWithNullAndUndefined
} from "./StringMapper";

/**
 * A factory class used to create function that implements a string mapper.
 * Used for mapping values that are not expected to be null or undefined.
 */
export class StringMapperFunctionFactory<S extends string> {
    /**
     * An instance that is reused as an optimization.
     * This class has no state, so there is no reason to create multiple instances.
     */
    public static readonly instance = new StringMapperFunctionFactory<string>();

    /**
     * Gets a string mapper function factory for values that may possibly be null.
     * @return a string mapper function factory for values that may possibly be null.
     */
    public orNull(): StringMapperFunctionFactoryWithNull<S> {
        return StringMapperFunctionFactoryWithNull.instance;
    }

    /**
     * Gets a string mapper function factory for values that may possibly be undefined.
     * @return a string mapper function factory for values that may possibly be undefined.
     */
    public orUndefined(): StringMapperFunctionFactoryWithUndefined<S> {
        return StringMapperFunctionFactoryWithUndefined.instance;
    }

    /**
     * Gets a string mapper function factory for values that may possibly be null or undefined.
     * @return a string mapper function factory for values that may possibly be null or undefined.
     */
    public orNullorUndefined(): StringMapperFunctionFactoryWithNullAndUndefined<
        S
    > {
        return StringMapperFunctionFactoryWithNullAndUndefined.instance;
    }

    /**
     * Creates a string mapper function using the provided string mapper.
     * @param mapper - A string mapper implementation.
     * @return A function that applies the provided string mapper implementation to provided value.
     */
    public with<R>(mapper: StringMapper<S, R>): (value: S) => R {
        return (value: S) => {
            if (mapper.hasOwnProperty(value)) {
                return (mapper as StringMapperCore<S, R>)[value];
            } else if (mapper.hasOwnProperty("handleUnexpected")) {
                return mapper.handleUnexpected!;
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

/**
 * A factory class used to create function that implements a string mapper.
 * Used for mapping values that are expected to possibly be null.
 */
export class StringMapperFunctionFactoryWithNull<S extends string> {
    /**
     * An instance that is reused as an optimization.
     * This class has no state, so there is no reason to create multiple instances.
     */
    public static readonly instance = new StringMapperFunctionFactoryWithNull<
        string
    >();

    /**
     * Creates a string mapper function using the provided string mapper.
     * @param mapper - A string mapper implementation.
     * @return A function that applies the provided string mapper implementation to provided value.
     */
    public with<R>(mapper: StringMapperWithNull<S, R>): (value: S | null) => R {
        return (value: S | null) => {
            if (value === null) {
                return mapper.handleNull;
            } else if (mapper.hasOwnProperty(value)) {
                return (mapper as StringMapperCore<S, R>)[value];
            } else if (mapper.hasOwnProperty("handleUnexpected")) {
                return mapper.handleUnexpected!;
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

/**
 * A factory class used to create function that implements a string mapper.
 * Used for mapping values that are expected to possibly be undefined.
 */
export class StringMapperFunctionFactoryWithUndefined<S extends string> {
    /**
     * An instance that is reused as an optimization.
     * This class has no state, so there is no reason to create multiple instances.
     */
    public static readonly instance = new StringMapperFunctionFactoryWithUndefined<
        string
    >();

    /**
     * Creates a string mapper function using the provided string mapper.
     * @param mapper - A string mapper implementation.
     * @return A function that applies the provided string mapper implementation to provided value.
     */
    public with<R>(
        mapper: StringMapperWithUndefined<S, R>
    ): (value: S | undefined) => R {
        return (value: S | undefined) => {
            if (value === undefined) {
                return mapper.handleUndefined;
            } else if (mapper.hasOwnProperty(value)) {
                return (mapper as StringMapperCore<S, R>)[value];
            } else if (mapper.hasOwnProperty("handleUnexpected")) {
                return mapper.handleUnexpected!;
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

/**
 * A factory class used to create function that implements a string mapper.
 * Used for mapping values that are expected to possibly be null or undefined.
 */
export class StringMapperFunctionFactoryWithNullAndUndefined<S extends string> {
    /**
     * An instance that is reused as an optimization.
     * This class has no state, so there is no reason to create multiple instances.
     */
    public static readonly instance = new StringMapperFunctionFactoryWithNullAndUndefined<
        string
    >();

    /**
     * Creates a string mapper function using the provided string mapper.
     * @param mapper - A string mapper implementation.
     * @return A function that applies the provided string mapper implementation to provided value.
     */
    public with<R>(
        mapper: StringMapperWithNullAndUndefined<S, R>
    ): (value: S | null | undefined) => R {
        return (value: S | null | undefined) => {
            if (value === undefined) {
                return mapper.handleUndefined;
            } else if (value === null) {
                return mapper.handleNull;
            } else if (mapper.hasOwnProperty(value)) {
                return (mapper as StringMapperCore<S, R>)[value];
            } else if (mapper.hasOwnProperty("handleUnexpected")) {
                return mapper.handleUnexpected!;
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}
