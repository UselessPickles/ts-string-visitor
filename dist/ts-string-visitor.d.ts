export declare type StringVisitor<S extends string, R> = {
    [P in S]: (value: P) => R;
};
export declare type StringVisitorWithNull<S extends string, R> = StringVisitor<S, R> & {
    handleNull: (value: null) => R;
};
export declare type StringVisitorWithUndefined<S extends string, R> = StringVisitor<S, R> & {
    handleUndefined: (value: undefined) => R;
};
export declare type StringVisitorWithNullAndUndefined<S extends string, R> = StringVisitorWithNull<S, R> & StringVisitorWithUndefined<S, R>;
export declare class StringVisitee<S extends string> {
    with<R>(visitor: StringVisitor<S, R>): R;
}
export declare class StringVisiteeWithNull<S extends string> {
    with<R>(visitor: StringVisitorWithNull<S, R>): R;
}
export declare class StringVisiteeWithUndefined<S extends string> {
    with<R>(visitor: StringVisitorWithUndefined<S, R>): R;
}
export declare class StringVisiteeWithNullAndUndefined<S extends string> {
    private readonly value;
    constructor(value: S | null | undefined);
    with<R>(visitor: StringVisitorWithNullAndUndefined<S, R>): R;
}
/**
 * The first step to using the visitor pattern on the value of a string enum or string literal union type.
 * This method creates a "visitee" wrapper object, whose "with()" method must be called with a visitor
 * implementation.
 * @param value - The value to visit. Must a string enum type, or a string literal union type.
 *                If the value may possibly be null, then you will need to provide a visitor with a
 *                "handleNull" method.
 *                If the value may possibly be undefined, then you will need to provide a visitor with a
 *                "handleUndefined" method.
 * @return A "visitee" wrapper around the provided value, whose "with()" method must be called with a
 *         visitor implementation.
 */
export declare function visitString<S extends string>(value: S): StringVisitee<S>;
export declare function visitString<S extends string>(value: S | null): StringVisiteeWithNull<S>;
export declare function visitString<S extends string>(value: S | undefined): StringVisiteeWithUndefined<S>;
export declare function visitString<S extends string>(value: S | null | undefined): StringVisiteeWithNullAndUndefined<S>;
export default visitString;
