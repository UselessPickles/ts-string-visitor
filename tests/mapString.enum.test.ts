import { mapString } from "../src";

describe("Map String Enum", () => {
    enum RGB {
        R = "r",
        G = "g",
        B = "b"
    }

    describe("Without null/undefined", () => {
        interface TestEntry {
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
            }
        ];

        const mapper = {
            [RGB.R]: "Red!",
            [RGB.G]: "Green!",
            [RGB.B]: "Blue!"
        };

        for (const testEntry of TEST_ENTRIES) {
            test(`Correct value is returned (${testEntry.value})`, () => {
                const result = mapString(testEntry.value).with(mapper);

                expect(result).toBe(testEntry.result);
            });
        }
    });

    describe("With null", () => {
        interface TestEntry {
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
            }
        ];

        const mapper = {
            [RGB.R]: "Red!",
            [RGB.G]: "Green!",
            [RGB.B]: "Blue!",
            handleNull: "Null!"
        };

        for (const testEntry of TEST_ENTRIES) {
            test(`Correct value is returned (${testEntry.value})`, () => {
                const result = mapString(testEntry.value).with(mapper);

                expect(result).toBe(testEntry.result);
            });
        }
    });

    describe("With undefined", () => {
        interface TestEntry {
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
            }
        ];

        const mapper = {
            [RGB.R]: "Red!",
            [RGB.G]: "Green!",
            [RGB.B]: "Blue!",
            handleUndefined: "Undefined!"
        };

        for (const testEntry of TEST_ENTRIES) {
            test(`Correct value is returned (${testEntry.value})`, () => {
                const result = mapString(testEntry.value).with(mapper);

                expect(result).toBe(testEntry.result);
            });
        }
    });

    describe("With null and undefined", () => {
        interface TestEntry {
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
            }
        ];

        const mapper = {
            [RGB.R]: "Red!",
            [RGB.G]: "Green!",
            [RGB.B]: "Blue!",
            handleNull: "Null!",
            handleUndefined: "Undefined!"
        };

        for (const testEntry of TEST_ENTRIES) {
            test(`Correct value is returned (${testEntry.value})`, () => {
                const result = mapString(testEntry.value).with(mapper);

                expect(result).toBe(testEntry.result);
            });
        }
    });
});
