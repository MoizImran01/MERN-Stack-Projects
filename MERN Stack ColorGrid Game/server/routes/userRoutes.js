import express from 'express';
import { updateProfile, getLeaderboard} from '../controllers/UserController.js';

const app = express();
const router = express.Router();

router.post('/update-profile', updateProfile);
router.get('/leaderboard', getLeaderboard);
export default router;
