import React from 'react'
import './Footer.css'
import footerlogo from '../../assets/footer-logo.png'
import twitter from '../../assets/twitter_icon.png'
import facebook from '../../assets/facebook_icon.png'
import linkedin from '../../assets/linkedin_icon.png'

const Footer = () => {
  return (
    <div className="footer">
    <div className='footer-container'>
        <div className="first-container">
        <img className='footer-logo' src={footerlogo}/>
        <p className='footer-para'>© Grandeur Grille 2024.</p>
        <div className="social">
        <img src={twitter}/>
        <img src={facebook}/>
        <img src={linkedin}/>
        </div>
        </div>
        <div className="second-container">
            <h2 className="footer-header1">
                Company
            </h2>
            <p className="header-para">
                Home
            </p>
            <p className="header-para">
                About Us
            </p>
            <p className="header-para">
                Delivery
            </p>
            <p className="header-para">
                Privacy Policy
            </p>
        </div>
        <div className="third-container">
        <h2 className="footer-header1">
                Get in Touch
            </h2>
            <p className="header-para">
                +92 3102275000
            </p>
            <p className="header-para">
                grandeurdiner@gmail.com
            </p>
        </div>
    </div>
    </div>
  )
}

export default Footer