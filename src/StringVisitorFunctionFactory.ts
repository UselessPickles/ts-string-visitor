import {
    StringVisitorCore,
    StringVisitor,
    StringVisitorWithNull,
    StringVisitorWithUndefined,
    StringVisitorWithNullAndUndefined
} from "./StringVisitor";

export class StringVisitorFunctionFactory<S extends string> {
    public with<R>(
        mapper: StringVisitorWithNullAndUndefined<S, R>
    ): (value: S | null | undefined) => R;
    public with<R>(mapper: StringVisitorWithNull<S, R>): (value: S | null) => R;
    public with<R>(
        mapper: StringVisitorWithUndefined<S, R>
    ): (value: S | undefined) => R;
    public with<R>(mapper: StringVisitor<S, R>): (value: S) => R;
    public with<R>(
        mapper:
            | StringVisitorWithNullAndUndefined<S, R>
            | StringVisitorWithNull<S, R>
            | StringVisitorWithUndefined<S, R>
            | StringVisitor<S, R>
    ): (value: S) => R {
        const withNull = mapper.hasOwnProperty("handleNull");
        const withUndefined = mapper.hasOwnProperty("handleUndefined");

        if (withNull && withUndefined) {
            const castMapper = mapper as StringVisitorWithNullAndUndefined<
                S,
                R
            >;

            return (value: S | null | undefined) => {
                if (value === undefined) {
                    return castMapper.handleUndefined(value);
                } else if (value === null) {
                    return castMapper.handleNull(value);
                } else if (mapper.hasOwnProperty(value)) {
                    return (mapper as StringVisitorCore<S, R>)[value](value);
                } else if (mapper.hasOwnProperty("handleUnexpected")) {
                    return castMapper.handleUnexpected!(value);
                } else {
                    throw new Error(`Unexpected value: ${value}`);
                }
            };
        } else if (withNull) {
            const castMapper = mapper as StringVisitorWithNull<S, R>;

            return (value: S | null) => {
                if (value === null) {
                    return castMapper.handleNull(value);
                } else if (mapper.hasOwnProperty(value)) {
                    return (mapper as StringVisitorCore<S, R>)[value](value);
                } else if (mapper.hasOwnProperty("handleUnexpected")) {
                    return castMapper.handleUnexpected!(value);
                } else {
                    throw new Error(`Unexpected value: ${value}`);
                }
            };
        } else if (withUndefined) {
            const castMapper = mapper as StringVisitorWithUndefined<S, R>;

            return (value: S | undefined) => {
                if (value === undefined) {
                    return castMapper.handleUndefined(value);
                } else if (mapper.hasOwnProperty(value)) {
                    return (mapper as StringVisitorCore<S, R>)[value](value);
                } else if (mapper.hasOwnProperty("handleUnexpected")) {
                    return castMapper.handleUnexpected!(value);
                } else {
                    throw new Error(`Unexpected value: ${value}`);
                }
            };
        } else {
            return (value: S) => {
                const castMapper = mapper as StringVisitor<S, R>;

                if (mapper.hasOwnProperty(value)) {
                    return (mapper as StringVisitorCore<S, R>)[value](value);
                } else if (mapper.hasOwnProperty("handleUnexpected")) {
                    return castMapper.handleUnexpected!(value);
                } else {
                    throw new Error(`Unexpected value: ${value}`);
                }
            };
        }
    }
}
