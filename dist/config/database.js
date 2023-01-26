"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDb = exports.connectDb = exports.prisma = void 0;
const client_1 = require("@prisma/client");
function connectDb() {
    exports.prisma = new client_1.PrismaClient();
}
exports.connectDb = connectDb;
async function disconnectDb() {
    await exports.prisma?.$disconnect();
}
exports.disconnectDb = disconnectDb;
