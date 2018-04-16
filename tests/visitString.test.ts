/**
 * Unit tests for {@link visitString}.
 */
import {
    visitString,
    StringVisitor,
    StringVisitorWithNull,
    StringVisitorWithUndefined,
    StringVisitorWithNullAndUndefined
} from "../src";

describe("visitString", () => {
    /**
     * A single "entry" for running a test of a specific input value.
     */
    interface TestEntry {
        /**
         * The input value to test with the string visitor.
         * NOTE: Using plain "string" as the type for simplicity (rather than a string literal union or string enum)
         *       because these unit tests are for run-time behavior, and the exact type of the string-like value
         *       is irrelevant at run-time.
         */
        value: string | null | undefined;
        /**
         * True if {@link #value} is an "unexpected" value for the visitor.
         */
        isUnexpected?: boolean;
        /**
         * Reference to the handler mock that is expected to be called by the visitor
         * when processing {@link #value}.
         */
        handlerMock: jest.Mock<string>;
        /**
         * The value expected to be returned by the visitor when processing {@link #value}.
         */
        result: string;
    }

    const handlerMockR = jest.fn((value: "r") => {
        return "Red!";
    });

    const handlerMockG = jest.fn((value: "g") => {
        return "Green!";
    });

    const handlerMockB = jest.fn((value: "b") => {
        return "Blue!";
    });

    const handlerMockNull = jest.fn((value: null) => {
        return "Null!";
    });

    const handlerMockUndefined = jest.fn((value: undefined) => {
        return "Undefined!";
    });

    const handlerMockUnexpected = jest.fn(
        (value: string | null | undefined) => {
            return `Unexpected! (${value})`;
        }
    );

    const ALL_HANDLER_MOCKS = [
        handlerMockR,
        handlerMockG,
        handlerMockB,
        handlerMockNull,
        handlerMockUndefined,
        handlerMockUnexpected
    ];

    beforeEach(() => {
        // Clear all handler mocks for a fresh start before each test
        for (const handlerMock of ALL_HANDLER_MOCKS) {
            handlerMock.mockClear();
        }
    });

    /**
     * Runs all unt tests for a particular "visitor" implementation.
     * @param visitorWithoutUnexpectedHandler - A "visitor" implementation, WITHOUT a "handleUnexpected"
     *        property. This method will take core of also testing the same visitor, but with "handleUnexpected"
     *        added to it.
     * @param testEntries - All test "entries" to execute with the provided visitor.
     */
    function runTests(
        visitorWithoutUnexpectedHandler:
            | StringVisitor<string, string>
            | StringVisitorWithNull<string, string>
            | StringVisitorWithUndefined<string, string>
            | StringVisitorWithNullAndUndefined<string, string>,
        testEntries: TestEntry[]
    ): void {
        const visitors = [
            visitorWithoutUnexpectedHandler,
            {
                ...visitorWithoutUnexpectedHandler,
                handleUnexpected: handlerMockUnexpected
            }
        ];

        describe("visitString().with()", () => {
            for (const visitor of visitors) {
                describe(`${
                    visitor.handleUnexpected ? "With" : "Without"
                } handleUnexpected`, () => {
                    for (const testEntry of testEntries) {
                        describe(`value == ${testEntry.value}`, () => {
                            if (
                                visitor.handleUnexpected ||
                                !testEntry.isUnexpected
                            ) {
                                test(`Correct visitor method is called`, () => {
                                    visitString(testEntry.value).with(
                                        visitor as StringVisitorWithNullAndUndefined<
                                            string,
                                            string
                                        >
                                    );

                                    for (const handlerMock of ALL_HANDLER_MOCKS) {
                                        if (
                                            handlerMock ===
                                            testEntry.handlerMock
                                        ) {
                                            expect(
                                                handlerMock.mock.calls.length
                                            ).toBe(1);
                                        } else {
                                            expect(
                                                handlerMock.mock.calls.length
                                            ).toBe(0);
                                        }
                                    }
                                });

                                test(`Value is passed to handler`, () => {
                                    visitString(testEntry.value).with(
                                        visitor as StringVisitorWithNullAndUndefined<
                                            string,
                                            string
                                        >
                                    );
                                    expect(
                                        testEntry.handlerMock.mock.calls.length
                                    ).toBe(1);
                                    const args =
                                        testEntry.handlerMock.mock.calls[0];
                                    expect(args.length).toBe(1);
                                    expect(args[0]).toBe(testEntry.value);
                                });

                                test(`Handler result is returned`, () => {
                                    const result = visitString(
                                        testEntry.value
                                    ).with(
                                        visitor as StringVisitorWithNullAndUndefined<
                                            string,
                                            string
                                        >
                                    );
                                    expect(result).toBe(testEntry.result);
                                });
                            } else {
                                test(`Unhandled unexpected value throws error`, () => {
                                    expect(() => {
                                        visitString(testEntry.value).with(
                                            visitor as StringVisitorWithNullAndUndefined<
                                                string,
                                                string
                                            >
                                        );
                                    }).toThrowError(
                                        `Unexpected value: ${testEntry.value}`
                                    );
                                });

                                test(`No visitor method is called for unhandled unexpected value`, () => {
                                    try {
                                        visitString(testEntry.value).with(
                                            visitor as StringVisitorWithNullAndUndefined<
                                                string,
                                                string
                                            >
                                        );
                                    } catch (error) {
                                        // ignore error
                                    }

                                    for (const handlerMock of ALL_HANDLER_MOCKS) {
                                        expect(
                                            handlerMock.mock.calls.length
                                        ).toBe(0);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

        describe("visitString.makeFunctionFor().with()", () => {
            for (const visitor of visitors) {
                describe(`${
                    visitor.handleUnexpected ? "With" : "Without"
                } handleUnexpected`, () => {
                    const visitorFunction = visitString
                        .makeFunctionFor<string>()
                        .with(visitor as StringVisitorWithNullAndUndefined<
                            string,
                            string
                        >);

                    for (const testEntry of testEntries) {
                        describe(`value == ${testEntry.value}`, () => {
                            if (
                                visitor.handleUnexpected ||
                                !testEntry.isUnexpected
                            ) {
                                test(`Correct visitor method is called`, () => {
                                    visitorFunction(testEntry.value);

                                    for (const handlerMock of ALL_HANDLER_MOCKS) {
                                        if (
                                            handlerMock ===
                                            testEntry.handlerMock
                                        ) {
                                            expect(
                                                handlerMock.mock.calls.length
                                            ).toBe(1);
                                        } else {
                                            expect(
                                                handlerMock.mock.calls.length
                                            ).toBe(0);
                                        }
                                    }
                                });

                                test(`Value is passed to handler`, () => {
                                    visitorFunction(testEntry.value);
                                    expect(
                                        testEntry.handlerMock.mock.calls.length
                                    ).toBe(1);
                                    const args =
                                        testEntry.handlerMock.mock.calls[0];
                                    expect(args.length).toBe(1);
                                    expect(args[0]).toBe(testEntry.value);
                                });

                                test(`Handler result is returned`, () => {
                                    const result = visitorFunction(
                                        testEntry.value
                                    );
                                    expect(result).toBe(testEntry.result);
                                });
                            } else {
                                test(`Unhandled unexpected value throws error`, () => {
                                    expect(() => {
                                        visitorFunction(testEntry.value);
                                    }).toThrowError(
                                        `Unexpected value: ${testEntry.value}`
                                    );
                                });

                                test(`No visitor method is called for unhandled unexpected value`, () => {
                                    try {
                                        visitorFunction(testEntry.value);
                                    } catch (error) {
                                        // ignore error
                                    }

                                    for (const handlerMock of ALL_HANDLER_MOCKS) {
                                        expect(
                                            handlerMock.mock.calls.length
                                        ).toBe(0);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    describe("Without null/undefined", () => {
        runTests(
            {
                r: handlerMockR,
                g: handlerMockG,
                b: handlerMockB
            },
            [
                {
                    value: "r",
                    handlerMock: handlerMockR,
                    result: "Red!"
                },
                {
                    value: "g",
                    handlerMock: handlerMockG,
                    result: "Green!"
                },
                {
                    value: "b",
                    handlerMock: handlerMockB,
                    result: "Blue!"
                },
                {
                    isUnexpected: true,
                    value: null,
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (null)"
                },
                {
                    isUnexpected: true,
                    value: undefined,
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (undefined)"
                },
                {
                    isUnexpected: true,
                    value: "unexpected!",
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (unexpected!)"
                },
                {
                    isUnexpected: true,
                    // matches a standard property name on Object.prototype
                    value: "toString",
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (toString)"
                }
            ]
        );
    });

    describe("With null", () => {
        runTests(
            {
                r: handlerMockR,
                g: handlerMockG,
                b: handlerMockB,
                handleNull: handlerMockNull
            },
            [
                {
                    value: "r",
                    handlerMock: handlerMockR,
                    result: "Red!"
                },
                {
                    value: "g",
                    handlerMock: handlerMockG,
                    result: "Green!"
                },
                {
                    value: "b",
                    handlerMock: handlerMockB,
                    result: "Blue!"
                },
                {
                    value: null,
                    handlerMock: handlerMockNull,
                    result: "Null!"
                },
                {
                    isUnexpected: true,
                    value: undefined,
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (undefined)"
                },
                {
                    isUnexpected: true,
                    value: "unexpected!",
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (unexpected!)"
                },
                {
                    isUnexpected: true,
                    // matches a standard property name on Object.prototype
                    value: "toString",
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (toString)"
                }
            ]
        );
    });

    describe("With undefined", () => {
        runTests(
            {
                r: handlerMockR,
                g: handlerMockG,
                b: handlerMockB,
                handleUndefined: handlerMockUndefined
            },
            [
                {
                    value: "r",
                    handlerMock: handlerMockR,
                    result: "Red!"
                },
                {
                    value: "g",
                    handlerMock: handlerMockG,
                    result: "Green!"
                },
                {
                    value: "b",
                    handlerMock: handlerMockB,
                    result: "Blue!"
                },
                {
                    value: undefined,
                    handlerMock: handlerMockUndefined,
                    result: "Undefined!"
                },
                {
                    isUnexpected: true,
                    value: null,
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (null)"
                },
                {
                    isUnexpected: true,
                    value: "unexpected!",
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (unexpected!)"
                },
                {
                    isUnexpected: true,
                    // matches a standard property name on Object.prototype
                    value: "toString",
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (toString)"
                }
            ]
        );
    });

    describe("With null and undefined", () => {
        runTests(
            {
                r: handlerMockR,
                g: handlerMockG,
                b: handlerMockB,
                handleNull: handlerMockNull,
                handleUndefined: handlerMockUndefined
            },
            [
                {
                    value: "r",
                    handlerMock: handlerMockR,
                    result: "Red!"
                },
                {
                    value: "g",
                    handlerMock: handlerMockG,
                    result: "Green!"
                },
                {
                    value: "b",
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
                },
                {
                    isUnexpected: true,
                    value: "unexpected!",
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (unexpected!)"
                },
                {
                    isUnexpected: true,
                    // matches a standard property name on Object.prototype
                    value: "toString",
                    handlerMock: handlerMockUnexpected,
                    result: "Unexpected! (toString)"
                }
            ]
        );
    });
});
