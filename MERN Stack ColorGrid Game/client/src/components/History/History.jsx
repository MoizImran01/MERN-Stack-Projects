import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';


const GameHistory = () => {
  const [coinBalance, setCoinBalance] = useState(1000);
  const [username, setUsername] = useState('You');
  const [profilePic, setProfilePic] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUsername(userInfo.username);
      setProfilePic(userInfo.profilePic);
      setCoinBalance(userInfo.coins);
      axios.get('http://localhost:8000/history', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      .then(res => setHistory(res.data))
      .catch(err => console.error('Failed to load history:', err));
    }
  }, []);

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
              <a href="/">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main className="history-container">
        <h1 className="history-title">Your Game History</h1>

        {history.length === 0 ? (
          <p className="no-history">You haven't played any games yet.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Game ID</th>
                <th>Opponent</th>
                <th>Result</th>
                <th>Date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {history.map((game, index) => (
                <tr key={index}>
                  <td>{game.gameId}</td>
                  <td>{game.opponent}</td>
                  <td>{game.result}</td>
                  <td>{new Date(game.endedAt).toLocaleDateString()}</td>
                  <td><a href={`/history-detail/${game.gameId}`}>Details</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default GameHistory;
