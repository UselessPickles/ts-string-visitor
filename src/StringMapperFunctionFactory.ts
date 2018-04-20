import {
    StringMapperCore,
    StringMapper,
    StringMapperWithNull,
    StringMapperWithUndefined,
    StringMapperWithNullAndUndefined
} from "./StringMapper";

export class StringMapperFunctionFactory<S extends string> {
    public static readonly instance = new StringMapperFunctionFactory<string>();

    public orNull(): StringMapperFunctionFactoryWithNull<S> {
        return StringMapperFunctionFactoryWithNull.instance;
    }

    public orUndefined(): StringMapperFunctionFactoryWithUndefined<S> {
        return StringMapperFunctionFactoryWithUndefined.instance;
    }

    public orNullorUndefined(): StringMapperFunctionFactoryWithNullAndUndefined<
        S
    > {
        return StringMapperFunctionFactoryWithNullAndUndefined.instance;
    }

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

export class StringMapperFunctionFactoryWithNull<S extends string> {
    public static readonly instance = new StringMapperFunctionFactoryWithNull<
        string
    >();

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

export class StringMapperFunctionFactoryWithUndefined<S extends string> {
    public static readonly instance = new StringMapperFunctionFactoryWithUndefined<
        string
    >();

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

export class StringMapperFunctionFactoryWithNullAndUndefined<S extends string> {
    public static readonly instance = new StringMapperFunctionFactoryWithNullAndUndefined<
        string
    >();

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
