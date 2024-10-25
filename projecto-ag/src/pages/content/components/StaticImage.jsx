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
      <a
        className="carousel-container-classification"
        href="https://almendragala.com"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <img
          src="https://picsum.photos/1200/600"
          alt="placeholder"
          className="classification-image"
        ></img>
      </a>
    );
  } else {
    return (
      <a
        href={component.link}
        style={{ marginTop: 30, marginBottom: 30, maxWidth: "100%" }}
      >
        <img
          src={component.imagesUrl[0]}
          alt={component.title}
          className="classification-image"
          style={{ width: "90%", height: "auto" }}
        ></img>
      </a>
    );
  }
};

export default StaticImage;
