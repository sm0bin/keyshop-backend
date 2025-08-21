"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
    databaseURL: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
};
