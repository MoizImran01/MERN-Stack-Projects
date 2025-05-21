import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 


const Home = () => {
  const [username, setUsername] = useState('Player1');
  const [profilePic, setProfilePic] = useState('');
  const [coinBalance, setCoinBalance] = useState(1000);
  const navigate = useNavigate();

  useEffect(() => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log("profile pic receievedd is : ", userInfo.profilePic)
    if (userInfo) {
      setUsername(userInfo.username);
      setProfilePic(userInfo.profilePic);
      setCoinBalance(userInfo.coins);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleUpdateProfile = () => {
    navigate('/update-profile');
  };


  return (
    <>
      <header className="navbar">
        <a href="/home" className="nav-logo">🎨 ColorGrid</a>
        <div className="nav-right">
          <span className="coins">
            💰 <span id="coinBalance">{coinBalance}</span>
          </span>
          <div className="profile-dropdown">
            <img
              src={profilePic}
              alt="Profile"
              className="profile-pic"
            />
            <span className="username">{username}</span>
            <div className="dropdown-menu">
              <button onClick={handleUpdateProfile}>Update Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="home-container">
        <h1 className="home-title">Main Dashboard</h1>
        <div className="home-buttons">
          <a href="/newgame/waiting" className="btn btn-primary">Play</a>
          <a href="/leaderboard" className="btn btn-secondary">Leaderboard</a>
          <a href="/history" className="btn btn-secondary">History</a>
        </div>
      </main>
    </>
  );
};

export default Home;