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
exports.PrivateSchool = void 0;
const typeorm_1 = require("typeorm");
const CourseEntity_1 = require("./CourseEntity");
const PhotoEntity_1 = require("./PhotoEntity");
const ReviewEntity_1 = require("./ReviewEntity");
const UserEntity_1 = require("./UserEntity");
let PrivateSchool = class PrivateSchool extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PrivateSchool.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrivateSchool.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], PrivateSchool.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        default: 0
    }),
    __metadata("design:type", Number)
], PrivateSchool.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], PrivateSchool.prototype, "isHiring", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "numeric"
    }),
    __metadata("design:type", String)
], PrivateSchool.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "numeric"
    }),
    __metadata("design:type", String)
], PrivateSchool.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrivateSchool.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrivateSchool.prototype, "street_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrivateSchool.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrivateSchool.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserEntity_1.User, {
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", UserEntity_1.User)
], PrivateSchool.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PhotoEntity_1.Photo, undefined, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", PhotoEntity_1.Photo)
], PrivateSchool.prototype, "profile_pic", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PhotoEntity_1.Photo, photo => photo.school),
    __metadata("design:type", Array)
], PrivateSchool.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CourseEntity_1.Course, course => course.school),
    __metadata("design:type", Array)
], PrivateSchool.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReviewEntity_1.Review, review => review.school),
    __metadata("design:type", Array)
], PrivateSchool.prototype, "reviews", void 0);
PrivateSchool = __decorate([
    (0, typeorm_1.Entity)("private_schools")
], PrivateSchool);
exports.PrivateSchool = PrivateSchool;
//# sourceMappingURL=PrivateSchoolEntity.js.map