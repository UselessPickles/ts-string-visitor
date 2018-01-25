import { mapString } from "../../../../src";

type RGB = "r" | "g" | "b";

mapString("r" as RGB | undefined).with({
    "r": 1,
    "g": 2,
    "b": 3,
    // missing handleUndefined
});
