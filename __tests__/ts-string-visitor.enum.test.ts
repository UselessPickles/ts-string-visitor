import {visitString, StringVisitor} from "../dist/ts-string-visitor";

describe("Visit String Enum", () => {
    enum RGB {
        R = "r",
        G = "g",
        B = "b"
    };

    const handlerMockR = jest.fn((value: RGB.R) => {
        return "Red!";
    });

    const handlerMockG = jest.fn((value: RGB.G) => {
        return "Green!";
    });

    const handlerMockB = jest.fn((value: RGB.B) => {
        return "Blue!";
    });

    const handlerMockNull = jest.fn((value: null) => {
        return "Null!";
    });

    const handlerMockUndefined = jest.fn((value: undefined) => {
        return "Undefined!";
    });

    const ALL_HANDLER_MOCKS = [
        handlerMockR,
        handlerMockG,
        handlerMockB,
        handlerMockNull,
        handlerMockUndefined
    ];

    beforeEach(() => {
        // Clear all handler mocks for a fresh start before each test
        for (const handlerMock of ALL_HANDLER_MOCKS) {
            handlerMock.mockClear();
        }
    });

    describe("Without null/undefined", () => {
        interface TestEntry {
            value: RGB,
            handlerMock: jest.Mock<string>,
            result: string
        }

        const TEST_ENTRIES: TestEntry[] = [
            {
                value: RGB.R,
                handlerMock: handlerMockR,
                result: "Red!"
            },
            {
                value: RGB.G,
                handlerMock: handlerMockG,
                result: "Green!"
            },
            {
                value: RGB.B,
                handlerMock: handlerMockB,
                result: "Blue!"
            }
        ]

        const visitor = {
            [RGB.R]: handlerMockR,
            [RGB.G]: handlerMockG,
            [RGB.B]: handlerMockB
        };

        for (const testEntry of TEST_ENTRIES) {
            test(`Correct visitor method is called (${testEntry.value})`, () => {
                visitString(testEntry.value).with(visitor);

                for (const handlerMock of ALL_HANDLER_MOCKS) {
                    if (handlerMock === testEntry.handlerMock) {
                        expect(handlerMock.mock.calls.length).toBe(1);
                    } else {
                        expect(handlerMock.mock.calls.length).toBe(0);
                    }
                }
            });

            test(`Value is passed to handler (${testEntry.value})`, () => {
                visitString(testEntry.value).with(visitor);
                const args = testEntry.handlerMock.mock.calls[0];
                expect(args.length).toBe(1);
                expect(args[0]).toBe(testEntry.value);
            });

            test(`handler result is returned (${testEntry.value})`, () => {
                const result = visitString(testEntry.value).with(visitor);
                expect(result).toBe(testEntry.result);
            });
        }
    });

    describe("With null", () => {
        interface TestEntry {
            value: RGB | null,
            handlerMock: jest.Mock<string>,
            result: string
        }

        const TEST_ENTRIES: TestEntry[] = [
            {
                value: RGB.R,
                handlerMock: handlerMockR,
                result: "Red!"
            },
            {
                value: RGB.G,
                handlerMock: handlerMockG,
                result: "Green!"
            },
            {
                value: RGB.B,
                handlerMock: handlerMockB,
                result: "Blue!"
            },
            {
                value: null,
                handlerMock: handlerMockNull,
                result: "Null!"
            }
        ]

        const visitor = {
            [RGB.R]: handlerMockR,
            [RGB.G]: handlerMockG,
            [RGB.B]: handlerMockB,
            handleNull: handlerMockNull
        };

        for (const testEntry of TEST_ENTRIES) {
            test(`Correct visitor method is called (${testEntry.value})`, () => {
                visitString(testEntry.value).with(visitor);

                for (const handlerMock of ALL_HANDLER_MOCKS) {
                    if (handlerMock === testEntry.handlerMock) {
                        expect(handlerMock.mock.calls.length).toBe(1);
                    } else {
                        expect(handlerMock.mock.calls.length).toBe(0);
                    }
                }
            });

            test(`Value is passed to handler (${testEntry.value})`, () => {
                visitString(testEntry.value).with(visitor);
                const args = testEntry.handlerMock.mock.calls[0];
                expect(args.length).toBe(1);
                expect(args[0]).toBe(testEntry.value);
            });

            test(`handler result is returned (${testEntry.value})`, () => {
                const result = visitString(testEntry.value).with(visitor);
                expect(result).toBe(testEntry.result);
            });
        }
    });

    describe("With undefined", () => {
        interface TestEntry {
            value: RGB | undefined,
            handlerMock: jest.Mock<string>,
            result: string
        }

        const TEST_ENTRIES: TestEntry[] = [
            {
                value: RGB.R,
                handlerMock: handlerMockR,
                result: "Red!"
            },
            {
                value: RGB.G,
                handlerMock: handlerMockG,
                result: "Green!"
            },
            {
                value: RGB.B,
                handlerMock: handlerMockB,
                result: "Blue!"
            },
            {
                value: undefined,
                handlerMock: handlerMockUndefined,
                result: "Undefined!"
            }
        ]

        const visitor = {
            [RGB.R]: handlerMockR,
            [RGB.G]: handlerMockG,
            [RGB.B]: handlerMockB,
            handleUndefined: handlerMockUndefined
        };

        for (const testEntry of TEST_ENTRIES) {
            test(`Correct visitor method is called (${testEntry.value})`, () => {
                visitString(testEntry.value).with(visitor);

                for (const handlerMock of ALL_HANDLER_MOCKS) {
                    if (handlerMock === testEntry.handlerMock) {
                        expect(handlerMock.mock.calls.length).toBe(1);
                    } else {
                        expect(handlerMock.mock.calls.length).toBe(0);
                    }
                }
            });

            test(`Value is passed to handler (${testEntry.value})`, () => {
                visitString(testEntry.value).with(visitor);
                const args = testEntry.handlerMock.mock.calls[0];
                expect(args.length).toBe(1);
                expect(args[0]).toBe(testEntry.value);
            });

            test(`handler result is returned (${testEntry.value})`, () => {
                const result = visitString(testEntry.value).with(visitor);
                expect(result).toBe(testEntry.result);
            });
        }
    });

    describe("With null and undefined", () => {
        interface TestEntry {
            value: RGB | null | undefined,
            handlerMock: jest.Mock<string>,
            result: string
        }

        const TEST_ENTRIES: TestEntry[] = [
            {
                value: RGB.R,
                handlerMock: handlerMockR,
                result: "Red!"
            },
            {
                value: RGB.G,
                handlerMock: handlerMockG,
                result: "Green!"
            },
            {
                value: RGB.B,
                handlerMock: handlerMockB,
                result: "Blue!"
            },
            {
                value: null,
                handlerMock: handlerMockNull,
                result: "Null!"
            },
            {
                value: undefined,
                handlerMock: handlerMockUndefined,
                result: "Undefined!"
            }
        ]

        const visitor = {
            [RGB.R]: handlerMockR,
            [RGB.G]: handlerMockG,
            [RGB.B]: handlerMockB,
            handleNull: handlerMockNull,
            handleUndefined: handlerMockUndefined
        };

        for (const testEntry of TEST_ENTRIES) {
            test(`Correct visitor method is called (${testEntry.value})`, () => {
                visitString(testEntry.value).with(visitor);

                for (const handlerMock of ALL_HANDLER_MOCKS) {
                    if (handlerMock === testEntry.handlerMock) {
                        expect(handlerMock.mock.calls.length).toBe(1);
                    } else {
                        expect(handlerMock.mock.calls.length).toBe(0);
                    }
                }
            });

            test(`Value is passed to handler (${testEntry.value})`, () => {
                visitString(testEntry.value).with(visitor);
                const args = testEntry.handlerMock.mock.calls[0];
                expect(args.length).toBe(1);
                expect(args[0]).toBe(testEntry.value);
            });

            test(`handler result is returned (${testEntry.value})`, () => {
                const result = visitString(testEntry.value).with(visitor);
                expect(result).toBe(testEntry.result);
            });
        }
    });
});