import exporess from 'express';
import { ProductController } from './product.controller';

const router = exporess();

router.post('/create-product', ProductController.createProduct);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

router.put('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;