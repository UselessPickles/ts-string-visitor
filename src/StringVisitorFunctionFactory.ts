import {
    StringVisitorCore,
    StringVisitor,
    StringVisitorWithNull,
    StringVisitorWithUndefined,
    StringVisitorWithNullAndUndefined
} from "./StringVisitor";

export class StringVisitorFunctionFactory<S extends string> {
    public static readonly instance = new StringVisitorFunctionFactory<
        string
    >();

    public orNull(): StringVisitorFunctionFactoryWithNull<S> {
        return StringVisitorFunctionFactoryWithNull.instance;
    }

    public orUndefined(): StringVisitorFunctionFactoryWithUndefined<S> {
        return StringVisitorFunctionFactoryWithUndefined.instance;
    }

    public orNullorUndefined(): StringVisitorFunctionFactoryWithNullAndUndefined<
        S
    > {
        return StringVisitorFunctionFactoryWithNullAndUndefined.instance;
    }

    public with<R>(mapper: StringVisitor<S, R>): (value: S) => R {
        return (value: S) => {
            if (mapper.hasOwnProperty(value)) {
                return (mapper as StringVisitorCore<S, R>)[value](value);
            } else if (mapper.hasOwnProperty("handleUnexpected")) {
                return mapper.handleUnexpected!(value);
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

export class StringVisitorFunctionFactoryWithNull<S extends string> {
    public static readonly instance = new StringVisitorFunctionFactoryWithNull<
        string
    >();

    public with<R>(
        mapper: StringVisitorWithNull<S, R>
    ): (value: S | null) => R {
        return (value: S | null) => {
            if (value === null) {
                return mapper.handleNull(value);
            } else if (mapper.hasOwnProperty(value)) {
                return (mapper as StringVisitorCore<S, R>)[value](value);
            } else if (mapper.hasOwnProperty("handleUnexpected")) {
                return mapper.handleUnexpected!(value);
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

export class StringVisitorFunctionFactoryWithUndefined<S extends string> {
    public static readonly instance = new StringVisitorFunctionFactoryWithUndefined<
        string
    >();

    public with<R>(
        mapper: StringVisitorWithUndefined<S, R>
    ): (value: S | undefined) => R {
        return (value: S | undefined) => {
            if (value === undefined) {
                return mapper.handleUndefined(value);
            } else if (mapper.hasOwnProperty(value)) {
                return (mapper as StringVisitorCore<S, R>)[value](value);
            } else if (mapper.hasOwnProperty("handleUnexpected")) {
                return mapper.handleUnexpected!(value);
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}

export class StringVisitorFunctionFactoryWithNullAndUndefined<
    S extends string
> {
    public static readonly instance = new StringVisitorFunctionFactoryWithNullAndUndefined<
        string
    >();

    public with<R>(
        mapper: StringVisitorWithNullAndUndefined<S, R>
    ): (value: S | null | undefined) => R {
        return (value: S | null | undefined) => {
            if (value === undefined) {
                return mapper.handleUndefined(value);
            } else if (value === null) {
                return mapper.handleNull(value);
            } else if (mapper.hasOwnProperty(value)) {
                return (mapper as StringVisitorCore<S, R>)[value](value);
            } else if (mapper.hasOwnProperty("handleUnexpected")) {
                return mapper.handleUnexpected!(value);
            } else {
                throw new Error(`Unexpected value: ${value}`);
            }
        };
    }
}
