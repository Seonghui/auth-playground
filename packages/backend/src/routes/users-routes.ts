import express from 'express';
import usersController from '../controllers/users-controller';

const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);

export default router;
