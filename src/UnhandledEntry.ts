/**
 * Utilities related to identifying/processing explicitly unhandled entries
 * in string visitors/mappers.
 */
export namespace UnhandledEntry {
    /**
     * A unique token that identifies an entry in a string visitor/mapper
     * as "unhandled".
     */
    export const token = Symbol("UnhandledEntry");

    /**
     * The unique token type of {@link UnhandledEntry.token}.
     */
    export type Token = typeof token;

    /**
     * Creates an Error with a message explaining that an unhandled
     * value was encountered.
     * @param unhandledValue - The unhandled value.
     * @return an Error with a message explaining that an unhandled
     * value was encountered.
     */
    export function createError(
        unhandledValue: string | null | undefined
    ): Error {
        return new Error(`Unhandled value: ${unhandledValue}`);
    }
}
