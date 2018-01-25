import { mapString } from "../src";

describe("Map String Literal", () => {
    type RGB = "r" | "g" | "b";

    describe("Without null/undefined", () => {
        interface TestEntry {
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
            }
        ];

        const mapper = {
            r: "Red!",
            g: "Green!",
            b: "Blue!"
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
            }
        ];

        const mapper = {
            r: "Red!",
            g: "Green!",
            b: "Blue!",
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
            }
        ];

        const mapper = {
            r: "Red!",
            g: "Green!",
            b: "Blue!",
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
            }
        ];

        const mapper = {
            r: "Red!",
            g: "Green!",
            b: "Blue!",
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
