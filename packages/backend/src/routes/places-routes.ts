import express from 'express';
import placesController from '../controllers/places-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const router = express.Router();

router.get('/', placesController.getPlaces);
router.post('/', authMiddleware, placesController.createPlaces);
router.get('/me', authMiddleware, placesController.getPlacesByUserId);

export default router;
