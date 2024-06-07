import express from 'express';
import usersController from '../controllers/users-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/me', authMiddleware, usersController.getUser);

export default router;
