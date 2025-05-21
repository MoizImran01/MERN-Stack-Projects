import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import './waiting.css';

const WaitingRoom = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [searching, setSearching] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!socket || !userInfo) return;

    console.log("Starting matchmaking for:", userInfo.username);
    console.log("Matchaming for :  ", userInfo.userId)
    socket.emit('find_match', {
      playerUsername: userInfo.username,
      playerId: userInfo.userId,
      playerProfilePic : userInfo.profilePic
    });

    socket.on('match_found', (matchData) => {
      setSearching(false);
      console.log("game id recoeved from socket config : ", matchData.gameId)
      

      navigate('/matchfound', {
        state: {
          gameId: matchData.gameId,
          playerId: matchData.playerId,          
          opponentId: matchData.opponentId,     
          playerRole: matchData.playerRole,
          playerColor: matchData.playerColor,
          opponentColor: matchData.opponentColor,
          opponentUsername: matchData.opponentUsername,
          opponentProfilePic: matchData.opponentProfilePic,

        }
      });
    });

    socket.on('matchmaking_error', (error) => {
      console.error("Matchmaking error:", error);
      alert("Matchmaking failed: " + error.message);
      navigate('/home');
    });

    return () => {
      socket.off('match_found');
      socket.off('matchmaking_error');
    };
  }, [socket, navigate, userInfo]);

  const cancelMatchmaking = () => {
    if (socket && searching) {
      socket.emit('cancel_match');
      navigate('/home');
    }
  };

  return (
    <>
      <header className="navbar">
        <a href="/home" className="nav-logo">🎨 ColorGrid</a>
        <div className="nav-right">
          <span className="coins">💰 <span id="coinBalance">{userInfo?.coins || 0}</span></span>
          <div className="profile-dropdown">
            <img
              src={userInfo?.profilePic || "https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain"}
              alt="Profile"
              className="profile-pic"
            />
            <span className="username">{userInfo?.username || "Player"}</span>
            <div className="dropdown-menu">
              <a href="/update-profile">Update Profile</a>
              <a href="/welcome">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main className="waiting-container">
        <h1 className="waiting-title">
          {searching ? 'Waiting for Opponent…' : 'Match Found!'}
        </h1>
        <p className="waiting-subtitle">
          {searching ? 'Matchmaking in progress' : 'Redirecting to game...'}
        </p>
        {searching && (
          <button id="cancelBtn" className="btn btn-secondary" onClick={cancelMatchmaking}>
            Cancel
          </button>
        )}
      </main>
    </>
  );
};

export default WaitingRoom;