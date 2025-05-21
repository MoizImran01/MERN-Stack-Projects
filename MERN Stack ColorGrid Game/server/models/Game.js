import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
    default: () => `${Date.now()}`,
  },
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  player2: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false 
  },

  player1Color: {
    type: String,
    required: true
  },
  player2Color: {
    type: String,
    required: true
  },
  grid: {
    type: [[String]],
    default: Array(5).fill().map(() => Array(5).fill(''))
  },
  currentPlayer: {
    type: String,
    enum: ['player1', 'player2'],
    default: 'player1'
  },
  winner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  result: {
    type: String,
    enum: ['player1', 'player2', 'draw', 'ongoing'],
    default: 'ongoing'
  },
  moves: [{
    player: {
      type: String,
      enum: ['player1', 'player2'],
      required: true
    },
    row: {
      type: Number,
      required: true
    },
    col: {
      type: Number,
      required: true
    },
    
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  endedAt: {
    type: Date
  }
});

export default mongoose.model('Game', GameSchema);
