import { UnhandledEntry } from "../src/UnhandledEntry";

describe("UnhandledEntry", () => {
    describe("constructor", () => {
        test("Without a message produces a singleton", () => {
            const unhandledEntry = new UnhandledEntry();

            expect(unhandledEntry).toBeInstanceOf(UnhandledEntry);
            expect(new UnhandledEntry()).toBe(unhandledEntry);
        });

        test("With a message produces a new instance", () => {
            const unhandledEntry = new UnhandledEntry("Test message");

            expect(unhandledEntry).toBeInstanceOf(UnhandledEntry);
            expect(new UnhandledEntry("Test message")).not.toBe(unhandledEntry);
        });
    });

    describe("createError()", () => {
        test("returns a new Error", () => {
            const unhandledEntry = new UnhandledEntry();
            const error = unhandledEntry.createError("foo");

            expect(error).toBeInstanceOf(Error);
            expect(unhandledEntry.createError("foo")).not.toBe(error);
        });

        describe("Error.message", () => {
            test("without message", () => {
                const unhandledEntry = new UnhandledEntry();
                const error = unhandledEntry.createError("foo");

                expect(error.message).toBe("Unhandled value: foo");
            });

            test("with message", () => {
                const unhandledEntry = new UnhandledEntry("Test message");
                const error = unhandledEntry.createError("foo");

                expect(error.message).toBe(
                    "Unhandled value: foo - Test message"
                );
            });
        });
    });

    test("isUnhandledEntry()", () => {
        expect(UnhandledEntry.isUnhandledEntry(new UnhandledEntry())).toBe(
            true
        );
        expect(
            UnhandledEntry.isUnhandledEntry(new UnhandledEntry("Test message"))
        ).toBe(true);

        // object with message property is "like" a UnhandledEntry, but fails the test
        expect(
            UnhandledEntry.isUnhandledEntry({
                message: "Test message"
            })
        ).toBe(false);
    });
});
