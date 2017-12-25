import { testCompilation } from "./util/testCompilation";

describe("Compile pass tests: literal visitor with null", () => {
    testCompilation(`__tests__/compile_pass_samples/`, true, (fileName) => {
        return fileName.indexOf("literal-null.") === 0;
    });
});
