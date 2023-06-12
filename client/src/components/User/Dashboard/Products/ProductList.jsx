import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function ProductList({ item }) {
  const Image = styled("img")({
    height: 200,
    width: 150,
    objectFit:"contain"
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        margin: 2,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Link style={{ textDecoration: "none" }} to={"/products/"+item.product_id}>
        <Image src={item.product_img} />
        <Typography sx={{ color: "black",fontWeight: 550, mb: 1 }}>
          {item.product_name}
        </Typography>
        <Typography sx={{ color: "green", mb: 1 }}>
          From ₹{item.product_price}{" "}
        </Typography>
        <Typography sx={{color: "black"}}>{item.product_brand} </Typography>
      </Link>
    </Box>
  );
}

export default ProductList;
