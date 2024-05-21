import express from 'express';
import usersController from '../controllers/users-controller';

const router = express.Router();

router.post('/signup', usersController.signup);

export default router;
