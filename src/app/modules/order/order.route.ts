import express from 'express';
import { OrderController } from './order.controller';

const router = express();

router.post('/create-order', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

router.get('/sales/total', OrderController.getTotalSalesOverTime);
router.get('/sales/growth-rate', OrderController.getSalesGrowthRateOverTime);
router.get('/analytics/ltv-cohort', OrderController.getLTVByCohort);

export const OrderRoutes = router;