## Compile Samples
This is a collection of sample usages of `visitString` that are used for implementing basic compile pass/fail unit tests.

Each .ts file in the `pass` directory should compile without errors.
Each .ts file in the `fail` directory should fail to compile.

NOTE: In many ways, for the purpose of `ts-string-visitor`, a string enum is pretty much the same as a string literal union type. It's not necessary to duplicate ALL compile pass/fail tests for both use cases. The exhaustive testing is done in terms of string literal union types. Only special enum-specific situations are tested in terms of string enums.

See the `compile*.ts` unit tests in the parent directory.
