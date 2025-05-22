// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (

    <div className="footer">
        <div className="heading">
            <h1 className='footer-heading'>HAVE ANY QUESTIONS? THEN THERE IS AN ANSWER!</h1>
        </div>
        <div className="first-container">
            <div className="subject-box">
                <input className='subject' type="text" placeholder='Subject'></input>
            </div>
            <div className="city-box">
            <input type="text" placeholder='City'></input>
            </div>
            </div>
            <div className="second-container">
            <div className="name-box">
                <input type="text" placeholder='Your Name'></input>
            </div>
            <div className="phone-box">
            <input type="text" placeholder='Phone'></input>
            </div>
            <div className="email-box">
            <input type="text" placeholder='Email'></input>
            </div>
            </div>
            <div className="third-container">
            <div className="message-box">
            <input type="text" placeholder='Type Your Message'></input>
            </div>
         
            </div>
            <div className="submit-btn">
                <button className="submit"><span>
                    SUBMIT
                    </span>
                </button>
                </div>
                <div className="social-media">
         
                <a href="#" className="footer-link">Facebook</a>
                <a href="#" className="footer-link">Snapchat</a>
                <a href="#" className="footer-link">Instagram</a>
                
                </div>
            <div className="bottom">
                <p className='btm-footer'>© Little Tarts</p>
                <p className= 'btm-footer'>
                    Made by Moiz
                </p>
            </div>
          

        </div>
    
    
  );
};

export default Footer;
