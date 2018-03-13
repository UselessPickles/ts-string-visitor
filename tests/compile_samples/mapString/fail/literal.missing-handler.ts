import { mapString } from "../../../../src";

type RGB = "r" | "g" | "b";

mapString("r" as RGB).with({
    r: 1,
    g: 2
    // Missing "b" handler
});
