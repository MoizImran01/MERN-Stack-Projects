import React from 'react'
import './Home.css'
import aboutimg from '../../assets/about.jpg'
import Hero from '../Hero/Hero'
import Clouds from '../Clouds/Clouds'
import left from '../../assets/homeleft.jpg'
import right from '../../assets/homeright.jpg'
const Home = () => {
  return (
    <div className='home-container'>
        <Hero/>
        <div className="home-top">
        <Clouds/>
        <div  className="about-us-img">
       
            <img className='about-img'src={aboutimg}/>
            

        </div>
        </div>
      
        <div className="home-bottom">
            <div data-scroll data-scroll-section data-scroll-speed='0.15' className="left-img">
        <img className='home-left'src={left}/>
        </div>
        <div className="text-content">
        <h3 className='home-header'>WHO HAS TRIED IT, KNOWS EVERYTHING. THOSE WHO HAVEN'T - GET READY FOR THE DOPAMINE THIRST OF "THAT VERY TASTE"</h3>
        <div className="paragraph-container">
            <p className='home-text'>Our goal is not ice cream. It would be quite simple. We need to make you "touched" when you, for example, bite into an Eskimo. It is difficult to do, but we do it.</p>

            <p className='home-text'>How? We do not tolerate simplifications: neither in tastes, nor in ingredients, nor in production. Pistachio, for example, we buy on a farm in the Bronte region, Sicily. We order Alfonso mango from India, and chocolate is brought to us directly from Belgium. Our Japanese matcha tea is exclusively of the Sagano variety.</p>
        </div>
        <div className="aboutusbtn">
            <button className='about'> <span>About Us</span></button>
        </div>
        </div>
        <div data-scroll data-scroll-section data-scroll-speed='0.15' className="right-img">
        <img className='home-right'src={right}/>
        </div>
       
        </div>
        </div>
   
  )
}

export default Home