import Game from '../models/Game.js';



const getGameHistory = async (req, res) => {
  try {
    const games = await Game.find({
      $or: [{ player1: req.user._id }, { player2: req.user._id }],
      result: { $ne: 'ongoing' }
    })
    .populate('player1 player2 winner_id', 'username profilePicture')
    .sort({ endedAt: -1 });
    console.log("game history being sent : ", games)
    res.json(games);
  } catch (error) {
    console.error('Error getting game history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getGameDetails = async (req, res) => {
  try {
    console.log("request made ffor : ", req.params.gameId)
    const game = await Game.findOne({ gameId: req.params.gameId }).lean();
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json({
      grid: game.grid,
      result: game.result,
      winner_id: game.winner_id?.toString() || null,
      gameId: game.gameId
    });
  } catch (error) {
    console.error('Error fetching game detail:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getGameHistory, getGameDetails };