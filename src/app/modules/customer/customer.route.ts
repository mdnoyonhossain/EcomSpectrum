import express from 'express';
import { CustomerController } from './customer.controller';

const router = express.Router();

router.post('/create-customer', CustomerController.createCustomer);

router.get('/', CustomerController.getAllCustomers);

router.get('/:id', CustomerController.getCustomerById);

router.put('/:id', CustomerController.updateCustomer);

router.delete('/:id', CustomerController.deleteCustomer);

router.get('/new-over-time', CustomerController.getNewCustomersOverTime);

router.get('/distribution/city', CustomerController.getCustomerDistributionByCity);

export const CustomerRoutes = router;