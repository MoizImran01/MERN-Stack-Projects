import express from 'express';
import { getGameHistory, getGameDetails } from '../controllers/GameController.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

router.route('/:gameid/history')
  .get(protect, getGameHistory);

router.route('/:gameid')
  .get(protect, getGameDetails);

export default router;