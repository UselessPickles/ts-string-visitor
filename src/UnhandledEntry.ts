export namespace UnhandledEntry {
    export const token = Symbol("UnhandledEntry");

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
