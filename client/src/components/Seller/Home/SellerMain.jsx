import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDefaultProducts, sellerLastOrderProductsList } from "../../../redux/actions/productsAction";
import { DataContext } from "../../utilities/ContextStore";
import {  products } from "./data";

export default function SellerMain() {
  const RowItems = styled(Typography)({
    marginBottom: 2,
    marginTop: 8,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sellerLastOrderProductsList());
  }, []);
  const [orderStatus, setOrderStatus] = useState();

  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const { sellerLastOrderProducts } = useSelector((state)=>state.products);
  console.log(sellerLastOrderProducts,"sellerLastOrderProducts");

 const data=[{
    orders:sellerLastOrderProducts.length,
    name:"Total orders",
    color:"#03a9f4"
},
{
    orders:400,
    name:"Add to bag",
    color:"#8bc34a"
},
{
    orders:200,
    name:"Orders",
    color:"#e84e40"
},
{
    orders:"20,000/-",
    name:"Total Income",
    color:"#e84e40"
}
]
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
                boxShadow: "5px 5px 5px rgba(68, 68, 68, 0.6)",
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
      <Box
        sx={{
          backgroundColor: "#F9F9F9",
          boxShadow: "5px 5px 5px 5px rgba(68, 68, 68, 0.6)",
          padding: 3,
          borderRadius: 3,
        }}
      >
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
        {sellerLastOrderProducts.map((product) => (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              borderBottom: "1px solid black",
            }}
          >
            <Grid item xs={2}>
              <RowItems>{(product.order_id).substring(0,4)}</RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>Jan 8th,2023</RowItems>
            </Grid>
            <Grid item xs={3}>
              <RowItems>{product.customer_name ? product.customer_name : "-"}</RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>
                <Box sx={{ minWidth: 120 }}>
                  {" "}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Status"
                      defaultValue="Ready to dispatch"
                      onChange={handleOrderStatusChange}
                    >
                      <MenuItem value={"Ready to dispatch"}>
                        Ready to dispatch
                      </MenuItem>
                      <MenuItem value={"Shipping"}>Shipping</MenuItem>
                      <MenuItem value={"Out for delivery"}>
                        Out for delivery
                      </MenuItem>
                      <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </RowItems>
            </Grid>
            <Grid item xs={2}>
              <RowItems>{product.product_price? product.product_price : "-"}</RowItems>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
