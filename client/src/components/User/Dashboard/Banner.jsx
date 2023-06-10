import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { bannerData } from "../constants/constants";
import { styled } from "@mui/material";
import { responsive } from "../constants/constants";

export default function Banner() {
 
  const Image = styled("img")({
    height: 280,
    width: "100%",
  });
  return (
    <Carousel
      responsive={responsive}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      swipeable={false}
      draggable={false}
    >
      {bannerData.map((data) => {
        return <Image src={data.url} />;
      })}
    </Carousel>
  );
}
