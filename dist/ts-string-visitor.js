"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringVisiteeWithNullAndUndefined = /** @class */ (function () {
    function StringVisiteeWithNullAndUndefined(value) {
        this.value = value;
    }
    StringVisiteeWithNullAndUndefined.prototype.with = function (visitor) {
        if (this.value === null) {
            return visitor.handleNull(this.value);
        }
        else if (this.value === undefined) {
            return visitor.handleUndefined(this.value);
        }
        else {
            return visitor[this.value](this.value);
        }
    };
    return StringVisiteeWithNullAndUndefined;
}());
exports.StringVisiteeWithNullAndUndefined = StringVisiteeWithNullAndUndefined;
function visitString(value) {
    return new StringVisiteeWithNullAndUndefined(value);
}
exports.visitString = visitString;
exports.default = visitString;
