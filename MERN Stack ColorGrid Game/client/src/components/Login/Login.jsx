import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/login', credentials);
  
      if (response.data.token) {

        localStorage.setItem('token', response.data.token);

       
        const userInfo = {
          userId: response.data._id,
          username: credentials.username, 
          profilePic: "https://th.bing.com/th/id/OIP.eMLmzmhAqRMxUZad3zXE5QHaHa?rs=1&pid=ImgDetMain", 
          coins: response.data.coins,   
          token: response.data.token 

        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
  
        navigate('/home');
      }
    } catch (err) {
      setError('An error occurred ', err);
    }
  };
  

  return (
    <main className="auth-container">
      <h1 className="auth-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input 
          id="username" 
          name="username" 
          type="text" 
          required 
          value={credentials.username} 
          onChange={handleChange} 
        />

        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          required 
          value={credentials.password} 
          onChange={handleChange} 
        />

        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="auth-footer">
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </main>
  );
};

export default Login;
