import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { data, products } from "./data";

export default function SellerMain() {
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
                border: "1px solid black",
                borderRadius: 3,
                height: "100px",
                width: "150px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
                {q.orders}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>{q.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ ml: 3 }}>
        <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
          Products List
        </Typography>
        {products.map((product) => (
          <Grid
            container
            sx={{
              m: 2,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Grid item xs={1}>
              <Typography>{product.id}</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{product.title}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography>Open</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography>{product.price}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
