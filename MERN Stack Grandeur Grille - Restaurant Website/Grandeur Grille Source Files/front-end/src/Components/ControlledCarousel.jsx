import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import img1 from '../../assets/dish1.jpg';
import img2 from '../../assets/dish2.jpg';
import pastas from '../../assets/pasta.jpg';
import noodles from '../../assets/noodle1.jpg';
import './ControlledCarousel.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="d-flex justify-content-center">
      <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel" style={{ maxWidth: '1530px' }}>
        <Carousel.Item>
          <div className="image-container">
            <ExampleCarouselImage src={img1} text="Crispy Roll" />
          </div>
          <Carousel.Caption>
            <h2 className="header-text">Crispy Paratha Roll</h2>
            <p className="header-text1">Utmost Crispiness.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image-container">
            <ExampleCarouselImage src={noodles} text="Korean Noodles" />
          </div>
          <Carousel.Caption>
            <h2 className="header-text">Korean Noodles</h2>
            <p className="header-text1">Noodles with a twist.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image-container">
            <ExampleCarouselImage src={pastas} text="Japanese" />
          </div>
          <Carousel.Caption>
            <h2 className="header-text">Alfredo Pasta</h2>
            <p className="header-text1">Prepared with love.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
