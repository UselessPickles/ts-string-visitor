import { UnhandledEntry } from "../src/UnhandledEntry";

describe("UnhandledEntry", () => {
    describe("createError()", () => {
        test("returns a new Error", () => {
            const error = UnhandledEntry.createError("foo");

            expect(error).toBeInstanceOf(Error);
            expect(UnhandledEntry.createError("foo")).not.toBe(error);
        });

        test("Error.message", () => {
            const error = UnhandledEntry.createError("foo");

            expect(error.message).toBe("Unhandled value: foo");
        });
    });
});
