import { Box, Grid, TextField, Typography } from "@mui/material";
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
      <Box sx={{ border: "1px solid grey", padding: 3,borderRadius:3 }}>
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
        <Grid container sx={{display:"flex",justifyContent:"space-around",borderBottom: "1px solid grey"}}>
          <Grid item xs={2}>
          <Typography sx={{ mt: 2, mb: 2,fontWeight:600 }}>Order id</Typography>
          </Grid>
          <Grid item xs={2}>
          <Typography sx={{ mt: 2, mb: 2,fontWeight:600 }}>Date</Typography>
          </Grid>
          <Grid item xs={3}>
          <Typography sx={{ mt: 2, mb: 2,fontWeight:600 }}>Customer</Typography>
          </Grid>
          <Grid item xs={2}>
          <Typography sx={{ mt: 2, mb: 2,fontWeight:600 }}>Status</Typography>
          </Grid>
          <Grid item xs={2}>
          <Typography sx={{ mt: 2, mb: 2 ,fontWeight:600}}>Price</Typography>
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
              <Typography sx={{ mt: 2, mb: 2 }}>{product.id}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 2, mb: 2 }}>Jan 8th,2023</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ mt: 2, mb: 2 }}>{product.title}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 2, mb: 2 }}>Open</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 2, mb: 2 }}>{product.price}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
