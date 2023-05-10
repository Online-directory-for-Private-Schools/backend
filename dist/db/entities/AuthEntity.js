"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
let Auth = class Auth extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.OneToOne)(() => UserEntity_1.User, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "userId"
    }),
    __metadata("design:type", UserEntity_1.User)
], Auth.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Auth.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Auth.prototype, "hashed_password", void 0);
Auth = __decorate([
    (0, typeorm_1.Entity)("auth")
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=AuthEntity.js.map