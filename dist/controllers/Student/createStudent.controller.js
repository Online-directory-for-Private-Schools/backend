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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createStudent_service_1 = __importDefault(require("../../services/Student/createStudent.service"));
const typeorm_1 = require("typeorm");
/**
 *
 * @deprecated  student controllers will be removed due to merging the student entity with the user entity
 */
function createStudentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp;
        if (!isRequestValid(req.body)) {
            resp = {
                error: {
                    message: "Invalid request",
                },
            };
            res.status(400).json(resp);
            return;
        }
        const { city, province, country, userId } = req.body;
        try {
            const { student, error } = yield (0, createStudent_service_1.default)({ city, province, country, userId });
            if (error) {
                resp = { error };
                res.status(400).json(resp);
                return;
            }
            resp = { student };
            res.status(200).json(resp);
        }
        catch (error) {
            if (error instanceof typeorm_1.TypeORMError) {
                console.log(error.message);
            }
            resp = {
                error: {
                    message: "an error occurred while creating the student profile",
                },
            };
            return res.status(500).json(resp);
        }
    });
}
exports.default = createStudentController;
const isRequestValid = ({ city, province, country, userId }) => {
    const isFull = ![city, province, country, userId].includes(undefined);
    return isFull;
};
//# sourceMappingURL=createStudent.controller.js.map