import {
    StringMapperCore,
    StringMapper,
    StringMapperWithNull,
    StringMapperWithUndefined,
    StringMapperWithNullAndUndefined
} from "./StringMapper";

export class StringMapperFunctionFactory<S extends string> {
    public with<R>(
        mapper: StringMapperWithNullAndUndefined<S, R>
    ): (value: S | null | undefined) => R;
    public with<R>(mapper: StringMapperWithNull<S, R>): (value: S | null) => R;
    public with<R>(
        mapper: StringMapperWithUndefined<S, R>
    ): (value: S | undefined) => R;
    public with<R>(mapper: StringMapper<S, R>): (value: S) => R;
    public with<R>(
        mapper:
            | StringMapperWithNullAndUndefined<S, R>
            | StringMapperWithNull<S, R>
            | StringMapperWithUndefined<S, R>
            | StringMapper<S, R>
    ): (value: S) => R {
        const withNull = mapper.hasOwnProperty("handleNull");
        const withUndefined = mapper.hasOwnProperty("handleUndefined");

        if (withNull && withUndefined) {
            const castMapper = mapper as StringMapperWithNullAndUndefined<S, R>;

            return (value: S | null | undefined) => {
                if (value === undefined) {
                    return castMapper.handleUndefined;
                } else if (value === null) {
                    return castMapper.handleNull;
                } else if (mapper.hasOwnProperty(value)) {
                    return (mapper as StringMapperCore<S, R>)[value];
                } else if (mapper.hasOwnProperty("handleUnexpected")) {
                    return mapper.handleUnexpected!;
                } else {
                    throw new Error(`Unexpected value: ${value}`);
                }
            };
        } else if (withNull) {
            const castMapper = mapper as StringMapperWithNull<S, R>;

            return (value: S | null) => {
                if (value === null) {
                    return castMapper.handleNull;
                } else if (mapper.hasOwnProperty(value)) {
                    return (mapper as StringMapperCore<S, R>)[value];
                } else if (mapper.hasOwnProperty("handleUnexpected")) {
                    return mapper.handleUnexpected!;
                } else {
                    throw new Error(`Unexpected value: ${value}`);
                }
            };
        } else if (withUndefined) {
            const castMapper = mapper as StringMapperWithUndefined<S, R>;

            return (value: S | undefined) => {
                if (value === undefined) {
                    return castMapper.handleUndefined;
                } else if (mapper.hasOwnProperty(value)) {
                    return (mapper as StringMapperCore<S, R>)[value];
                } else if (mapper.hasOwnProperty("handleUnexpected")) {
                    return mapper.handleUnexpected!;
                } else {
                    throw new Error(`Unexpected value: ${value}`);
                }
            };
        } else {
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
}
