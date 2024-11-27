import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import data from '../data/data.json';
import '../css/Carousel.css';

export default function CustomCarousel() {
  return (
    <Carousel className='custom-carousel'>
      {data.carousel.map((item, index) => (
        <Carousel.Item key={index}>
            <a href={item.link} target="_blank">
              <img
                className="d-block w-100"
                src={item.img}
                alt={`Slide ${index + 1}`}
              />
            </a>
            <Carousel.Caption>
              <h3>{item.captionTitle}</h3>
              <p>{item.captionText}</p>
            </Carousel.Caption>
          </Carousel.Item>
      ))}
    </Carousel>
  );
}
