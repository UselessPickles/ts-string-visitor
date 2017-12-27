// TEST DISABLED!
// See https://github.com/UselessPickles/ts-string-visitor/issues/3
// Uncomment the code after TypeScript is updated to fix the bug.

// import visitString from "../../../src";

// enum RGB {
//     R = "r",
//     G = "g",
//     B = "b"
// }

// visitString("r" as RGB).with({
//     [RGB.R]: (value) => {
//         // tslint:disable-next-line:no-unused-variable
//         const test: RGB.R = value;
//     },
//     [RGB.G]: (value) => {
//         // tslint:disable-next-line:no-unused-variable
//         const test: RGB.G = value;
//     },
//     [RGB.B]: (value) => {
//         // tslint:disable-next-line:no-unused-variable
//         const test: RGB.B = value;
//     }
// });
