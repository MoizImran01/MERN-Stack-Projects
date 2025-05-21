import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    profilePic: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/signup', formData);
      console.log(response)
      if (response.data.token) {
       
        localStorage.setItem('token', response.data.token);
        let profilePic = ""
        if (response.data.profilePic)
        {
          profilePic = response.data.profilePic
          console.log("thhis route called")
        }
        else

        {
          profilePic = 'https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain'
        }
        const userInfo = {
          userId: response.data._id,
          username: formData.username, 
          profilePic: profilePic,
          token: response.data.token,
          coins: response.data.coins


        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
  
        navigate('/home');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  
  
  

  return (
    <main className="auth-container">
      <h1 className="auth-title">Sign Up</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="profilePic">Profile Picture URL (optional)</label>
        <input
          id="profilePic"
          name="profilePic"
          type="url"
          value={formData.profilePic}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="auth-footer">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </main>
  );
};

export default SignUp;