"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRouter = void 0;
const express_1 = require("express");
const createStudent_controller_1 = __importDefault(require("../../controllers/Student/createStudent.controller"));
const requireAuth_middleware_1 = require("../../middlewares/auth/requireAuth.middleware");
const router = (0, express_1.Router)();
exports.StudentRouter = router;
router.use(requireAuth_middleware_1.requireAuth);
/**
 *
 * @deprecated  /student routes will be removed due to merging the student entity with the user entity
 */
router.post("/", createStudent_controller_1.default);
//# sourceMappingURL=student.route.js.map