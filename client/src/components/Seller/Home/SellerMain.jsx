import styled from "@emotion/styled";
import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listDefaultProducts } from "../../../redux/actions/productsAction";
import { data, products } from "./data";

export default function SellerMain() {
  const RowItems = styled(Typography)({
    marginBottom: 2,
    marginTop: 8,
  });

  return (
    <Box sx={{ mt: 5 }}>
      <Box>
        <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
          Welcome Back, Cherit!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {data.map((q) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: 2,
                p: 2,
               
                borderRadius: 3,
                height: "100px",
                width: "150px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F9F9F9", 
                boxShadow: "5px 5px 5px rgba(68, 68, 68, 0.6)"
              }}
            >
              <Typography sx={{ fontSize: "25px", fontWeight: 600  }}>
                {q.orders}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>{q.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#F9F9F9", boxShadow: "5px 5px 5px 5px rgba(68, 68, 68, 0.6)", padding: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontSize: "20px",
              borderBottom: "1px solid black",
            }}
          >
            Last orders
          </Typography>
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
            <RowItems>Order id</RowItems>
          </Grid>
          <Grid item xs={2}>
            <RowItems>Date</RowItems>
          </Grid>
          <Grid item xs={3}>
            <RowItems>Customer</RowItems>
          </Grid>
          <Grid item xs={2}>
            <RowItems>Status</RowItems>
          </Grid>
          <Grid item xs={2}>
            <RowItems>Price</RowItems>
          </Grid>
        </Grid>
        {products.map((product) => (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              borderBottom: "1px solid black",
            }}
          >
            <Grid item xs={2}>
              <RowItems>{product.id}</RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>Jan 8th,2023</RowItems>
            </Grid>
            <Grid item xs={3}>
              <RowItems>{product.title}</RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>Open</RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>{product.price}</RowItems>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
