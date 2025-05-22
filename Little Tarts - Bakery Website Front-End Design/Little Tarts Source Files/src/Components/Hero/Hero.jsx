import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Hero.css';
import Clouds from '../../assets/clouds.png'
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroTextsRef = useRef(null);

  useEffect(() => {
    const heroTexts = heroTextsRef.current;

    if (heroTexts && isVisible) {
      console.log('Animating...');
      const t1 = gsap.timeline();
      t1.fromTo(
        '.hero-texts',
        {
          opacity: 0,
          y: '20%',
        },
        {
          opacity: 1,
          y: '0%',
          ease: 'power4.out',
          duration: 1.8,
       
        }
      );
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Visible in viewport');
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, 
      }
    );

    observer.observe(heroTextsRef.current);


    return () => {
      if (heroTextsRef.current) {
        observer.unobserve(heroTextsRef.current);
      }
    };
  }, []);

  return (
    <div data-scroll data-scroll-section data-scroll-speed='0.4'className='hero-container'>
      <div ref={heroTextsRef} className="hero-texts">
        <p className="text">
          THIS IS MR. POPS.
          HE'LL COME IN EVEN TO THOSE
          WHO ARE COMPLETELY INDIFFERENT
          TO ICE CREAM.
        </p>
      </div>
    
    </div>
  );
};

export default Hero;
