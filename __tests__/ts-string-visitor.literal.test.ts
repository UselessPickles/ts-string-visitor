import visitString from "../src";

describe("Visit String Literal", () => {
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
            }
        ];

        const visitor = {
            ["r"]: handlerMockR,
            ["g"]: handlerMockG,
            ["b"]: handlerMockB
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

        // These tests don't verify any runtime behavior.
        // They only test a variety of usage patterns to ensure they compile.
        describe("Compile Tests", () => {
            test("Inferred return type", () => {
                const result = visitString(TEST_ENTRIES[0].value).with({
                    "r": () => {
                        return 1;
                    },
                    "g": () => {
                        return 2;
                    },
                    "b": () => {
                        return 3;
                    }
                });

                // tslint:disable-next-line:no-unused-variable
                const test: number = result;
            });

            test("Explicit return type", () => {
                const result = visitString(TEST_ENTRIES[0].value).with<number>({
                    "r": () => {
                        return 1;
                    },
                    "g": () => {
                        return 2;
                    },
                    "b": () => {
                        return 3;
                    }
                });

                // tslint:disable-next-line:no-unused-variable
                const test: number = result;
            });

            test("Inferred param type", () => {
                visitString(TEST_ENTRIES[0].value).with({
                    "r": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "r" = value;
                    },
                    "g": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "g" = value;
                    },
                    "b": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "b" = value;
                    }
                });
            });

            test("Explicit param type (broader than actual)", () => {
                visitString(TEST_ENTRIES[0].value).with({
                    "r": (value: RGB) => {
                        // empty
                    },
                    "g": (value: RGB) => {
                        // empty
                    },
                    "b": (value: RGB) => {
                        // empty
                    }
                });
            });
        });
    });

    describe("With null", () => {
        interface TestEntry {
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
            }
        ];

        const visitor = {
            ["r"]: handlerMockR,
            ["g"]: handlerMockG,
            ["b"]: handlerMockB,
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

        // These tests don't verify any runtime behavior.
        // They only test a variety of usage patterns to ensure they compile.
        describe("Compile Tests", () => {
            test("Inferred return type", () => {
                const result = visitString(TEST_ENTRIES[0].value).with({
                    "r": () => {
                        return 1;
                    },
                    "g": () => {
                        return 2;
                    },
                    "b": () => {
                        return 3;
                    },
                    handleNull: () => {
                        return 0;
                    }
                });

                // tslint:disable-next-line:no-unused-variable
                const test: number = result;
            });

            test("Explicit return type", () => {
                const result = visitString(TEST_ENTRIES[0].value).with<number>({
                    "r": () => {
                        return 1;
                    },
                    "g": () => {
                        return 2;
                    },
                    "b": () => {
                        return 3;
                    },
                    handleNull: () => {
                        return 0;
                    }
                });

                // tslint:disable-next-line:no-unused-variable
                const test: number = result;
            });

            test("Inferred param type", () => {
                visitString(TEST_ENTRIES[0].value).with({
                    "r": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "r" = value;
                    },
                    "g": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "g" = value;
                    },
                    "b": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "b" = value;
                    },
                    handleNull: (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: null = value;
                    }
                });
            });

            test("Explicit param type (broader than actual)", () => {
                visitString(TEST_ENTRIES[0].value).with({
                    "r": (value: RGB) => {
                        // empty
                    },
                    "g": (value: RGB) => {
                        // empty
                    },
                    "b": (value: RGB) => {
                        // empty
                    },
                    handleNull: (value: RGB | null) => {
                        // empty
                    }
                });
            });
        });
    });

    describe("With undefined", () => {
        interface TestEntry {
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
            }
        ];

        const visitor = {
            ["r"]: handlerMockR,
            ["g"]: handlerMockG,
            ["b"]: handlerMockB,
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

        // These tests don't verify any runtime behavior.
        // They only test a variety of usage patterns to ensure they compile.
        describe("Compile Tests", () => {
            test("Inferred return type", () => {
                const result = visitString(TEST_ENTRIES[0].value).with({
                    "r": () => {
                        return 1;
                    },
                    "g": () => {
                        return 2;
                    },
                    "b": () => {
                        return 3;
                    },
                    handleUndefined: () => {
                        return 0;
                    }
                });

                // tslint:disable-next-line:no-unused-variable
                const test: number = result;
            });

            test("Explicit return type", () => {
                const result = visitString(TEST_ENTRIES[0].value).with<number>({
                    "r": () => {
                        return 1;
                    },
                    "g": () => {
                        return 2;
                    },
                    "b": () => {
                        return 3;
                    },
                    handleUndefined: () => {
                        return 0;
                    }
                });

                // tslint:disable-next-line:no-unused-variable
                const test: number = result;
            });

            test("Inferred param type", () => {
                visitString(TEST_ENTRIES[0].value).with({
                    "r": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "r" = value;
                    },
                    "g": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "g" = value;
                    },
                    "b": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "b" = value;
                    },
                    handleUndefined: (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: undefined = value;
                    }
                });
            });

            test("Explicit param type (broader than actual)", () => {
                visitString(TEST_ENTRIES[0].value).with({
                    "r": (value: RGB) => {
                        // empty
                    },
                    "g": (value: RGB) => {
                        // empty
                    },
                    "b": (value: RGB) => {
                        // empty
                    },
                    handleUndefined: (value: RGB | undefined) => {
                        // empty
                    }
                });
            });
        });
    });

    describe("With null and undefined", () => {
        interface TestEntry {
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
            }
        ];

        const visitor = {
            ["r"]: handlerMockR,
            ["g"]: handlerMockG,
            ["b"]: handlerMockB,
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

        // These tests don't verify any runtime behavior.
        // They only test a variety of usage patterns to ensure they compile.
        describe("Compile Tests", () => {
            test("Inferred return type", () => {
                const result = visitString(TEST_ENTRIES[0].value).with({
                    "r": () => {
                        return 1;
                    },
                    "g": () => {
                        return 2;
                    },
                    "b": () => {
                        return 3;
                    },
                    handleNull: () => {
                        return 0;
                    },
                    handleUndefined: () => {
                        return 0;
                    }
                });

                // tslint:disable-next-line:no-unused-variable
                const test: number = result;
            });

            test("Explicit return type", () => {
                const result = visitString(TEST_ENTRIES[0].value).with<number>({
                    "r": () => {
                        return 1;
                    },
                    "g": () => {
                        return 2;
                    },
                    "b": () => {
                        return 3;
                    },
                    handleNull: () => {
                        return 0;
                    },
                    handleUndefined: () => {
                        return 0;
                    }
                });

                // tslint:disable-next-line:no-unused-variable
                const test: number = result;
            });

            test("Inferred param type", () => {
                visitString(TEST_ENTRIES[0].value).with({
                    "r": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "r" = value;
                    },
                    "g": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "g" = value;
                    },
                    "b": (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: "b" = value;
                    },
                    handleNull: (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: null = value;
                    },
                    handleUndefined: (value) => {
                        // tslint:disable-next-line:no-unused-variable
                        const test: undefined = value;
                    }
                });
            });

            test("Explicit param type (broader than actual)", () => {
                visitString(TEST_ENTRIES[0].value).with({
                    "r": (value: RGB) => {
                        // empty
                    },
                    "g": (value: RGB) => {
                        // empty
                    },
                    "b": (value: RGB) => {
                        // empty
                    },
                    handleNull: (value: RGB | null) => {
                        // empty
                    },
                    handleUndefined: (value: RGB | undefined) => {
                        // empty
                    }
                });
            });
        });
    });
});
