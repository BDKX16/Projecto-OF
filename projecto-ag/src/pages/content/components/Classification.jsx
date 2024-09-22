import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../content.css"; // Archivo CSS para estilos personalizados
import { Button } from "@mui/material";

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

const Classification = ({ data }) => {
  const [component, setComponent] = useState(data.componentData);
  const [imagesUrl, setImagesUrl] = useState([]);
  useEffect(() => {
    if (component.imagesUrl.length < 5) {
      let newImagesUrl = [...component.imagesUrl];
      while (newImagesUrl.length < 5) {
        newImagesUrl = newImagesUrl.concat(component.imagesUrl);
      }
      setImagesUrl(newImagesUrl);
    }

    //console.log(component);
  }, [component]);
  if (component.imagesUrl.length < 2) {
    return <></>;
  } else {
    return (
      <div className="carousel-container-classification">
        <h2 className="classification-title">
          {data.componentName.toUpperCase()}
        </h2>
        <Slider {...settings}>
          {imagesUrl.map((img, index) => (
            <div key={img._id}>
              <div className="carousel-image-container">
                <img
                  src={img.coverUrl}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                />
                <h3 className="carousel-image-title">Title {index + 1}</h3>

                <Button
                  type="submit"
                  color="primary"
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
