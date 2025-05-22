import React from 'react';
import TopImg from './Components/TopImg/TopImg';
import './App.css';
import Navbar from './Components/Narbar/Navbar';
import HeaderComponent from './Components/Header/HeaderComponent';
import Marquee from './Components/Marquee/Marquee';
import LocomotiveScroll from 'locomotive-scroll';


import Home from './Components/Home/Home';
import Menu from './Components/Menu/Menu';
import Footer from './Components/Footer/Footer';

const App = () => {
    const locomotiveScroll = new LocomotiveScroll();
    return (
      
            <div className='app'>
                <div className="background">
                    <Navbar />
                    <div className="top-img-container">
                        <TopImg />
                    </div>
                </div>

                <div className='header-sec'>
                    <HeaderComponent />
                </div>
        
                <div className="marquee-section">
                    <Marquee />
                </div>
               
                <div className="hero-section">
               
                 <Home/>
                </div>
               <div className="menu-section">
                <Menu/>
               </div>
              <div className="footer">
                <Footer/>
              </div>
            </div>
       
    );
}

export default App;
