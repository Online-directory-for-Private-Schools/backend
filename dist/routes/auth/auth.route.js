"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const register_controller_1 = __importDefault(require("../../controllers/auth/register.controller"));
const login_controller_1 = __importDefault(require("../../controllers/auth/login.controller"));
const router = (0, express_1.Router)();
exports.authRouter = router;
router.get("/", (req, res) => {
    res.send("auth endpoint");
});
// TODO: [SEG310-30] implement register, login and logout endpoints
router.post("/register", register_controller_1.default);
router.post("/login", login_controller_1.default);
router.post("/logout", (req, res) => {
    res.status(501).send("logout endpoint");
});
//# sourceMappingURL=auth.route.js.map