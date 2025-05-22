import express from 'express';
import { submitRequest, updateRequest } from '../controllers/requestController';
import { authenticate, authorize } from '../middleware/auth';
const router = express.Router();
router.post('/', authenticate, authorize(['Employee']), submitRequest);
router.patch('/:id', authenticate, authorize(['Manager']), updateRequest);
export default router;