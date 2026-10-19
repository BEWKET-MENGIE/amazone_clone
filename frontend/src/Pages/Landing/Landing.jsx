import React from 'react';
import LayOut from '../../Component/LayOut/LayOut';
import CarouselEffects from '../../Component/Carousel/CarouselEffects';
import Category from '../../Component/Category/Category';
import Product from '../../Component/Product/Product';

const Landing = () => {
  return (
    <LayOut>
      <CarouselEffects />
      <Category />
      <Product />
    </LayOut>
  );
};

export default Landing;