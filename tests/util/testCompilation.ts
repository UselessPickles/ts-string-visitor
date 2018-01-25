import * as ts from "typescript";
import * as fs from "fs";

/**
 * TypeScript compiler options used for compiling the compile test/fail sample files.
 */
const COMPILER_OPTIONS: ts.CompilerOptions = {
    module: ts.ModuleKind.CommonJS,
    lib: [
        "lib.es5.d.ts"
    ],
    strict: true,
    alwaysStrict: true,
    noImplicitAny: true,

    baseUrl: "./",

    moduleResolution: ts.ModuleResolutionKind.NodeJs,

    types: []
};

/**
 * Performs the compilation unit tests for a subset of the compile pass/fail sample files.
 * Finds files to attempt compiling as follows:
 * - Looks in the "compile_samples/{visitorMethod}/pass/" or "compile_samples/{visitorMethod}/fail/" directory,
 *   depending on the value of 'shouldCompile' and using the value of 'visitorMethod' in place of {visitorMethod}.
 * - Tests all files that begin with a prefix matching the value of 'visitorType'.
 *
 * Example:
 *     // Attempts to compile all "compile_samples/visitString/pass/literal-null.*.ts" files and expects them all to
 *     // compile successfully.
 *     testCompilation(
 *         testCompilation.VisitorMethod.VisitString,
 *         testCompilation.Visitortype.LiteralWithNull,
 *         true
 *     );
 *
 * Runs a separate unit test per file and passes if the compile pass/fail result matches 'shouldCompile'.
 *
 * @param visitorMethod - Specifies the visitor method to test.
 * @param visitorType - Specifies the type of visitor to test.
 * @param shouldCompile - Specifies whether to test the compile pass (true) or compile fail (false) samples.
 */
export function testCompilation(
    visitorMethod: testCompilation.VisitorMethod,
    visitorType: testCompilation.VisitorType,
    shouldCompile: boolean
): void {
    const dir = `tests/compile_samples/${visitorMethod}/${shouldCompile ? "pass" : "fail"}/`;
    const fileNameRegExp = new RegExp(`^${visitorType}(\\..+)?\\.ts$`);

    const fileNames = fs.readdirSync(dir).filter((fileName) => {
        return fileNameRegExp.test(fileName);
    });

    const host = ts.createCompilerHost(COMPILER_OPTIONS);

    describe(`Compile tests: ${dir}${visitorType}.*`, () => {
        for (const fileName of fileNames) {
            test(fileName, () => {
                const program = ts.createProgram(
                    [
                        `${dir}${fileName}`
                    ],
                    COMPILER_OPTIONS,
                    host
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
     * All possible visitor methods that can be tested.
     */
    export enum VisitorMethod {
        /**
         * Corresponds to {@link visitString}.
         */
        VisitString = "visitString",
        /**
         * Corresponds to {@link mapString}.
         */
        MapString = "mapString"
    }

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
