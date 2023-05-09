"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkUserRequest(paramId, authId) {
    let resp = {
        ok: true,
    };
    // checking if id is provided in params
    if (!paramId) {
        resp = {
            ok: false,
            status: 400,
            errMessage: "a user id has to be provided",
        };
        return resp;
    }
    // checking if id is provided in params matches the authenticated user's id
    if (paramId !== authId) {
        resp = {
            ok: false,
            status: 403,
            errMessage: "You are not authorized to access this user",
        };
        return resp;
    }
    return resp;
}
exports.default = checkUserRequest;
//# sourceMappingURL=checkRequest.util.js.map