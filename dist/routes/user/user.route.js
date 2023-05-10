"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const requireAuth_middleware_1 = require("../../middlewares/auth/requireAuth.middleware");
const getUser_controller_1 = __importDefault(require("../../controllers/user/getUser.controller"));
const deleteUser_controller_1 = __importDefault(require("../../controllers/user/deleteUser.controller"));
const editUser_controller_1 = __importDefault(require("../../controllers/user/editUser.controller"));
const router = (0, express_1.Router)();
exports.UserRouter = router;
router.use(requireAuth_middleware_1.requireAuth);
router.get("/:id", getUser_controller_1.default);
router.put("/:id", editUser_controller_1.default);
router.delete("/:id", deleteUser_controller_1.default);
//# sourceMappingURL=user.route.js.map