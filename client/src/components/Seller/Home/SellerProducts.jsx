import styled from "@emotion/styled";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listDefaultProducts, sellerProductsList } from "../../../redux/actions/productsAction";

export default function SellerProducts() {
  const RowItems = styled(Typography)({
    marginBottom: 2,
    marginTop: 8,
    textAlign:"center"
  });
  const dispatch = useDispatch();
  const sellerProducts=useSelector(state=>state.products.sellerProducts)
  console.log(sellerProducts,"proc")
  useEffect(() => {
    dispatch(sellerProductsList());
  }, []);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ textAlign: "center", fontSize: "30px", mt: 3 }}>
          Your Products
        </Typography>
        <Link to="/new-product">
          {" "}
          <Button size="small" sx={{ height: "30px" }} variant="contained">
            Add Product
          </Button>
        </Link>
      </Box>
      <Box sx={{ border: "1px solid grey", padding: 3, borderRadius: 3 }}>
        <Box sx={{ textAlign: "center" }}>
          <TextField size="small" label="Search.."></TextField>
        </Box>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            borderBottom: "1px solid grey",
          }}
        >
          <Grid item xs={2}>
            <RowItems>id</RowItems>
          </Grid>
          <Grid item xs={2}>
            <RowItems>Product name</RowItems>
          </Grid>
          <Grid item xs={3}>
            <RowItems>Description</RowItems>
          </Grid>
          <Grid item xs={2}>
            <RowItems>Quantity</RowItems>
          </Grid>
          <Grid item xs={2}>
            <RowItems>Price</RowItems>
          </Grid>
        </Grid>
        {sellerProducts.map((product) => (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              borderBottom: "1px solid black",
            }}
          >
            <Grid item xs={2}>
              <RowItems>{product.product_id.substr(30)}</RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>{product.product_name}</RowItems>
            </Grid>
            <Grid item xs={3}>
              <RowItems>{product.product_desc}</RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>{product.product_quantity}</RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>Rs{" "}{product.product_price}</RowItems>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
