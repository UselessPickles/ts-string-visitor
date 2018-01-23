import { testCompilation } from "./util/testCompilation";

testCompilation(
    testCompilation.VisitorMethod.VisitString,
    testCompilation.VisitorType.LiteralWithUndefined,
    false
);
