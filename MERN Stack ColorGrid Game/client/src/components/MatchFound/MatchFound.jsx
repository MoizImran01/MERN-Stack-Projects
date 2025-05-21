import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './matchfound.css';

const MatchFound = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [coinBalance, setCoinBalance] = useState(0);
  const [playerUsername, setPlayerUsername] = useState('');
  const [playerProfilePic, setPlayerProfilePic] = useState('');
  const [opponentProfilePic, setOpponentProfilePic] = useState('')

  useEffect(() => {
    if (!state || !state.gameId) {
      const redirectTimer = setTimeout(() => {
        navigate('/home');
      }, 1500);
    

      return () => clearTimeout(redirectTimer);
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      if(userInfo.profilePic)
      {
        setPlayerProfilePic(userInfo.profilePic)
      }
      else
      {
        setPlayerProfilePic("https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain")
      }
    const gameStartTimer = setTimeout(() => {
      navigate(`/newgame/${state.gameId}`, {
        state: {
          gameId: state.gameId,
          playerId: state.playerId,
          opponentId: state.opponentId,
          playerRole: state.playerRole,
          playerColor: state.playerColor,
          opponentColor: state.opponentColor,
          opponentUsername: state.opponentUsername,
          opponentProfilePic: state.opponentProfilePic,
        }
      });
    }, 3000);


    const latestInfo = JSON.parse(localStorage.getItem('userInfo'));
    const latestCoins = latestInfo.coins;
    const storedUsername = localStorage.getItem('username');

    setCoinBalance(latestCoins);
    setPlayerUsername(storedUsername || "You");

    return () => clearTimeout(gameStartTimer);
  }, [state, navigate]);

  return (
    <>
      <header className="navbar">
        <a href="/home" className="nav-logo">🎨 ColorGrid</a>
        <div className="nav-right">
          <span className="coins">💰 <span id="coinBalance">{coinBalance}</span></span>
          <div className="profile-dropdown">
            <img
              src={playerProfilePic}
              alt="Profile"
              className="profile-pic"
            />
            <span className="username">{playerUsername}</span>
            <div className="dropdown-menu">
              <a href="/update-profile">Update Profile</a>
              <a href="/welcome">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main className="found-container">
        <h1 className="found-title">Match Found!</h1>
        <div className="opponent-info">
          <img
            src={state.opponentProfilePic || "https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain"}
            alt="Opponent Pic"
          />
          <p className="opponent-name">{state.opponentUsername || "Opponent"}</p>
        </div>
        <p className="found-subtitle">Game is about to start…</p>
      </main>
    </>
  );
};

export default MatchFound;
