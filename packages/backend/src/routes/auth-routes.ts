import express from 'express';
import authController from '../controllers/auth-controller';

const router = express.Router();

router.post('/refresh', authController.refreshToken);

export default router;
