import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './history-detail.css';

const HistoryDetail = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [coinBalance, setCoinBalance] = useState(0);
  const [username, setUsername] = useState('You');
  const [profilePic, setProfilePic] = useState('');
  const [gridColors, setGridColors] = useState(Array(25).fill('white'));
  const [resultText, setResultText] = useState('');
  const [resultClass, setResultClass] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
      return;
    }

    setUsername(userInfo.username);
    setProfilePic(userInfo.profilePic);
    setCoinBalance(userInfo.coins);

    axios.get(`http://localhost:8000/history-detail/${gameId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    .then(res => {
      const game = res.data;
      const flatGrid = game.grid.flat();
      setGridColors(flatGrid);

      if (game.result === 'draw') {
        setResultText('Draw');
        setResultClass('draw');
      } else if (game.winner_id === userInfo.userId) {
        setResultText('You Won!');
        setResultClass('won');
      } else {
        setResultText('You Lost');
        setResultClass('lost');
      }
    })
    .catch(err => {
      console.error('Failed to load game:', err);
      navigate('/history');
    });
  }, [gameId, navigate]);

  return (
    <div>
      <header className="navbar">
        <a href="/home" className="nav-logo">🎨 ColorGrid</a>
        <div className="nav-right">
          <span className="coins">
            💰 <span id="coinBalance">{coinBalance}</span>
          </span>
          <div className="profile-dropdown">
            <img
              src={profilePic || "https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain"}
              alt="Profile"
              className="profile-pic"
            />
            <span className="username">{username}</span>
            <div className="dropdown-menu">
              <a href="/update-profile">Update Profile</a>
              <a href="/welcome">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main className="snapshot-container">
        <h1 className="snapshot-title">
          Game #{gameId} Result: <span className={`result ${resultClass}`}>{resultText}</span>
        </h1>
        <div className="grid">
          {gridColors.map((color, index) => (
            <div
              key={index}
              className="cell"
              style={{ backgroundColor: color || 'white' }}
            />
          ))}
        </div>
        <a href="/history" className="btn btn-secondary">Back to History</a>
      </main>
    </div>
  );
};

export default HistoryDetail;
