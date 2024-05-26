import express from 'express';
import authController from '../controllers/auth-controller';

const router = express.Router();

router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
