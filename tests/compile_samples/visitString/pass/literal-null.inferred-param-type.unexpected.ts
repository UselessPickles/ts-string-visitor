import { visitString } from "../../../../src";

type RGB = "r" | "g" | "b";

visitString("r" as RGB | null).with({
    r: (value) => {
        // tslint:disable-next-line:no-unused-variable
        const test: "r" = value;
    },
    g: (value) => {
        // tslint:disable-next-line:no-unused-variable
        const test: "g" = value;
    },
    b: (value) => {
        // tslint:disable-next-line:no-unused-variable
        const test: "b" = value;
    },
    handleNull: (value) => {
        // tslint:disable-next-line:no-unused-variable
        const test: null = value;
    },
    handleUnexpected: (value) => {
        // tslint:disable-next-line:no-unused-variable
        const test: string | undefined = value;
    }
});
