import { testCompilation } from "./util/testCompilation";

describe("Compile fail tests: literal visitor", () => {
    testCompilation(`__tests__/compile_fail_samples/`, false, (fileName) => {
        return fileName.indexOf("literal.") === 0;
    });
});
