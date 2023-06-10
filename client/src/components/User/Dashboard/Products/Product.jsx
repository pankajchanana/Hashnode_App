import { Box, Button, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { productBackgroundImg } from "../../constants/constants";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
// import { getProductAction } from "../../../redux/actions/getProductAction";
import Carousel from "react-multi-carousel";
import { initialProducts } from "../../constants/constants";

function Product({title}) {
  const ProductWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
    height: 330,
    width: 230,
  });

  const ProductListWrapper = styled(Box)({
    display: "flex",
    overflow:"scroll" 
  });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };

  // const { initialProducts } = useSelector((state) => state.products);
 
  return (
    <ProductListWrapper>
      <ProductWrapper>
        <Typography sx={{ fontSize: "30px", lineHeight: "1.38" }}>
          {title}
        </Typography>
        <Button
          sx={{ marginTop: "30px", width: "100px", ml: 7 }}
          variant="contained"
        >
          View All
        </Button>
        <img src={productBackgroundImg} />
      </ProductWrapper>
      <Box sx={{ width: "83%" }}>
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
          {initialProducts.map((item, index) => {
            return <ProductList item={item} />;
          })}
        </Carousel>
      </Box>
    </ProductListWrapper>
  );
}

export default Product;
