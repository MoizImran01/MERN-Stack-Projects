import React from 'react';
import './Clouds.css'; 
import cloudimg from '../../assets/cloud.png';
import happyheartimg from '../../assets/happyheart.png';
import toffeeimg from '../../assets/toffee.png';


const Clouds = () => {
  return (
    <div className='images-marquee-container'>
      <div className='images-marquee-sec'>
        <div className="images-marquee">
          <div className="cloud-marquee__group">
            <img src={cloudimg} alt="Cloud" />
            <img src={cloudimg} alt="Cloud" />
            <img src={cloudimg} alt="Cloud" />
          </div>
          <div className="cloud-marquee__group" aria-hidden="true">
            <img src={cloudimg} alt="Cloud" />
            <img src={cloudimg} alt="Cloud" />
            <img src={cloudimg} alt="Cloud" />
          </div>
        </div>
        <div className="marqueehappyheart">
          <div className="marquee__grouphappyheart">
            <img src={happyheartimg} alt="Happy Heart" />
            <img src={happyheartimg} alt="Happy Heart" />
            <img src={happyheartimg} alt="Happy Heart" />
          </div>
          <div className="marquee__grouphappyheart" aria-hidden="true">
            <img src={happyheartimg} alt="Happy Heart" />
            <img src={happyheartimg} alt="Happy Heart" />
            <img src={happyheartimg} alt="Happy Heart" />
          </div>
        </div>
      </div>
      <div className='marquee-toffee'>
        <div className="marquee__grouptoffee">
          <img src={toffeeimg} alt="Toffee" />
          <img src={toffeeimg} alt="Toffee" />
          <img src={toffeeimg} alt="Toffee" />
        </div>
        <div className="marquee__grouptoffee" aria-hidden="true">
          <img src={toffeeimg} alt="Toffee" />
          <img src={toffeeimg} alt="Toffee" />
          <img src={toffeeimg} alt="Toffee" />
        </div>
      </div>
    </div>
  );
};

export default Clouds;
