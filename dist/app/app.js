"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customer_routes_1 = require("./modules/customer/customer.routes");
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application Routes
app.use('/api/v1/customers', customer_routes_1.CustomerRoutes);
app.get('/', (req, res) => {
    res.send('EcomSpectrum Server is Running');
});
exports.default = app;
