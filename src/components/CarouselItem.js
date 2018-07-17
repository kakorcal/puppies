import React from 'react';
import './CarouselItem.css';

export const CarouselItem = ({ id, title, imgUrl }) => {
  return (
    <div className="CarouselItem">
      <img className="CarouselItem__art" src={imgUrl} alt="dog" />
    </div>
  );
};
