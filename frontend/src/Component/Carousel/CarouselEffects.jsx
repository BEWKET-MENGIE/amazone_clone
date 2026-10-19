import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { data } from './img/Data';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from './CarouselEffects.module.css';

const CarouselEffects = () => {
  return (
    <div className={classes.carousel_container}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        interval={5000}
      >
        {data.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`carousel-img-${index}`} />
          </div>
        ))}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
};

export default CarouselEffects;