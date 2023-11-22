import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="p-2">
      <div className=''>
        <img src="https://gamikey.com/wp-content/uploads/2023/08/Banner-Kapersky.png.webp" alt="Slide 1" className='rounded-3xl w-full' />
      </div>
      <div className='max-h-full'>
        <img src="https://gamikey.com/wp-content/uploads/2023/08/Banner-Discord.png.webp" alt="Slide 2" className='rounded-3xl w-full' />
      </div>
      <div>
        <img src="https://gamikey.com/wp-content/uploads/2023/09/Adobe-Pro-Edition-Banner-1536x768.png" alt="Slide 3" className='rounded-3xl w-full' />
      </div>
      {/* Thêm nhiều slide khác nếu cần */}
    </Slider>
  );
};

export default FeaturedSlider;
