import User from '../models/Users.js';
import { generateToken } from '../utils/auth.js';


const updateProfile = async (req, res) => {
  console.log("Request coming from front end for updation ", req.body)
  const { username, password, profilePic } = req.body;
  console.log("new pass received from user : ", password)
  console.log("user id ", req.user._id)
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = username || user.username;

      
      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        profilePic: profilePic,
        coins: updatedUser.coins,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};





const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ coins: -1 })
      .select('username wins losses draws coins profilePic')
      .limit(10);
    
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

import Game from '../models/Game.js';

const getGameHistory = async (req, res) => {
  try {
    await cleanupInvalidGames();
    const userId = req.user._id;
    console.log("game history being sent. useer id who requested is : ", userId)
    const games = await Game.find({
      $or: [{ player1: userId }, { player2: userId }]
    })
      .sort({ endedAt: -1 })
      .populate('player1 player2', 'username');

    const history = games.map(game => {
      const opponent = game.player1._id.toString() === userId.toString() ? game.player2 : game.player1;
      let result = 'Draw';
      if (game.result === 'player1' && game.player1._id.toString() === userId.toString()) result = 'Won';
      else if (game.result === 'player2' && game.player2._id.toString() === userId.toString()) result = 'Won';
      else if (game.result !== 'draw') result = 'Lost';

      return {
        gameId: game.gameId,
        opponent: opponent?.username || 'Unknown',
        result,
        endedAt: game.endedAt
      };
    });

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching game history' });
  }
};
  const cleanupInvalidGames = async () => {
    console.log("inside clean up games ")
    try {

      const allGames = await Game.find({});
      

      const invalidGames = allGames.filter(game => {
        return !game.endedAt || 
               !(game.endedAt instanceof Date) || 
               isNaN(game.endedAt.getTime());
      });
  

      const deletePromises = invalidGames.map(game => Game.deleteOne({ _id: game._id }));
      await Promise.all(deletePromises);
      
      console.log(`Cleaned up ${invalidGames.length} invalid game records`);
    } catch (error) {
      console.error("Game cleanup failed:", error.message);
    }
  };

export { updateProfile, getLeaderboard, getGameHistory};