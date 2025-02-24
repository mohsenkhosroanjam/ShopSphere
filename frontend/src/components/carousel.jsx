import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),

    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          listStyle: "none",
          background: "rgba(0, 0, 0, 0.5)", // Dark background for better visibility
          padding: "8px",
          borderRadius: "12px",
        }}
      >
        <ul style={{ display: "flex", gap: "10px", padding: 0, margin: 0 }}>{dots}</ul>
      </div>
    ),

    customPaging: i => (
      <div
        style={{
          width: "12px", // Fixed size for all dots
          height: "12px",
          borderRadius: "50%",
          backgroundColor: i === activeIndex ? "#ffffff" : "rgba(255, 255, 255, 0.4)", // Darker when active
          border: "2px solid white",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.6)", // Adds better visibility
          transition: "background-color 0.3s ease-in-out",
        }}
      />
    ),
  };

  return (
    <div style={{ margin: "0 auto", position: "relative" }} className="md:w-[100%]">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Carousel;
