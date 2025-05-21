import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './update-profile.css';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [coinBalance, setCoinBalance] = useState(1000); 
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
   
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUsername(userInfo.username);
      setProfilePic(userInfo.profilePic);
      setCoinBalance(userInfo.coins);
      setToken(userInfo.token);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        'http://localhost:8000/update-profile',
        { username, password, profilePic },
        config
      );
      
     



      alert('Profile updated successfully!');
      const userInfo = {
        userId: response.data._id,
        username: response.data.username, 
        profilePic: response.data.profilePic || 'https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain', 
        token: response.data.token,
        coins: response.data.coins


      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/home')
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Profile update failed. Please try again.');
    }
  };

  return (
    <div>
      <header className="navbar">
        <a href="/home" className="nav-logo">🎨 ColorGrid</a>
        <div className="nav-right">
          <span className="coins">💰 <span id="coinBalance">{coinBalance}</span></span>
          <div className="profile-dropdown">
            <img 
              src={profilePic || "https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain"} 
              alt="Profile" 
              className="profile-pic" 
            />
            <span className="username">{username}</span>
            <div className="dropdown-menu">
              <a href="/home">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main className="update-container">
        <h1 className="update-title">Update Profile</h1>
        <form className="update-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            name="username" 
            type="text" 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">New Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Leave blank to keep same password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="profilePic">Profile Picture URL</label>
          <input 
            id="profilePic" 
            name="profilePic" 
            type="url" 
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </main>
    </div>
  );
};

export default UpdateProfile;