import {
    mapString,
    StringMapper,
    StringMapperWithNull,
    StringMapperWithUndefined,
    StringMapperWithNullAndUndefined,
    UnhandledEntry
} from "../src";

describe("mapString", () => {
    type RGB = "r" | "g" | "b";

    describe("Without null/undefined", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
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
                value: (null as any) as RGB,
                result: "Unexpected!"
            },
            {
                isUnexpected: true,
                value: (undefined as any) as RGB,
                result: "Unexpected!"
            },
            {
                isUnexpected: true,
                value: ("unexpected!" as any) as RGB,
                result: "Unexpected!"
            },
            {
                isUnexpected: true,
                // matches a standard property name on Object.prototype
                value: ("toString" as any) as RGB,
                result: "Unexpected!"
            }
        ];

        const mappers: StringMapper<RGB, string>[] = [
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!"
            },
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleUnexpected: "Unexpected!"
            },
            {
                ["r"]: mapString.unhandled,
                ["g"]: mapString.unhandled,
                ["b"]: mapString.unhandled,
                handleUnexpected: mapString.unhandled
            }
        ];

        for (const mapper of mappers) {
            for (const testEntry of TEST_ENTRIES) {
                if (mapper["r"] === UnhandledEntry.token) {
                    test(`Unhandled entry throws error (${
                        testEntry.value
                    }`, () => {
                        expect(() => {
                            mapString(testEntry.value).with(mapper);
                        }).toThrowError(`Unhandled value: ${testEntry.value}`);
                    });
                } else if (mapper.handleUnexpected || !testEntry.isUnexpected) {
                    test(`Correct value is returned (${
                        testEntry.value
                    })`, () => {
                        const result = mapString(testEntry.value).with(mapper);

                        expect(result).toBe(testEntry.result);
                    });
                } else {
                    test(`Unhandled unexpected value throws error (${
                        testEntry.value
                    })`, () => {
                        expect(() => {
                            mapString(testEntry.value).with(mapper);
                        }).toThrowError(`Unexpected value: ${testEntry.value}`);
                    });
                }
            }
        }
    });

    describe("With null", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB | null;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
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
                value: (undefined as any) as RGB,
                result: "Unexpected!"
            },
            {
                isUnexpected: true,
                value: ("unexpected!" as any) as RGB,
                result: "Unexpected!"
            },
            {
                isUnexpected: true,
                // matches a standard property name on Object.prototype
                value: ("toString" as any) as RGB,
                result: "Unexpected!"
            }
        ];

        const mappers: StringMapperWithNull<RGB, string>[] = [
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleNull: "Null!"
            },
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleNull: "Null!",
                handleUnexpected: "Unexpected!"
            },
            {
                ["r"]: mapString.unhandled,
                ["g"]: mapString.unhandled,
                ["b"]: mapString.unhandled,
                handleNull: mapString.unhandled,
                handleUnexpected: mapString.unhandled
            }
        ];

        for (const mapper of mappers) {
            for (const testEntry of TEST_ENTRIES) {
                if (mapper["r"] === UnhandledEntry.token) {
                    test(`Unhandled entry throws error (${
                        testEntry.value
                    }`, () => {
                        expect(() => {
                            mapString(testEntry.value).with(mapper);
                        }).toThrowError(`Unhandled value: ${testEntry.value}`);
                    });
                } else if (mapper.handleUnexpected || !testEntry.isUnexpected) {
                    test(`Correct value is returned (${
                        testEntry.value
                    })`, () => {
                        const result = mapString(testEntry.value).with(mapper);

                        expect(result).toBe(testEntry.result);
                    });
                } else {
                    test(`Unhandled unexpected value throws error (${
                        testEntry.value
                    })`, () => {
                        expect(() => {
                            mapString(testEntry.value).with(mapper);
                        }).toThrowError(`Unexpected value: ${testEntry.value}`);
                    });
                }
            }
        }
    });

    describe("With undefined", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB | undefined;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
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
                value: (null as any) as RGB,
                result: "Unexpected!"
            },
            {
                isUnexpected: true,
                value: ("unexpected!" as any) as RGB,
                result: "Unexpected!"
            },
            {
                isUnexpected: true,
                // matches a standard property name on Object.prototype
                value: ("toString" as any) as RGB,
                result: "Unexpected!"
            }
        ];

        const mappers: StringMapperWithUndefined<RGB, string>[] = [
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleUndefined: "Undefined!"
            },
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleUndefined: "Undefined!",
                handleUnexpected: "Unexpected!"
            },
            {
                ["r"]: mapString.unhandled,
                ["g"]: mapString.unhandled,
                ["b"]: mapString.unhandled,
                handleUndefined: mapString.unhandled,
                handleUnexpected: mapString.unhandled
            }
        ];

        for (const mapper of mappers) {
            for (const testEntry of TEST_ENTRIES) {
                if (mapper["r"] === UnhandledEntry.token) {
                    test(`Unhandled entry throws error (${
                        testEntry.value
                    }`, () => {
                        expect(() => {
                            mapString(testEntry.value).with(mapper);
                        }).toThrowError(`Unhandled value: ${testEntry.value}`);
                    });
                } else if (mapper.handleUnexpected || !testEntry.isUnexpected) {
                    test(`Correct value is returned (${
                        testEntry.value
                    })`, () => {
                        const result = mapString(testEntry.value).with(mapper);

                        expect(result).toBe(testEntry.result);
                    });
                } else {
                    test(`Unhandled unexpected value throws error (${
                        testEntry.value
                    })`, () => {
                        expect(() => {
                            mapString(testEntry.value).with(mapper);
                        }).toThrowError(`Unexpected value: ${testEntry.value}`);
                    });
                }
            }
        }
    });

    describe("With null and undefined", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB | null | undefined;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
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
                value: ("unexpected!" as any) as RGB,
                result: "Unexpected!"
            },
            {
                isUnexpected: true,
                // matches a standard property name on Object.prototype
                value: ("toString" as any) as RGB,
                result: "Unexpected!"
            }
        ];

        const mappers: StringMapperWithNullAndUndefined<RGB, string>[] = [
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleNull: "Null!",
                handleUndefined: "Undefined!"
            },
            {
                ["r"]: "Red!",
                ["g"]: "Green!",
                ["b"]: "Blue!",
                handleNull: "Null!",
                handleUndefined: "Undefined!",
                handleUnexpected: "Unexpected!"
            },
            {
                ["r"]: mapString.unhandled,
                ["g"]: mapString.unhandled,
                ["b"]: mapString.unhandled,
                handleNull: mapString.unhandled,
                handleUndefined: mapString.unhandled,
                handleUnexpected: mapString.unhandled
            }
        ];

        for (const mapper of mappers) {
            for (const testEntry of TEST_ENTRIES) {
                if (mapper["r"] === UnhandledEntry.token) {
                    test(`Unhandled entry throws error (${
                        testEntry.value
                    }`, () => {
                        expect(() => {
                            mapString(testEntry.value).with(mapper);
                        }).toThrowError(`Unhandled value: ${testEntry.value}`);
                    });
                } else if (mapper.handleUnexpected || !testEntry.isUnexpected) {
                    test(`Correct value is returned (${
                        testEntry.value
                    })`, () => {
                        const result = mapString(testEntry.value).with(mapper);

                        expect(result).toBe(testEntry.result);
                    });
                } else {
                    test(`Unhandled unexpected value throws error (${
                        testEntry.value
                    })`, () => {
                        expect(() => {
                            mapString(testEntry.value).with(mapper);
                        }).toThrowError(`Unexpected value: ${testEntry.value}`);
                    });
                }
            }
        }
    });

    test("unhandled is an alias of UnhandledEntry.token", () => {
        expect(mapString.unhandled).toBe(UnhandledEntry.token);
    });
});
