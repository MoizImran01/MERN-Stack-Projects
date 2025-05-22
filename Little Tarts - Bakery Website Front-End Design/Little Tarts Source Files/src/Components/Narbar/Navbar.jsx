import React from 'react';
import Logo from '../../assets/logo.jpg';
import './Navbar.css';

export const Navbar = () => {
  return (
    <div className='navbar'>
  
      <div className='navbar-left'>
        <img className='logo' src={Logo} alt="Logo" />
        <p className='logo-name'>Little Tarts</p>
      </div>
  <div className="right-nav-container">
      <div className='navbar-right'>
    
          <button className='contact-btn'><span>Contact Us</span></button>
          <button className='flavours-btn'><span>Flavours</span></button>
          <button className='menu-btn'><span>Menu</span></button>
       
      </div>
      </div>
    </div>
  );
}

export default Navbar;
