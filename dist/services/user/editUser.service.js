"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const UserEntity_1 = require("../../db/entities/UserEntity");
function editUserService(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = userInfo;
        let user = yield UserEntity_1.User.findOneBy({ id });
        // checking if user exists
        if (!user) {
            return {
                error: {
                    message: "User with the provided id not found",
                },
            };
        }
        let res = yield data_source_1.AppDataSource.createQueryBuilder()
            .update(UserEntity_1.User, userInfo)
            .where("id = :id", { id })
            .returning("*")
            .updateEntity(true)
            .execute();
        return { user: res.raw[0] };
    });
}
exports.default = editUserService;
//# sourceMappingURL=editUser.service.js.map