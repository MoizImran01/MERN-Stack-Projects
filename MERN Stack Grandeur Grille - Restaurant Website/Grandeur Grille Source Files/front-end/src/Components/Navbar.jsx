import React, { useContext, useState } from 'react';
import './Navbar.css';
import logoimg from '../../assets/logo.png';

import cartimg from '../../assets/cart.png';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../../assets/assets.js'

const Navbar = ({setShowLogin}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  const {token, setToken} = useContext(StoreContext);
  const { cartItems } = useContext(StoreContext);

// Calculate total items in cart
const totalItems = Object.values(cartItems || {}).reduce((sum, val) => sum + val, 0);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("")
    navigate("/")
  }
  return (
    <div className='navbar-container'>
      <div className="navbar-logo">
        <Link to='/'> <img src={logoimg} alt="Logo" className="logo" /></Link>
      </div>

      <div className={`navbar-center ${isMenuOpen ? 'open' : ''}`}>
        <p onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</p>
        <p
  onClick={() => {
    setMenu("menu");
    window.location.href = "/#menu"; 
  }}
  className={menu === "menu" ? "active" : ""}
>
  Menu
</p>
      <p
  onClick={() => {
    setMenu("aboutus");
    window.location.href = "/#footer";
  }}
  className={menu === "aboutus" ? "active" : ""}
>
  About Us
</p>
<p
  onClick={() => {
    setMenu("contactus");
    window.location.href = "/#footer";
  }}
  className={menu === "contactus" ? "active" : ""}
>
  Contact Us
</p>

      </div>

      <div className="navbar-right">
        {!token?<button className="signup-btn" onClick={()=>setShowLogin(true)}>
          Login
        </button>
        :<div className='navbar-profile-icon'>
          <img src={assets.custom_profile}/>
          <ul className="profile-nav-dropdown">
            <li onClick={()=>{navigate('/myorders')}}><img src={assets.bag_icon}/><p>Orders</p></li>
              <hr/>
            <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
          </ul>
          </div>}
       <Link to='/cart' className="cart-icon-wrapper">
  <img className='cart' src={cartimg} alt="Cart"/>
  {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
</Link>

        <button className="menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
