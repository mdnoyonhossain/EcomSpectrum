import express from 'express';
import { OrderController } from './order.controller';

const router = express();

router.post('/create-order', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);


export const OrderRoutes = router;