import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './gameplay.css';
import clickSound from '../../../../server/utils/pattern.mp3';
const GamePlay = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [cells, setCells] = useState(Array(25).fill(''));
  const [status, setStatus] = useState('Loading...');
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [showForfeitButton, setShowForfeitButton] = useState(true);
  const [username, setUsername] = useState('You');
  const [profilePic, setProfilePic] = useState('');
  const [coinBalance, setCoinBalance] = useState(0);
  const [opponentName, setOpponentName] = useState('Opponent');
  const [opponentPic, setOpponentPic] = useState('');
  const [playerRole, setPlayerRole] = useState(null);
  const [playerColor, setPlayerColor] = useState('');
  const [opponentColor, setOpponentColor] = useState('');
  const [ended, setEnded] = useState(false);
  const activeGameId = state.gameId;
  const clickAudio = new Audio(clickSound);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
      return;
    }

    if (!activeGameId) {
      console.error("No gameId found in state");
      navigate('/home');
      return;
    }

    setUsername(userInfo.username);
    setCoinBalance(userInfo.coins);
    setProfilePic(userInfo.profilePic || 'https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain');
    setOpponentName(state.opponentUsername || 'Opponent');
    setOpponentPic(state.opponentProfilePic|| 'https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain');

    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    initializeGame({
      gameId: activeGameId,
      player1: {
        _id: state.playerId,
        username: userInfo.username,
        profilePicture: userInfo.profilePic
      },
      player2: {
        _id: state.opponentId,
        username: state.opponentUsername,
        profilePicture: state.opponentPic
      },
      player1Color: state.playerColor,
      player2Color: state.opponentColor,
      currentPlayer: 'player1',
      grid: Array(5).fill().map(() => Array(5).fill(''))
    }, userInfo.userId);

    newSocket.emit('join_game', { gameId: activeGameId });

    newSocket.on('move_made', (gameData) => {
      setCells(gameData.grid.flat());
      updateTurnStatus(gameData, state.playerRole);
      if (gameData.result !== 'ongoing') {
        handleGameEnd(gameData);
      }
    });

    newSocket.on('error', (error) => {
      setStatus(`Error: ${error.message}`);
    });

    return () => {
      newSocket.off('move_made');
      newSocket.off('error');
      newSocket.disconnect();
    };
  }, [navigate, state, activeGameId]);

  const initializeGame = (gameData, userId) => {
    const role = state.playerRole;
    setPlayerRole(role);
   

    
    setPlayerColor(role === 'player1' ? '#FF90BB' : '#8ACCD5');
    setOpponentColor(role === 'player1' ? '#8ACCD5' : '#FF90BB');
    setCells(gameData.grid?.flat() || Array(25).fill(''));
    updateTurnStatus(gameData, role);
  };

  const updateTurnStatus = (gameData, role) => {
    const isMyTurn = gameData.currentPlayer === role;
    setStatus(isMyTurn ? 'Your Turn' : "Opponent's Turn");
  };

  const handleGameEnd = (gameData) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const playerId = userInfo.userId;
    const winner = gameData.winner_id || {};
    setCells(gameData.grid.flat());

    let statusMessage = '';
    if (gameData.result === 'draw') {
      statusMessage = 'Game ended in a draw!';
    } else {
      const isWinner = winner._id?.toString() === playerId.toString();
      statusMessage = isWinner ? 'You Won! (+200 coins)' : 'You Lost (-200 coins)';
      const latestInfo = JSON.parse(localStorage.getItem('userInfo'));
      const latestCoins = latestInfo.coins;
      const newBalance = isWinner ? latestCoins + 200 : Math.max(0, latestCoins - 200);
      setCoinBalance(newBalance);
      const updatedUserInfo = { ...latestInfo, coins: newBalance };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    }

    setStatus(statusMessage);
    setShowPlayAgain(true);
    setShowForfeitButton(false); 
    setEnded(true);
  };

  const handleCellClick = (index) => {
    if (!socket || cells[index] !== "" || status !== "Your Turn") return;
    const row = Math.floor(index / 5);
    const col = index % 5;
    clickAudio.play();
    socket.emit('make_move', {
      gameId: activeGameId,
      row,
      col,
      playerRole
    });
  };
  

  const handleForfeit = () => {
    if (!socket) return;
    socket.emit('forfeit_game', {
      gameId: activeGameId,
      playerRole
    });
  };

  const handlePlayAgain = () => {
    navigate('/newgame/waiting');
  };

  return (
    <>
      <header className="navbar">
        <a href="/home" className="nav-logo">🎨 ColorGrid</a>
        <div className="nav-right">
          <span className="coins">💰 <span>{coinBalance}</span></span>
          <div className="profile-dropdown">
            <img
              src={profilePic || 'https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain'}
              alt="Profile"
              className="profile-pic"
            />
            <span className="username">{username}</span>
            <div className="dropdown-menu">
              <a href="/update-profile">Update Profile</a>
              <a href="/">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main className="game-container">
        <div className="players-header">
          <div className="player">
            <img
              src={profilePic || 'https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain'}
              alt="You"
              style={{ width: 100, height: 100 }}
            />
            <span>{username}</span>
          </div>
          <span className="vs">VS</span>
          <div className="player">
            <img
              src={opponentPic || 'https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain'}
              alt={opponentName}
              style={{ width: 100, height: 100 }}
            />
            <span>{opponentName}</span>
          </div>
        </div>

        <div className="grid">
          
          {cells.map((color, index) => (
            <div
            key={index}
            className="cell"
            style={{ backgroundColor: color || 'white' }}
            onClick={() => handleCellClick(index)}
          ></div>
          ))}
        </div>

        <div className="status-area">
          <p>Status: <strong>{status}</strong></p>

          {showForfeitButton && (
            <button className="btn btn-secondary" onClick={handleForfeit}>
              Forfeit
            </button>
          )}

          {showPlayAgain && (
            <button className="btn btn-primary" onClick={handlePlayAgain}>
              Play Again
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default GamePlay;
