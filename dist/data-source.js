"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_config_1 = require("./configs/typeorm.config");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource(typeorm_config_1.typeOrmDataSourceOptions);
//# sourceMappingURL=data-source.js.map