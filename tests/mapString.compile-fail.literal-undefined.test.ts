import { testCompilation } from "./util/testCompilation";

testCompilation(
    testCompilation.VisitorMethod.MapString,
    testCompilation.VisitorType.LiteralWithUndefined,
    false
);
