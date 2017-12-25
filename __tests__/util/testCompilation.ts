import * as ts from "typescript";
import * as fs from "fs";

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

export function testCompilation(
    dir: string,
    shouldCompile: boolean,
    fileFilter: (fileName: string) => boolean
): void {
    const files = fs.readdirSync(dir).filter(fileFilter);

    for (const file of files) {
        test.concurrent(file, async () => {
            const program = ts.createProgram(
                [
                    `${dir}${file}`
                ],
                COMPILER_OPTIONS
            );

            const diagnostics = ts.getPreEmitDiagnostics(program);

            if (shouldCompile) {
                if (diagnostics.length) {
                    console.warn(diagnostics.map((diagnostic) => diagnostic.messageText));
                }
                expect(diagnostics.length).toBe(0);
            } else {
                expect(diagnostics.length).not.toBe(0);
            }
        });
    }
}
