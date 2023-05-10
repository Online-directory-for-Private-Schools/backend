"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const school_route_1 = require("./school/school.route");
const auth_route_1 = require("./auth/auth.route");
const student_route_1 = require("./student/student.route");
const user_route_1 = require("./user/user.route");
const router = (0, express_1.Router)();
router.use('/schools', school_route_1.SchoolRouter);
router.use('/students', student_route_1.StudentRouter);
router.use('/auth', auth_route_1.authRouter);
router.use('/user', user_route_1.UserRouter);
exports.default = router;
//# sourceMappingURL=routes.index.js.map