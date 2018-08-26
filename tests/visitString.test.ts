import {
    visitString,
    StringVisitor,
    StringVisitorWithNull,
    StringVisitorWithUndefined,
    StringVisitorWithNullAndUndefined,
    UnhandledEntry
} from "../src";

describe("visitString", () => {
    type RGB = "r" | "g" | "b";

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

    describe("Without null/undefined", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB;
            handlerMock: jest.Mock<string>;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
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
                value: (null as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (null)"
            },
            {
                isUnexpected: true,
                value: (undefined as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (undefined)"
            },
            {
                isUnexpected: true,
                value: ("unexpected!" as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (unexpected!)"
            },
            {
                isUnexpected: true,
                // matches a standard property name on Object.prototype
                value: ("toString" as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (toString)"
            }
        ];

        const visitors: StringVisitor<RGB, string>[] = [
            {
                ["r"]: handlerMockR,
                ["g"]: handlerMockG,
                ["b"]: handlerMockB
            },
            {
                ["r"]: handlerMockR,
                ["g"]: handlerMockG,
                ["b"]: handlerMockB,
                handleUnexpected: handlerMockUnexpected
            },
            {
                ["r"]: visitString.unhandled,
                ["g"]: visitString.unhandled,
                ["b"]: visitString.unhandled,
                handleUnexpected: visitString.unhandled
            }
        ];

        for (const visitor of visitors) {
            for (const testEntry of TEST_ENTRIES) {
                if (visitor["r"] === UnhandledEntry.token) {
                    test(`Unhandled entry throws error (${
                        testEntry.value
                    }`, () => {
                        expect(() => {
                            visitString(testEntry.value).with(visitor);
                        }).toThrowError(`Unhandled value: ${testEntry.value}`);
                    });
                } else if (
                    visitor.handleUnexpected ||
                    !testEntry.isUnexpected
                ) {
                    test(`Correct visitor method is called (${
                        testEntry.value
                    })`, () => {
                        visitString(testEntry.value).with(visitor);

                        for (const handlerMock of ALL_HANDLER_MOCKS) {
                            if (handlerMock === testEntry.handlerMock) {
                                expect(handlerMock.mock.calls.length).toBe(1);
                            } else {
                                expect(handlerMock.mock.calls.length).toBe(0);
                            }
                        }
                    });

                    test(`Value is passed to handler (${
                        testEntry.value
                    })`, () => {
                        visitString(testEntry.value).with(visitor);
                        expect(testEntry.handlerMock.mock.calls.length).toBe(1);
                        const args = testEntry.handlerMock.mock.calls[0];
                        expect(args.length).toBe(1);
                        expect(args[0]).toBe(testEntry.value);
                    });

                    test(`Handler result is returned (${
                        testEntry.value
                    })`, () => {
                        const result = visitString(testEntry.value).with(
                            visitor
                        );
                        expect(result).toBe(testEntry.result);
                    });
                } else {
                    test(`Unhandled unexpected value throws error (${
                        testEntry.value
                    })`, () => {
                        expect(() => {
                            visitString(testEntry.value).with(visitor);
                        }).toThrowError(`Unexpected value: ${testEntry.value}`);
                    });

                    test(`No visitor method is called for unhandled unexpected value(${
                        testEntry.value
                    })`, () => {
                        try {
                            visitString(testEntry.value).with(visitor);
                        } catch (error) {
                            // ignore error
                        }

                        for (const handlerMock of ALL_HANDLER_MOCKS) {
                            expect(handlerMock.mock.calls.length).toBe(0);
                        }
                    });
                }
            }
        }
    });

    describe("With null", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB | null;
            handlerMock: jest.Mock<string>;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
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
                value: (undefined as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (undefined)"
            },
            {
                isUnexpected: true,
                value: ("unexpected!" as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (unexpected!)"
            },
            {
                isUnexpected: true,
                // matches a standard property name on Object.prototype
                value: ("toString" as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (toString)"
            }
        ];

        const visitors: StringVisitorWithNull<RGB, string>[] = [
            {
                ["r"]: handlerMockR,
                ["g"]: handlerMockG,
                ["b"]: handlerMockB,
                handleNull: handlerMockNull
            },
            {
                ["r"]: handlerMockR,
                ["g"]: handlerMockG,
                ["b"]: handlerMockB,
                handleNull: handlerMockNull,
                handleUnexpected: handlerMockUnexpected
            },
            {
                ["r"]: visitString.unhandled,
                ["g"]: visitString.unhandled,
                ["b"]: visitString.unhandled,
                handleNull: visitString.unhandled,
                handleUnexpected: visitString.unhandled
            }
        ];

        for (const visitor of visitors) {
            for (const testEntry of TEST_ENTRIES) {
                if (visitor["r"] === UnhandledEntry.token) {
                    test(`Unhandled entry throws error (${
                        testEntry.value
                    }`, () => {
                        expect(() => {
                            visitString(testEntry.value).with(visitor);
                        }).toThrowError(`Unhandled value: ${testEntry.value}`);
                    });
                } else if (
                    visitor.handleUnexpected ||
                    !testEntry.isUnexpected
                ) {
                    test(`Correct visitor method is called (${
                        testEntry.value
                    })`, () => {
                        visitString(testEntry.value).with(visitor);

                        for (const handlerMock of ALL_HANDLER_MOCKS) {
                            if (handlerMock === testEntry.handlerMock) {
                                expect(handlerMock.mock.calls.length).toBe(1);
                            } else {
                                expect(handlerMock.mock.calls.length).toBe(0);
                            }
                        }
                    });

                    test(`Value is passed to handler (${
                        testEntry.value
                    })`, () => {
                        visitString(testEntry.value).with(visitor);
                        expect(testEntry.handlerMock.mock.calls.length).toBe(1);
                        const args = testEntry.handlerMock.mock.calls[0];
                        expect(args.length).toBe(1);
                        expect(args[0]).toBe(testEntry.value);
                    });

                    test(`Handler result is returned (${
                        testEntry.value
                    })`, () => {
                        const result = visitString(testEntry.value).with(
                            visitor
                        );
                        expect(result).toBe(testEntry.result);
                    });
                } else {
                    test(`unhandled unexpected value throws error (${
                        testEntry.value
                    })`, () => {
                        expect(() => {
                            visitString(testEntry.value).with(visitor);
                        }).toThrowError(`Unexpected value: ${testEntry.value}`);
                    });

                    test(`No visitor method is called for unhandled unexpected value(${
                        testEntry.value
                    })`, () => {
                        try {
                            visitString(testEntry.value).with(visitor);
                        } catch (error) {
                            // ignore error
                        }

                        for (const handlerMock of ALL_HANDLER_MOCKS) {
                            expect(handlerMock.mock.calls.length).toBe(0);
                        }
                    });
                }
            }
        }
    });

    describe("With undefined", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB | undefined;
            handlerMock: jest.Mock<string>;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
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
                value: (null as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (null)"
            },
            {
                isUnexpected: true,
                value: ("unexpected!" as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (unexpected!)"
            },
            {
                isUnexpected: true,
                // matches a standard property name on Object.prototype
                value: ("toString" as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (toString)"
            }
        ];

        const visitors: StringVisitorWithUndefined<RGB, string>[] = [
            {
                ["r"]: handlerMockR,
                ["g"]: handlerMockG,
                ["b"]: handlerMockB,
                handleUndefined: handlerMockUndefined
            },
            {
                ["r"]: handlerMockR,
                ["g"]: handlerMockG,
                ["b"]: handlerMockB,
                handleUndefined: handlerMockUndefined,
                handleUnexpected: handlerMockUnexpected
            },
            {
                ["r"]: visitString.unhandled,
                ["g"]: visitString.unhandled,
                ["b"]: visitString.unhandled,
                handleUndefined: visitString.unhandled,
                handleUnexpected: visitString.unhandled
            }
        ];

        for (const visitor of visitors) {
            for (const testEntry of TEST_ENTRIES) {
                if (visitor["r"] === UnhandledEntry.token) {
                    test(`Unhandled entry throws error (${
                        testEntry.value
                    }`, () => {
                        expect(() => {
                            visitString(testEntry.value).with(visitor);
                        }).toThrowError(`Unhandled value: ${testEntry.value}`);
                    });
                } else if (
                    visitor.handleUnexpected ||
                    !testEntry.isUnexpected
                ) {
                    test(`Correct visitor method is called (${
                        testEntry.value
                    })`, () => {
                        visitString(testEntry.value).with(visitor);

                        for (const handlerMock of ALL_HANDLER_MOCKS) {
                            if (handlerMock === testEntry.handlerMock) {
                                expect(handlerMock.mock.calls.length).toBe(1);
                            } else {
                                expect(handlerMock.mock.calls.length).toBe(0);
                            }
                        }
                    });

                    test(`Value is passed to handler (${
                        testEntry.value
                    })`, () => {
                        visitString(testEntry.value).with(visitor);
                        expect(testEntry.handlerMock.mock.calls.length).toBe(1);
                        const args = testEntry.handlerMock.mock.calls[0];
                        expect(args.length).toBe(1);
                        expect(args[0]).toBe(testEntry.value);
                    });

                    test(`Handler result is returned (${
                        testEntry.value
                    })`, () => {
                        const result = visitString(testEntry.value).with(
                            visitor
                        );
                        expect(result).toBe(testEntry.result);
                    });
                } else {
                    test(`Unhandled unexpected value throws error (${
                        testEntry.value
                    })`, () => {
                        expect(() => {
                            visitString(testEntry.value).with(visitor);
                        }).toThrowError(`Unexpected value: ${testEntry.value}`);
                    });

                    test(`No visitor method is called for unhandled unexpected value(${
                        testEntry.value
                    })`, () => {
                        try {
                            visitString(testEntry.value).with(visitor);
                        } catch (error) {
                            // ignore error
                        }

                        for (const handlerMock of ALL_HANDLER_MOCKS) {
                            expect(handlerMock.mock.calls.length).toBe(0);
                        }
                    });
                }
            }
        }
    });

    describe("With null and undefined", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB | null | undefined;
            handlerMock: jest.Mock<string>;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
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
                value: ("unexpected!" as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (unexpected!)"
            },
            {
                isUnexpected: true,
                // matches a standard property name on Object.prototype
                value: ("toString" as any) as RGB,
                handlerMock: handlerMockUnexpected,
                result: "Unexpected! (toString)"
            }
        ];

        const visitors: StringVisitorWithNullAndUndefined<RGB, string>[] = [
            {
                ["r"]: handlerMockR,
                ["g"]: handlerMockG,
                ["b"]: handlerMockB,
                handleNull: handlerMockNull,
                handleUndefined: handlerMockUndefined
            },
            {
                ["r"]: handlerMockR,
                ["g"]: handlerMockG,
                ["b"]: handlerMockB,
                handleNull: handlerMockNull,
                handleUndefined: handlerMockUndefined,
                handleUnexpected: handlerMockUnexpected
            },
            {
                ["r"]: visitString.unhandled,
                ["g"]: visitString.unhandled,
                ["b"]: visitString.unhandled,
                handleNull: visitString.unhandled,
                handleUndefined: visitString.unhandled,
                handleUnexpected: visitString.unhandled
            }
        ];

        for (const visitor of visitors) {
            for (const testEntry of TEST_ENTRIES) {
                if (visitor["r"] === UnhandledEntry.token) {
                    test(`Unhandled entry throws error (${
                        testEntry.value
                    }`, () => {
                        expect(() => {
                            visitString(testEntry.value).with(visitor);
                        }).toThrowError(`Unhandled value: ${testEntry.value}`);
                    });
                } else if (
                    visitor.handleUnexpected ||
                    !testEntry.isUnexpected
                ) {
                    test(`Correct visitor method is called (${
                        testEntry.value
                    })`, () => {
                        visitString(testEntry.value).with(visitor);

                        for (const handlerMock of ALL_HANDLER_MOCKS) {
                            if (handlerMock === testEntry.handlerMock) {
                                expect(handlerMock.mock.calls.length).toBe(1);
                            } else {
                                expect(handlerMock.mock.calls.length).toBe(0);
                            }
                        }
                    });

                    test(`Value is passed to handler (${
                        testEntry.value
                    })`, () => {
                        visitString(testEntry.value).with(visitor);
                        expect(testEntry.handlerMock.mock.calls.length).toBe(1);
                        const args = testEntry.handlerMock.mock.calls[0];
                        expect(args.length).toBe(1);
                        expect(args[0]).toBe(testEntry.value);
                    });

                    test(`Handler result is returned (${
                        testEntry.value
                    })`, () => {
                        const result = visitString(testEntry.value).with(
                            visitor
                        );
                        expect(result).toBe(testEntry.result);
                    });
                } else {
                    test(`Unhandled unexpected value throws error (${
                        testEntry.value
                    })`, () => {
                        expect(() => {
                            visitString(testEntry.value).with(visitor);
                        }).toThrowError(`Unexpected value: ${testEntry.value}`);
                    });

                    test(`No visitor method is called for unhandled unexpected value(${
                        testEntry.value
                    })`, () => {
                        try {
                            visitString(testEntry.value).with(visitor);
                        } catch (error) {
                            // ignore error
                        }

                        for (const handlerMock of ALL_HANDLER_MOCKS) {
                            expect(handlerMock.mock.calls.length).toBe(0);
                        }
                    });
                }
            }
        }
    });

    test("unhandled is an alias of UnhandledEntry.token", () => {
        expect(visitString.unhandled).toBe(UnhandledEntry.token);
    });
});
