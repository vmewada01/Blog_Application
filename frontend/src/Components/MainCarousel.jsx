import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@chakra-ui/react";
import "./style/MainCarousel.css";
const MainCarousel = () => {
  return (
    <Carousel className="mainslide">
      <Box>
        <img
          src="https://user-images.githubusercontent.com/101567054/209388416-259c20f0-b198-4a44-a7ad-283bd494e78f.png"
          alt={"patel_family"}
        />
      </Box>
      <Box>
        <img
          src="https://user-images.githubusercontent.com/101567054/209346388-1f58b72b-a088-4c88-a838-395227c295b3.png"
          alt={"patel_family"}
        />
      </Box>
      <Box>
        <img
          src="https://user-images.githubusercontent.com/101567054/210171003-18d9abf7-d066-4092-951e-306bb5b3f073.png"
          alt={"patel_family"}
        />
      </Box>
      <Box>
        <img
          src="https://user-images.githubusercontent.com/101567054/210171082-1cf9c720-34cb-4b39-b9b5-848c25668631.png"
          alt={"patel_family"}
        />
      </Box>
      <Box>
        <img
          src="https://user-images.githubusercontent.com/101567054/210170929-821a59fe-d6af-4f8e-ad85-92087f24fbfa.png"
          alt={"patel_family"}
        />
      </Box>
    </Carousel>
  );
};

export default MainCarousel;
