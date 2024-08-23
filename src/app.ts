import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CustomerRoutes } from './app/modules/customer/customer.route';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/customers', CustomerRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('EcomSpectrum Server is Running');
})

export default app;