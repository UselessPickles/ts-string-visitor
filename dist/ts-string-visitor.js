"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A wrapper around a string literal or string enum value to be visited.
 * For values that may be null and undefined.
 * Do not use this class directly. Use the {@link visitString} function to get an instance of this class.
 *
 * NOTE: This class provides the run-time implementation for ALL "StringVisitee" classes.
 *
 * @template S - A string literal type or string enum type.
 */
var StringVisiteeWithNullAndUndefined = /** @class */ (function () {
    function StringVisiteeWithNullAndUndefined(value) {
        this.value = value;
    }
    /**
     * Visits the wrapped value using the supplied visitor.
     * If the wrapped value is null, calls the visitor's {@link StringNullVisitor#handleNull} method.
     * If the wrapped value is undefined, calls the visitor's {@link StringNullVisitor#handleUndefined} method.
     * Otherwise, calls the visitor method whose name matches the wrapped value.
     *
     * @template R - The return type of the visitor methods.
     *
     * @param visitor - A visitor implementation for type S that returns type R.
     * @returns The return value of the visitor method that is called.
     */
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
    // NOTE: StringVisiteeWithNullAndUndefined provides a valid run-time implementation for ALL "StringVisitee" classes.
    return new StringVisiteeWithNullAndUndefined(value);
}
exports.visitString = visitString;
exports.default = visitString;
