import { mapString } from "../../../../src";

type RGB = "r" | "g" | "b";

mapString("r" as RGB | null | undefined).with({
    r: 1,
    g: 2,
    // Missing "b" handler
    handleNull: 0,
    handleUndefined: 0
});
