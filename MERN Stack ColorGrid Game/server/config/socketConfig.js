import { Server } from "socket.io";
import { addUser, removeUser, getUsersInRoom } from "../utils/socketUsers.js";
import Game from "../models/Game.js";
import User from "../models/Users.js";
import { maxAreaOfIsland } from "../utils/maxAreaOfIsland.js";
import { v4 as uuidv4 } from 'uuid';


const socketConfig = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: false,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    

socket.on('find_match', async (data) => {
  if (!data?.playerId || !data?.playerUsername) {
    return socket.emit("error", "Missing player data");
  }
  console.log(data.playerProfilePic)
  let room = "waiting";
  addUser(socket.id, data.playerId, data.playerUsername, room="waiting", data.playerProfilePic);
  socket.join("waiting");

  const waitingUsers = getUsersInRoom("waiting");

  if (waitingUsers.length >= 2) {
    const [player1, player2] = waitingUsers;
    console.log(waitingUsers)
    removeUser(player1.socketId);
    removeUser(player2.socketId);

    const gameId = uuidv4();
    console.log("creating game with game id = ",gameId)
    const player1Color = Math.random() > 0.5 ? '#FF90BB' : '#8ACCD5';
    const player2Color = player1Color === '#FF90BB' ? '#8ACCD5' : '#FF90BB';
    console.log("pllayer 1 profile pic url : ", player1.playerProfilePic)
    const game = new Game({
      gameId: gameId,
      player1: player1.userId,
      player2: player2.userId,
      player1Color,
      player2Color,
      currentPlayer: "player1",
      player1ProfilePic: player1.playerProfilePic,
      player2ProfilePic: player2.playerProfilePic,
      grid: Array(5).fill().map(() => Array(5).fill(''))
    });

    console.log("creating game for : ", player1.userId)
    console.log("creating game for : ", player2.userId)
    console.log("saving the game with id : ", game.gameId)
    await game.save()

    io.to(player1.socketId).emit("match_found", {
      gameId: gameId,
      playerRole: 'player1',
      playerId: player1.userId,          
      opponentId: player2.userId,       
      playerColor: player1Color,
      opponentColor: player2Color,
      opponentUsername: player2.username,
      opponentProfilePic: player2.playerProfilePic

    });

    io.to(player2.socketId).emit("match_found", {
      gameId: gameId,
      playerRole: 'player2',
      playerId: player2.userId,          
      opponentId: player1.userId,       
      playerColor: player2Color,
      opponentColor: player1Color,
      opponentUsername: player1.username,
      opponentProfilePic: player1.playerProfilePic
    });
  }
});


    socket.on('join_game', ({ gameId }) => {
      console.log(`Player ${socket.id} joining game ${gameId}`);
      

      Game.findOne({ gameId }).then(game => {
        if (!game) {
          console.error(`Game ${gameId} not found in database`);
          return socket.emit('error', { message: 'Game not found' });
        }
        
        socket.join(gameId);
        console.log(`Room ${gameId} now has ${io.sockets.adapter.rooms.get(gameId)?.size || 0} players`);
        
      });
    });

    socket.on("make_move", async ({ gameId, row, col, playerRole }) => {
      console.log(`Move attempt in game: ${gameId}`); 
      try {
        const game = await Game.findOne({ gameId }).populate('player1 player2 winner_id', 'username profilePicture _id');
        
        if (!game) return socket.emit("error", { message: "Game not found" });
        if (playerRole !== game.currentPlayer) return socket.emit("error", { message: "Not your turn" });
        if (game.grid[row][col] !== '') return socket.emit("error", { message: "Cell already filled" });
    

        game.grid[row][col] = game[`${playerRole}Color`];
        game.moves.push({ player: playerRole, row, col });
    
        const isFull = game.grid.flat().every(cell => cell !== '');
        if (isFull) {

          const gridCopy = game.grid.map(row => [...row]);
          const player1Area = maxAreaOfIsland(gridCopy, game.player1Color);
          const player2Area = maxAreaOfIsland(gridCopy, game.player2Color);
    

          if (player1Area > player2Area) {
            game.result = 'player1';
            game.winner_id = game.player1;
          } else if (player2Area > player1Area) {
            game.result = 'player2';
            game.winner_id = game.player2;
          } else {
            game.result = 'draw';
          }
          game.endedAt = new Date();
    

          if (game.result !== 'draw') {
            const winnerId = game.winner_id;
            const loserId = game.result === 'player1' ? game.player2._id : game.player1._id;
          
            await User.findByIdAndUpdate(winnerId, {
              $inc: { coins: 200, wins: 1 }
            });
          
            const loser = await User.findById(loserId);
            if (loser) 
            {
              const updatedCoins = Math.max(loser.coins - 200, 0);
              await User.findByIdAndUpdate(loserId, {
                $set: { coins: updatedCoins },
                $inc: { losses: 1 }
              });
            }

          } else {

            await User.findByIdAndUpdate(game.player1._id, { $inc: { draws: 1 } });
            await User.findByIdAndUpdate(game.player2._id, { $inc: { draws: 1 } });
          }
        } else {
          game.currentPlayer = playerRole === 'player1' ? 'player2' : 'player1';
          console.log(`Turn changed to ${game.currentPlayer}`);
        }
    
        await game.save();
        const updatedGame = await Game.findOne({ gameId }).populate('player1 player2 winner_id', 'username profilePicture _id');
        io.to(gameId).emit("move_made", updatedGame.toObject());
    
      } catch (error) {
        console.error("Error handling move:", error);
        socket.emit("error", { message: "Error processing move" });
      }
    });

    socket.on("forfeit_game", async ({ gameId, playerRole }) => {
      try {
        const game = await Game.findOne({ gameId }).populate('player1 player2');
        if (!game) return socket.emit("error", { message: "Game not found" });
    
        const winnerRole = playerRole === 'player1' ? 'player2' : 'player1';
        game.result = winnerRole;
        game.winner_id = game[winnerRole];
        game.endedAt = new Date();
        await game.save();
    
        await User.findByIdAndUpdate(game.winner_id, {
          $inc: { coins: 200, wins: 1 }
        });
    
        const user = await User.findById(game[playerRole]._id);
if (user) {
  const updatedCoins = Math.max(user.coins - 200, 0);
  await User.findByIdAndUpdate(game[playerRole]._id, {
    $set: { coins: updatedCoins },
    $inc: { losses: 1 }
  });
}
    

        const updatedGame = await Game.findOne({ gameId }).populate('player1 player2 winner_id', 'username profilePicture _id');
    

        io.to(gameId).emit("move_made", updatedGame.toObject());
    
      } catch (error) {
        console.error("Error handling forfeit:", error);
        socket.emit("error", { message: "Error handling forfeit" });
      }
    });
    
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};

export { socketConfig };