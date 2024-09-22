import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../content.css"; // Archivo CSS para estilos personalizados

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

const Carousel = ({ data }) => {
  const [component, setComponent] = useState(data.componentData);

  if (component.imagesUrl.length < 3) {
    return <></>;
  } else {
    return (
      <div className="carousel-container">
        <Slider {...settings} className="slider">
          {component.imagesUrl.map((img, index) => (
            <div key={img._id}>
              <img
                src={img.coverUrl}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
};

export default Carousel;
