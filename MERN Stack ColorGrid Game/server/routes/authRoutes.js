import express from "express";
import { signUp, login } from '../controllers/AuthController.js';
import { getLeaderboard, updateProfile, getGameHistory } from "../controllers/UserController.js";
import { protect } from '../utils/auth.js';
import { getGameDetails } from '../controllers/GameController.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.put('/update-profile', protect, updateProfile);
router.get('/leaderboard', getLeaderboard)
router.get('/history-detail/:gameId', protect, getGameDetails);
router.get('/history', protect, getGameHistory)
export default router;
