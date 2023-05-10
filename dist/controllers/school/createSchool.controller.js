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
const createSchool_service_1 = __importDefault(require("../../services/School/createSchool.service"));
const typeorm_1 = require("typeorm");
function createSchoolController(req, res) {
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
        const { name, bio, isHiring, lng, lat, city, province, street_name, country, userId } = req.body;
        try {
            const { school, error } = yield (0, createSchool_service_1.default)({
                name,
                bio,
                isHiring,
                lng,
                lat,
                city,
                province,
                street_name,
                country,
                userId,
            });
            if (error) {
                resp = { error };
                res.status(400).json(resp);
                return;
            }
            res.status(200).json({
                school,
            });
        }
        catch (error) {
            if (error instanceof typeorm_1.TypeORMError) {
                console.log(error.message);
            }
            resp = {
                error: {
                    message: "an error has occurred while creating the school",
                },
            };
            return res.status(500).json(resp);
        }
    });
}
exports.default = createSchoolController;
const isRequestValid = ({ userId, name, lng, lat, city, province, street_name, country }) => {
    const isFull = ![userId, name, lng, lat, city, province, street_name, country].includes(undefined);
    return isFull;
};
//# sourceMappingURL=createSchool.controller.js.map