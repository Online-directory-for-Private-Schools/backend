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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_index_1 = __importDefault(require("./routes/routes.index"));
const config_1 = require("./configs/config");
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
let initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use("/", routes_index_1.default);
    try {
        yield data_source_1.AppDataSource.initialize();
        // await runSeeders(AppDataSource)
        app.listen(config_1.config.port, () => {
            console.log("listening on port " + config_1.config.port);
        });
        console.log("initialized");
    }
    catch (error) {
        console.log("error", error);
    }
});
initialize();
//# sourceMappingURL=index.js.map