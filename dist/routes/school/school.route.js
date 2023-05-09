"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolRouter = void 0;
const express_1 = require("express");
const createSchool_controller_1 = __importDefault(require("../../controllers/school/createSchool.controller"));
const requireAuth_middleware_1 = require("../../middlewares/auth/requireAuth.middleware");
const getSchool_controller_1 = __importDefault(require("../../controllers/school/getSchool.controller"));
const editSchool_controller_1 = __importDefault(require("../../controllers/school/editSchool.controller"));
const deleteSchool_controller_1 = __importDefault(require("../../controllers/school/deleteSchool.controller"));
const searchSchools_controller_1 = __importDefault(require("../../controllers/school/searchSchools.controller"));
const router = (0, express_1.Router)();
exports.SchoolRouter = router;
router.use(requireAuth_middleware_1.requireAuth);
router.get("/", searchSchools_controller_1.default);
router.get("/:id", getSchool_controller_1.default);
router.put("/:id", editSchool_controller_1.default);
router.delete("/:id", deleteSchool_controller_1.default);
router.post("/", createSchool_controller_1.default);
//# sourceMappingURL=school.route.js.map