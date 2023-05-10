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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const PrivateSchoolEntity_1 = require("./PrivateSchoolEntity");
const ScheduleEntity_1 = require("./ScheduleEntity");
let Course = class Course extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "teacher_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "numeric",
        nullable: true
    }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true
    }),
    __metadata("design:type", Boolean)
], Course.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PrivateSchoolEntity_1.PrivateSchool, (privateSchool) => privateSchool.courses, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", PrivateSchoolEntity_1.PrivateSchool)
], Course.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ScheduleEntity_1.Schedule, (schedule) => schedule.course, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Course.prototype, "schedules", void 0);
Course = __decorate([
    (0, typeorm_1.Entity)("courses")
], Course);
exports.Course = Course;
//# sourceMappingURL=CourseEntity.js.map