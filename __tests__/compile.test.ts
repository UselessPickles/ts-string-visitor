import * as ts from "typescript";
import * as fs from "fs";
const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    lib: [
//        "es5",
        "dom",
        "es6",
        "dom.iterable",
        "scripthost"
    ],
    strict: true,
    alwaysStrict: true,
    noImplicitAny: true,

    baseUrl: "./",

    moduleResolution: ts.ModuleResolutionKind.NodeJs
};

function testFiles(dir: string, shouldCompile: boolean): void {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        test(file, () => {
            const program = ts.createProgram(
                [
                    // "src/StringVisitor.ts",
                    // "src/StringVisitee.ts",
                    // "src/visitString.ts",
                    // "src/index.ts",
                    `${dir}${file}`
                ],
                compilerOptions
                // ts.createCompilerHost(compilerOptions)
            );

            const diagnostics = ts.getPreEmitDiagnostics(program);
            const failedFiles = diagnostics.map((diagnostic) => {
                return {
                    file: diagnostic.file && diagnostic.file.fileName,
                    message: diagnostic.messageText,
                    start: diagnostic.start,
                    source: diagnostic.source
                };
            });

            if (shouldCompile) {
                expect(failedFiles).toEqual([]);
            } else {
                expect(failedFiles).not.toEqual([]);
            }
        });
    }
}

describe("Compile pass/fail tests", () => {
    describe("Should pass", () => {
        testFiles(`__tests__/compile_pass_samples/`, true);
    });

    describe("Should fail", () => {
        testFiles(`__tests__/compile_fail_samples/`, false);
    });
});
