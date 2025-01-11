import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ children }) => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite looping
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Auto-scroll enabled
    autoplaySpeed: 3000, // Auto-scroll speed in ms
  };

  return (
    <div style={{ margin: "0 auto" }} className="md:w-[100%]">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;
