import { UnhandledEntry } from "../src/UnhandledEntry";

describe("UnhandledEntry", () => {
    describe("getInstance()", () => {
        test("Without a message produces a singleton", () => {
            const unhandledEntry = UnhandledEntry.getInstance();

            expect(unhandledEntry).toBeInstanceOf(UnhandledEntry);
            expect(UnhandledEntry.getInstance()).toBe(unhandledEntry);
        });

        test("With a message produces a new instance", () => {
            const unhandledEntry = UnhandledEntry.getInstance("Test message");

            expect(unhandledEntry).toBeInstanceOf(UnhandledEntry);
            expect(UnhandledEntry.getInstance("Test message")).not.toBe(
                unhandledEntry
            );
        });
    });

    describe("createError()", () => {
        test("returns a new Error", () => {
            const unhandledEntry = UnhandledEntry.getInstance();
            const error = unhandledEntry.createError("foo");

            expect(error).toBeInstanceOf(Error);
            expect(unhandledEntry.createError("foo")).not.toBe(error);
        });

        describe("Error.message", () => {
            test("without message", () => {
                const unhandledEntry = UnhandledEntry.getInstance();
                const error = unhandledEntry.createError("foo");

                expect(error.message).toBe("Unhandled value: foo");
            });

            test("with message", () => {
                const unhandledEntry = UnhandledEntry.getInstance(
                    "Test message"
                );
                const error = unhandledEntry.createError("foo");

                expect(error.message).toBe(
                    "Unhandled value: foo - Test message"
                );
            });
        });
    });

    test("isUnhandledEntry()", () => {
        expect(
            UnhandledEntry.isUnhandledEntry(UnhandledEntry.getInstance())
        ).toBe(true);
        expect(
            UnhandledEntry.isUnhandledEntry(
                UnhandledEntry.getInstance("Test message")
            )
        ).toBe(true);

        // object with message property is "like" a UnhandledEntry, but fails the test
        expect(
            UnhandledEntry.isUnhandledEntry({
                message: "Test message"
            })
        ).toBe(false);
    });
});
