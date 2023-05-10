"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterObjectFromFalsyValues(object) {
    const newObject = {};
    Object.keys(object).forEach((key) => {
        if (object[key]) {
            newObject[key] = object[key];
        }
    });
    return newObject;
}
exports.default = filterObjectFromFalsyValues;
;
//# sourceMappingURL=truthifyObject.util.js.map