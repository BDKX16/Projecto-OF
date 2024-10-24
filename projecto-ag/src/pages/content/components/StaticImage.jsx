import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../content.css"; // Archivo CSS para estilos personalizados
import { Box, Button, Typography } from "@mui/material";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const StaticImage = ({ data, demo }) => {
  const [component, setComponent] = useState(data.componentData);

  if (component.imagesUrl.length <= 0 || demo === true) {
    return (
      <>
        {demo === true && (
          <a
            className="carousel-container-classification"
            href="https://almendragala.com"
            style={{ marginTop: 30, marginBottom: 30 }}
          >
            <img
              src="https://via.placeholder.com/1200x600"
              alt="placeholder"
              className="classification-image"
            ></img>
          </a>
        )}
      </>
    );
  } else {
    return (
      <a href={component.link} style={{ marginTop: 30, marginBottom: 30 }}>
        <img
          src={component.imagesUrl[0]}
          alt={component.title}
          className="classification-image"
        ></img>
      </a>
    );
  }
};

export default StaticImage;
