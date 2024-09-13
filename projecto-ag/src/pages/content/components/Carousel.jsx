import React from "react";
import Slider from "react-slick";
import { Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../content.css"; // Archivo CSS para estilos personalizados

const images = [
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202311/26/443651821/original/(m=eafTGgaaaa)(mh=Ym60x9sZcJzvznEB)7.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)6.jpg",
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} className="slider">
        {images.map((img, index) => (
          <div key={img}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
