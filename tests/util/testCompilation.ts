import * as ts from "typescript";
import * as fs from "fs";

/**
 * TypeScript compiler options used for compiling the compile test/fail sample files.
 */
const COMPILER_OPTIONS: ts.CompilerOptions = {
    module: ts.ModuleKind.CommonJS,
    lib: [
        "lib.es6.d.ts"
    ],
    strict: true,
    alwaysStrict: true,
    noImplicitAny: true,

    baseUrl: "./",

    moduleResolution: ts.ModuleResolutionKind.NodeJs
};

/**
 * Performs the compilation unit tests for a subset of the compile pass/fail sample files.
 * Finds files to attempt compiling as follows:
 * - Looks in the "compile_samples/pass/" or "compile_samples/fail/" directory, depending on the
 *   value of 'shouldCompile'.
 * - Tests all files that begin with a prefix matching the value of 'visitorType'.
 *
 * Example:
 *     // Attempts to compile all "compile_samples/pass/literal-null.*.ts" files.
 *     testCompilation(testCompilation.Visitortype.LiteralWithNull, true);
 *
 * Runs a separate unit test per file and passes if the compile pass/fail result matches 'shouldCompile'.
 *
 * @param visitorType Specifies the type of visitor to test.
 * @param shouldCompile Specifies whether to test the compile pass (true) or compile fail (false) samples.
 */
export function testCompilation(
    visitorType: testCompilation.VisitorType,
    shouldCompile: boolean
): void {
    const dir = `tests/compile_samples/${shouldCompile ? "pass" : "fail"}/`;
    const fileNameRegExp = new RegExp(`^${visitorType}(\\..+)?\\.ts$`);

    const fileNames = fs.readdirSync(dir).filter((fileName) => {
        return fileNameRegExp.test(fileName);
    });

    let program: ts.Program | undefined;
    const host = ts.createCompilerHost(COMPILER_OPTIONS);

    describe(`Compile tests: ${dir}${visitorType}.*`, () => {
        for (const fileName of fileNames) {
            test(fileName, () => {
                program = ts.createProgram(
                    [
                        `src/index.ts`,
                        `${dir}${fileName}`
                    ],
                    COMPILER_OPTIONS,
                    host,
                    program
                );

                const diagnostics = ts.getPreEmitDiagnostics(program);
                const compiled = (diagnostics.length === 0);

                // If it should compile, but there were diagnostics reported, then log some
                // basic info from the diagnostics to help investigation of the problem.
                if (shouldCompile && !compiled) {
                    console.warn(diagnostics.map((diagnostic) => diagnostic.messageText));
                }

                expect(compiled).toBe(shouldCompile);
            });
        }
    });
}

export namespace testCompilation {
    /**
     * All possible combinations of enum/literal visitors and whether they include null/undefined.
     * The value of each is the prefix that should be used on all compile pass/fail sample files
     * for that type of visitor.
     */
    export enum VisitorType {
        Literal = "literal",
        LiteralWithNull = "literal-null",
        LiteralWithUndefined = "literal-undefined",
        LiteralWithBoth = "literal-both",
        Enum = "enum",
        EnumWithNull = "enum-null",
        EnumWithUndefined = "enum-undefined",
        EnumWithBoth = "enum-both"
    }
}
