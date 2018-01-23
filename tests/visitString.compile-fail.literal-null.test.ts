import { testCompilation } from "./util/testCompilation";

testCompilation(
    testCompilation.VisitorMethod.VisitString,
    testCompilation.VisitorType.LiteralWithNull,
    false
);
