import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Header from './Header';
import './Header.css'; 
import '../../App'

gsap.registerPlugin(ScrollTrigger); 

const HeaderComponent = () => {
  useEffect(() => {
    
    gsap.to('.head-container', {
      y: '-100%', 
     
      scrollTrigger: {
        trigger: '.background',
        start: 'center center',
        end: 'bottom top',
        scrub: 1, 
      
      }
    });
  }, []); 

  return (
    <div className="head-container">
      <Header />
    </div>
  );
};

export default HeaderComponent;
