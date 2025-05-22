import express from 'express';
import { createSoftware } from '../controllers/softwareController';
import { authenticate, authorize } from '../middleware/auth';
const router = express.Router();
router.post('/', authenticate, authorize(['Admin']), createSoftware);
export default router;