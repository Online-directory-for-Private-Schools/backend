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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const PrivateSchoolEntity_1 = require("./PrivateSchoolEntity");
const UserEntity_1 = require("./UserEntity");
let Review = class Review extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float"
    }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], Review.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.User, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", UserEntity_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PrivateSchoolEntity_1.PrivateSchool, PrivateSchool => PrivateSchool.reviews, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", PrivateSchoolEntity_1.PrivateSchool)
], Review.prototype, "school", void 0);
Review = __decorate([
    (0, typeorm_1.Entity)("reviews")
], Review);
exports.Review = Review;
//# sourceMappingURL=ReviewEntity.js.map