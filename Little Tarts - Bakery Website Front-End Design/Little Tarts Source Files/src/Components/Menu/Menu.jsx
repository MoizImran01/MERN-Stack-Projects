import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Menu.css';
import butterscoth from '../../assets/butter-scotch.jpg';
import chocolatefudge from '../../assets/chocolate-fudge.jpg';
import revelvet from '../../assets/red-velvet.jpg';
import lemoncake from '../../assets/lemon.jpg';
import blackforrest from '../../assets/black-forrest.jpg';
import chocolatetruffle from '../../assets/chocolate-trufffle.jpg';
import coffee from '../../assets/coffe.jpg';
import nyc from '../../assets/nyc-cheesecake.jpg';
import carticon from '../../assets/cart.png';

const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const menuHeaderRef = useRef(null);

  useEffect(() => {
    const menuHeader = menuHeaderRef.current;

    if (menuHeader && isVisible) {
      const t1 = gsap.timeline();
      t1.fromTo(
        '.menu-header-text',
        {
          opacity: 0,
          y: '90%',
        },
        {
          opacity: 1,
          y: '0%',
          ease: 'back',
          duration: 1,
        }
      );
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(menuHeaderRef.current);

    return () => {
      if (menuHeaderRef.current) {
        observer.unobserve(menuHeaderRef.current);
      }
    };
  }, []);

  return (
    <div className='menu-container'>
      <div className="menu-header" ref={menuHeaderRef}>
        <h1 className="menu-header-text">
          POPULAR FLAVOURS
        </h1>
      </div>
      <div className="menu-grid">
        <div className="top-menu-grid">
          <div className="menu-item">
            <div className="topmenu-icon">
              <img className='butter' src={butterscoth} alt="Butter-scotch" />
            </div>
            <div className="bottom-text-container">
              <div className="bottom-text">
                <div className="toptext">
                  <p>Butter-scotch</p>
                </div>
                <div className="btm-text">
                  <p>Serving 8 people</p>
                  <p>1 IBS</p>
                </div>
              </div>
              <button className="cart">
                <img src={carticon} alt="Cart" />
              </button>
            </div>
          </div>
          <div className="menu-item">
            <div className="topmenu-icon">
              <img className='butter' src={chocolatefudge} alt="Chocolate Fudge" />
            </div>
            <div className="bottom-text-container">
              <div className="bottom-text">
                <div className="toptext">
                  <p>Chocolate Fudge</p>
                </div>
                <div className="btm-text">
                  <p>Serving 8 people</p>
                  <p>1 IBS</p>
                </div>
              </div>
              <button className="cart">
                <img src={carticon} alt="Cart" />
              </button>
            </div>
          </div>
          <div className="menu-item">
            <div className="topmenu-icon">
              <img className='butter' src={revelvet} alt="Red Velvet" />
            </div>
            <div className="bottom-text-container">
              <div className="bottom-text">
                <div className="toptext">
                  <p>Red Velvet</p>
                </div>
                <div className="btm-text">
                  <p>Serving 8 people</p>
                  <p>1 IBS</p>
                </div>
              </div>
              <button className="cart">
                <img src={carticon} alt="Cart" />
              </button>
            </div>
          </div>
          <div className="menu-item">
            <div className="topmenu-icon">
              <img className='butter' src={lemoncake} alt="Lemon Cake" />
            </div>
            <div className="bottom-text-container">
              <div className="bottom-text">
                <div className="toptext">
                  <p>Lemon Cake</p>
                </div>
                <div className="btm-text">
                  <p>Serving 8 people</p>
                  <p>1 IBS</p>
                </div>
              </div>
              <button className="cart">
                <img src={carticon} alt="Cart" />
              </button>
            </div>
          </div>
          <div className="menu-item">
            <div className="topmenu-icon">
              <img className='butter' src={blackforrest} alt="Black Forrest" />
            </div>
            <div className="bottom-text-container">
              <div className="bottom-text">
                <div className="toptext">
                  <p>Black Forrest</p>
                </div>
                <div className="btm-text">
                  <p>Serving 8 people</p>
                  <p>1 IBS</p>
                </div>
              </div>
              <button className="cart">
                <img src={carticon} alt="Cart" />
              </button>
            </div>
          </div>
          <div className="menu-item">
            <div className="topmenu-icon">
              <img className='butter' src={chocolatetruffle} alt="Chocolate Truffle" />
            </div>
            <div className="bottom-text-container">
              <div className="bottom-text">
                <div className="toptext">
                  <p>Chocolate Truffle</p>
                </div>
                <div className="btm-text">
                  <p>Serving 8 people</p>
                  <p>1 IBS</p>
                </div>
              </div>
              <button className="cart">
                <img src={carticon} alt="Cart" />
              </button>
            </div>
          </div>
          <div className="menu-item">
            <div className="topmenu-icon">
              <img className='butter' src={coffee} alt="Coffee" />
            </div>
            <div className="bottom-text-container">
              <div className="bottom-text">
                <div className="toptext">
                  <p>Coffee</p>
                </div>
                <div className="btm-text">
                  <p>Serving 8 people</p>
                  <p>1 IBS</p>
                </div>
              </div>
              <button className="cart">
                <img src={carticon} alt="Cart" />
              </button>
            </div>
          </div>
          <div className="menu-item">
            <div className="topmenu-icon">
              <img className='butter' src={nyc} alt="NYC Cheesecake" />
            </div>
            <div className="bottom-text-container">
              <div className="bottom-text">
                <div className="toptext">
                  <p>NYC Cheesecake</p>
                </div>
                <div className="btm-text">
                  <p>Serving 8 people</p>
                  <p>1 IBS</p>
                </div>
              </div>
              <button className="cart">
                <img src={carticon} alt="Cart" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="all-flavours-btn">
        <button className='all-flavours'><span>  All Flavours </span></button>
      </div>
    </div>
  );
};

export default Menu;
