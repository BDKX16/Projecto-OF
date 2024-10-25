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

const Classification = ({ data, demo }) => {
  const [component, setComponent] = useState(data.componentData);
  const [imagesUrl, setImagesUrl] = useState([]);
  useEffect(() => {
    if (component.imagesUrl.length < 5 && component.imagesUrl.length > 1) {
      let newImagesUrl = [...component.imagesUrl];
      while (newImagesUrl.length < 5) {
        newImagesUrl = newImagesUrl.concat(component.imagesUrl);
      }
      setImagesUrl(newImagesUrl);
    }
  }, [component]);
  if (demo === true) {
    return (
      <div className="carousel-container-classification">
        <Typography
          variant="h2"
          component="h2"
          color="text.primary"
          backgroundColor="primary.main"
          fontSize={30}
          className="classification-title"
          style={{
            marginBottom: "1rem",
            marginLeft: "0.3rem",
            marginTop: "1rem",
          }}
        >
          {data.componentName.toUpperCase()}
        </Typography>{" "}
        <Slider {...settings}>
          {[...Array(5)].map((img, index) => (
            <div key={index}>
              <div className="carousel-image-container">
                <img
                  src={"https://picsum.photos/150/150"}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                />
                <h3 className="carousel-image-title">Title {index + 1}</h3>

                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  className="carousel-image-button"
                >
                  Ver mas
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  } else if (component.imagesUrl.length < 3) {
    return <></>;
  } else {
    return (
      <div className="carousel-container-classification">
        <Typography
          variant="h2"
          component="h2"
          color="text.primary"
          backgroundColor="primary.main"
          fontSize={30}
          className="classification-title"
          style={{
            marginBottom: "1rem",
            marginLeft: "0.3rem",
            marginTop: "1rem",
          }}
        >
          {data.componentName.toUpperCase()}
        </Typography>
        <Slider {...settings}>
          {imagesUrl.map((img, index) => (
            <div key={img._id}>
              <div className="carousel-image-container">
                <img
                  src={img.coverUrl || "https://via.placeholder.com/150"}
                  alt={`Slide ${img.title}`}
                  className="carousel-image"
                />
                <Box height={34}>
                  <Typography
                    variant="h3"
                    component="h3"
                    fontSize={14}
                    color="text.primary"
                    textAlign="start"
                    mt={1}
                    mb={1}
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {img.title}
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  className="carousel-image-button"
                  href={"video?id=" + img._id}
                >
                  Ver mas
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
};

export default Classification;
