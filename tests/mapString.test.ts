/**
 * Unit tests for {@link mapString}.
 */
import {
    mapString,
    StringMapper,
    StringMapperWithNull,
    StringMapperWithUndefined,
    StringMapperWithNullAndUndefined
} from "../src";

describe("mapString", () => {
    /**
     * A single "entry" for running a test of a specific input value.
     */
    interface TestEntry {
        /**
         * The input value to test with the string mapper.
         * NOTE: Using plain "string" as the type for simplicity (rather than a string literal union or string enum)
         *       because these unit tests are for run-time behavior, and the exact type of the string-like value
         *       is irrelevant at run-time.
         */
        value: string | null | undefined;
        /**
         * True if {@link #value} is an "unexpected" value for the mapper.
         */
        isUnexpected?: boolean;
        /**
         * The value expected to be returned by the mapper when processing {@link #value}.
         */
        result: string;
    }

    /**
     * Runs all unt tests for a particular "mapper" implementation.
     * @param mapperWithoutUnexpectedHandler - A "mapper" implementation, WITHOUT a "handleUnexpected"
     *        property. This method will take core of also testing the same mapper, but with "handleUnexpected"
     *        added to it.
     * @param testEntries - All test "entries" to execute with the provided mapper.
     */
    function runTests(
        mapperWithoutUnexpectedHandler:
            | StringMapper<string, string>
            | StringMapperWithNull<string, string>
            | StringMapperWithUndefined<string, string>
            | StringMapperWithNullAndUndefined<string, string>,
        testEntries: TestEntry[]
    ): void {
        const mappers = [
            mapperWithoutUnexpectedHandler,
            {
                ...mapperWithoutUnexpectedHandler,
                handleUnexpected: "Unexpected!"
            }
        ];

        describe("mapString().with()", () => {
            for (const mapper of mappers) {
                describe(`${
                    mapper.handleUnexpected ? "With" : "Without"
                } handleUnexpected`, () => {
                    for (const testEntry of testEntries) {
                        describe(`value == ${testEntry.value}`, () => {
                            if (
                                mapper.handleUnexpected ||
                                !testEntry.isUnexpected
                            ) {
                                test(`Correct result is returned`, () => {
                                    const result = mapString(
                                        testEntry.value
                                    ).with(
                                        mapper as StringMapperWithNullAndUndefined<
                                            string,
                                            string
                                        >
                                    );
                                    expect(result).toBe(testEntry.result);
                                });
                            } else {
                                test(`Unhandled unexpected value throws error`, () => {
                                    expect(() => {
                                        mapString(testEntry.value).with(
                                            mapper as StringMapperWithNullAndUndefined<
                                                string,
                                                string
                                            >
                                        );
                                    }).toThrowError(
                                        `Unexpected value: ${testEntry.value}`
                                    );
                                });
                            }
                        });
                    }
                });
            }
        });

        describe("mapString.makeFunctionFor().with()", () => {
            for (const mapper of mappers) {
                const mapperFunction = mapString
                    .makeFunctionFor<string>()
                    .with(mapper as StringMapperWithNullAndUndefined<
                        string,
                        string
                    >);

                describe(`${
                    mapper.handleUnexpected ? "With" : "Without"
                } handleUnexpected`, () => {
                    for (const testEntry of testEntries) {
                        describe(`value == ${testEntry.value}`, () => {
                            if (
                                mapper.handleUnexpected ||
                                !testEntry.isUnexpected
                            ) {
                                test(`Correct result is returned`, () => {
                                    const result = mapperFunction(
                                        testEntry.value
                                    );
                                    expect(result).toBe(testEntry.result);
                                });
                            } else {
                                test(`Unhandled unexpected value throws error`, () => {
                                    expect(() => {
                                        mapperFunction(testEntry.value);
                                    }).toThrowError(
                                        `Unexpected value: ${testEntry.value}`
                                    );
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
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!"
            },
            [
                {
                    value: "r",
                    result: "Red!"
                },
                {
                    value: "g",
                    result: "Green!"
                },
                {
                    value: "b",
                    result: "Blue!"
                },
                {
                    isUnexpected: true,
                    value: null,
                    result: "Unexpected!"
                },
                {
                    isUnexpected: true,
                    value: undefined,
                    result: "Unexpected!"
                },
                {
                    isUnexpected: true,
                    value: "unexpected!",
                    result: "Unexpected!"
                },
                {
                    isUnexpected: true,
                    // matches a standard property name on Object.prototype
                    value: "toString",
                    result: "Unexpected!"
                }
            ]
        );
    });

    describe("With null", () => {
        runTests(
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleNull: "Null!"
            },
            [
                {
                    value: "r",
                    result: "Red!"
                },
                {
                    value: "g",
                    result: "Green!"
                },
                {
                    value: "b",
                    result: "Blue!"
                },
                {
                    value: null,
                    result: "Null!"
                },
                {
                    isUnexpected: true,
                    value: undefined,
                    result: "Unexpected!"
                },
                {
                    isUnexpected: true,
                    value: "unexpected!",
                    result: "Unexpected!"
                },
                {
                    isUnexpected: true,
                    // matches a standard property name on Object.prototype
                    value: "toString",
                    result: "Unexpected!"
                }
            ]
        );
    });

    describe("With undefined", () => {
        runTests(
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleUndefined: "Undefined!"
            },
            [
                {
                    value: "r",
                    result: "Red!"
                },
                {
                    value: "g",
                    result: "Green!"
                },
                {
                    value: "b",
                    result: "Blue!"
                },
                {
                    value: undefined,
                    result: "Undefined!"
                },
                {
                    isUnexpected: true,
                    value: null,
                    result: "Unexpected!"
                },
                {
                    isUnexpected: true,
                    value: "unexpected!",
                    result: "Unexpected!"
                },
                {
                    isUnexpected: true,
                    // matches a standard property name on Object.prototype
                    value: "toString",
                    result: "Unexpected!"
                }
            ]
        );
    });

    describe("With null and undefined", () => {
        runTests(
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleNull: "Null!",
                handleUndefined: "Undefined!"
            },
            [
                {
                    value: "r",
                    result: "Red!"
                },
                {
                    value: "g",
                    result: "Green!"
                },
                {
                    value: "b",
                    result: "Blue!"
                },
                {
                    value: null,
                    result: "Null!"
                },
                {
                    value: undefined,
                    result: "Undefined!"
                },
                {
                    isUnexpected: true,
                    value: "unexpected!",
                    result: "Unexpected!"
                },
                {
                    isUnexpected: true,
                    // matches a standard property name on Object.prototype
                    value: "toString",
                    result: "Unexpected!"
                }
            ]
        );
    });
});
