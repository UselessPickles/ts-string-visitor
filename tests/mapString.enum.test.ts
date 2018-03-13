import {
    mapString,
    StringMapper,
    StringMapperWithNull,
    StringMapperWithUndefined,
    StringMapperWithNullAndUndefined
} from "../src";

describe("Map String Enum", () => {
    enum RGB {
        R = "r",
        G = "g",
        B = "b"
    }

    describe("Without null/undefined", () => {
        interface TestEntry {
            isUnexpected?: boolean;
            value: RGB;
            result: string;
        }

        const TEST_ENTRIES: TestEntry[] = [
            {
                value: RGB.R,
                result: "Red!"
            },
            {
                value: RGB.G,
                result: "Green!"
            },
            {
                value: RGB.B,
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
                [RGB.R]: "Red!",
                [RGB.G]: "Green!",
                [RGB.B]: "Blue!"
            },
            {
                [RGB.R]: "Red!",
                [RGB.G]: "Green!",
                [RGB.B]: "Blue!",
                handleUnexpected: "Unexpected!"
            }
        ];

        for (const mapper of mappers) {
            for (const testEntry of TEST_ENTRIES) {
                if (mapper.handleUnexpected || !testEntry.isUnexpected) {
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
                value: RGB.R,
                result: "Red!"
            },
            {
                value: RGB.G,
                result: "Green!"
            },
            {
                value: RGB.B,
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
                [RGB.R]: "Red!",
                [RGB.G]: "Green!",
                [RGB.B]: "Blue!",
                handleNull: "Null!"
            },
            {
                [RGB.R]: "Red!",
                [RGB.G]: "Green!",
                [RGB.B]: "Blue!",
                handleNull: "Null!",
                handleUnexpected: "Unexpected!"
            }
        ];

        for (const mapper of mappers) {
            for (const testEntry of TEST_ENTRIES) {
                if (mapper.handleUnexpected || !testEntry.isUnexpected) {
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
                value: RGB.R,
                result: "Red!"
            },
            {
                value: RGB.G,
                result: "Green!"
            },
            {
                value: RGB.B,
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
                [RGB.R]: "Red!",
                [RGB.G]: "Green!",
                [RGB.B]: "Blue!",
                handleUndefined: "Undefined!"
            },
            {
                [RGB.R]: "Red!",
                [RGB.G]: "Green!",
                [RGB.B]: "Blue!",
                handleUndefined: "Undefined!",
                handleUnexpected: "Unexpected!"
            }
        ];

        for (const mapper of mappers) {
            for (const testEntry of TEST_ENTRIES) {
                if (mapper.handleUnexpected || !testEntry.isUnexpected) {
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
                value: RGB.R,
                result: "Red!"
            },
            {
                value: RGB.G,
                result: "Green!"
            },
            {
                value: RGB.B,
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
                [RGB.R]: "Red!",
                [RGB.G]: "Green!",
                [RGB.B]: "Blue!",
                handleNull: "Null!",
                handleUndefined: "Undefined!"
            },
            {
                [RGB.R]: "Red!",
                [RGB.G]: "Green!",
                [RGB.B]: "Blue!",
                handleNull: "Null!",
                handleUndefined: "Undefined!",
                handleUnexpected: "Unexpected!"
            }
        ];

        for (const mapper of mappers) {
            for (const testEntry of TEST_ENTRIES) {
                if (mapper.handleUnexpected || !testEntry.isUnexpected) {
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
});
