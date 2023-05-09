"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkIfNumericOrUndefined(num) {
    if (num === undefined) {
        return true;
    }
    return Boolean(Number(num));
}
exports.default = checkIfNumericOrUndefined;
//# sourceMappingURL=checkIfNumberOrUndefined.util.js.map