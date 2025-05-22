import React, { useState } from 'react';
import './Navbar.css';
import logoimg from '../../assets/logo.png';
import search from '../../assets/search-icon.png';
import cartimg from '../../assets/cart.png';

const Navbar = ({setShowLogin}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar-container'>
      <div className="navbar-logo">
        <img src={logoimg} alt="Logo" className="logo" />
      </div>

      <div className={`navbar-center ${isMenuOpen ? 'open' : ''}`}>
        <p onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</p>
        <p onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</p>
        <p onClick={()=>setMenu("aboutus")} className={menu==="aboutus"?"active":""}>About Us</p>
        <p onClick={()=>setMenu("contactus")} className={menu==="contactus"?"active":""}>Contact Us</p>
      </div>

      <div className="navbar-right">
        <button className="signup-btn" onClick={()=>setShowLogin(true)}>
          Sign Up
        </button>
        <img className='search' src={search} alt="Search"/>
        <img className='cart' src={cartimg} alt="Cart"/>
        <button className="menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
