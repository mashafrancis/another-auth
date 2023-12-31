"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configurationProvider = __importStar(require("@practica/configuration-provider"));
const logger_1 = require("@practica/logger");
// ️️️✅ Best Practice: Keep a singleton DB connection pool in a process
let dbConnection;
function getDbConnection() {
    if (!dbConnection) {
        dbConnection = new sequelize_1.Sequelize(configurationProvider.getValue('DB.dbName'), configurationProvider.getValue('DB.userName'), configurationProvider.getValue('DB.password'), {
            port: 54320,
            dialect: 'postgres',
            benchmark: true,
            logging: (sql, duration) => {
                logger_1.logger.info(`Sequelize operation was just executed in ${duration} ms with sql: ${sql}`);
            },
            logQueryParameters: true,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });
    }
    return dbConnection;
}
exports.default = getDbConnection;
