"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("@/config/database");
const app = (0, express_1.default)();
app.use((0, cors_1.default)()).use(express_1.default.json());
function init() {
    (0, database_1.connectDb)();
    return Promise.resolve(app);
}
exports.init = init;
async function close() {
    await (0, database_1.disconnectDb)();
}
exports.close = close;
exports.default = app;
