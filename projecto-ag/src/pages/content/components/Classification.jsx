import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../content.css"; // Archivo CSS para estilos personalizados
import { Button } from "@mui/material";

const images = [
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202311/26/443651821/original/(m=eafTGgaaaa)(mh=Ym60x9sZcJzvznEB)7.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
  "https://ei.phncdn.com/videos/202002/25/287592862/original/(m=eafTGgaaaa)(mh=2_k5dRgwxSFTL4Sf)10.jpg",
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

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className="carousel-image-button"
                href={"video?id=" + "asdasdasdasd"}
              >
                Ver mas
              </Button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Classification;
