import React from 'react';
import map from 'lodash/map';
import { CarouselItem } from './CarouselItem';
import './Carousel.css';

export const Carousel = ({ items }) => {
  return (
    <div className="Carousel">
      {map(items, (props, idx) => {
        return <CarouselItem key={idx} {...props} />;
      })}
    </div>
  );
};
