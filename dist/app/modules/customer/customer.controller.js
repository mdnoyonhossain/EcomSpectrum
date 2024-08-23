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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const customer_service_1 = require("./customer.service");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.body;
        const result = yield customer_service_1.CustomerServices.createCustomerIntoDB(customer);
        res.status(201).json({
            success: true,
            message: 'Customer Created Successfully!',
            data: result
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.CustomerController = {
    createCustomer
};
