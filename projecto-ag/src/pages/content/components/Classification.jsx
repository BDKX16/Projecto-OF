import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../content.css"; // Archivo CSS para estilos personalizados

const images = [
  "https://via.placeholder.com/240x180/FF5733/FFFFFF?text=Image+1",
  "https://via.placeholder.com/240x180/33FF57/FFFFFF?text=Image+2",
  "https://via.placeholder.com/240x180/3357FF/FFFFFF?text=Image+3",
  "https://via.placeholder.com/240x180/FF33A1/FFFFFF?text=Image+4",
  "https://via.placeholder.com/240x180/33FFF5/FFFFFF?text=Image+5",
  "https://via.placeholder.com/240x180/F5FF33/FFFFFF?text=Image+6",
  "https://via.placeholder.com/240x180/FF5733/FFFFFF?text=Image+7",
  "https://via.placeholder.com/240x180/33FF57/FFFFFF?text=Image+8",
  "https://via.placeholder.com/240x180/FF5733/FFFFFF?text=Image+1",
  "https://via.placeholder.com/240x180/33FF57/FFFFFF?text=Image+2",
  "https://via.placeholder.com/240x180/3357FF/FFFFFF?text=Image+3",
  "https://via.placeholder.com/240x180/FF33A1/FFFFFF?text=Image+4",
  "https://via.placeholder.com/240x180/33FFF5/FFFFFF?text=Image+5",
  "https://via.placeholder.com/240x180/F5FF33/FFFFFF?text=Image+6",
  "https://via.placeholder.com/240x180/FF5733/FFFFFF?text=Image+7",
  "https://via.placeholder.com/240x180/33FF57/FFFFFF?text=Image+8",
];

const Classification = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container-classification">
      <h2 className="classification-title">Classification</h2>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <div className="carousel-image-container">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
              <h3 className="carousel-image-title">Title {index + 1}</h3>
              <button className="carousel-image-button">Comprar</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Classification;
