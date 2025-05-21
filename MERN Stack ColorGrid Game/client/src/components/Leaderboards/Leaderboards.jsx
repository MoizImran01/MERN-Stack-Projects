import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:8000/leaderboard');
        console.log("Leaderboard data:", response.data); 

        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="navbar">
        <a href="/home" className="nav-logo">🎨 ColorGrid</a>
        <div className="nav-right">
          <span className="coins">
            💰 <span id="coinBalance">{userInfo.coins}</span>
          </span>
          <div className="profile-dropdown">
            <img
              src={userInfo.profilePic || "https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain"}
              alt="You"
              className="profile-pic"
            />
            <span className="username">You</span>
            <div className="dropdown-menu">
              <a href="/update-profile">Update Profile</a>
              <a href="/welcome">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main className="board-container">
        <h1 className="board-title">Leaderboard</h1>

        <input
          id="searchInput"
          type="text"
          placeholder="Search by username…"
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="board-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
              <th>Coins</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.wins}</td>
                  <td>{user.losses}</td>
                  <td>{user.draws}</td>
                  <td>{user.coins}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Leaderboard;
