/**
 * Private token used to mark every instance of {@link UnhandledEntry} for
 * simple/reliable identification at runtime.
 */
const TOKEN = Symbol();

/**
 * Used to indicate that an entry in a visitor/mapper interface is not handled.
 */
export class UnhandledEntry {
    /**
     * Marker for simple/reliable identification at runtime.
     */
    private readonly token = TOKEN;

    /**
     * Singleton instance without a message.
     */
    private static singletonInstance = new UnhandledEntry();

    /**
     * @param message An optional message that will be included in the error
     *        message of ther Error created by {@link #createError}.
     */
    public constructor(private readonly message?: string) {
        if (!message) {
            return UnhandledEntry.singletonInstance;
        }
    }

    /**
     * Creates an Error with a message explaining that an unhandled
     * value was encountered.
     * @param unhandledValue - The unhandled value.
     * @return an Error with a message explaining that an unhandled
     * value was encountered.
     */
    public createError(unhandledValue: string | null | undefined): Error {
        let message = `Unhandled value: ${unhandledValue}`;

        if (this.message) {
            message += ` - ${this.message}`;
        }

        return new Error(message);
    }

    /**
     * Tests if a value is an {@link UnhandledEntry}.
     * @param value - any value.
     * @return True if the value is an UnhandledEntry.
     */
    public static isUnhandledEntry(value: any): value is UnhandledEntry {
        return value && (value as UnhandledEntry).token === TOKEN;
    }
}
