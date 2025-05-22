import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import './TopImg.css'; 
import '../../App.css'; 

const TopImg = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); 

   
    gsap.to('.background-image', {
    
      width: '0.1',
      scale: '0.7',
      
      scrollTrigger: {
        trigger: '.background',
        start: 'top top',
        end: 'bottom top',
        scrub: 1, 
        pin: '.background',
       
      },
    });
  }, []);
  
  return(
  <div  className="background-image"></div>
 )
  
};

export default TopImg;
