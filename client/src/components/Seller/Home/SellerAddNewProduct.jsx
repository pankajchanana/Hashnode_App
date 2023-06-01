import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewSellerProduct } from "../../../redux/actions/productsAction";
import { useNavigate } from "react-router";

export default function SellerAddNewProduct() {
  const [newProductDetails, setNewProductDetails] = useState({
    product_name: "",
    product_desc: "",
    product_price: "",
    product_quantity: "",
    product_img:""
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const uid=sessionStorage.getItem("secret_key")
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleAddProduct = () => {
    console.log("added product");
    console.log(newProductDetails);
    navigate(`/seller-home/products/${uid}`)
    dispatch(addNewSellerProduct(newProductDetails));
  };
  return (
    <form onSubmit={handleSubmit(handleAddProduct)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>Add a Product here</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ mt: 4 }}>Product Name</Typography>
          <TextField
            sx={{ width: "600px", mt: 4 }}
            placeholder="Enter Product Name"
            name="product_name"
            {...register("product_name", {
              required: {
                value: true,
                message: "Product name is required",
              },
            })}
            onChange={(e) => {
              setNewProductDetails({
                ...newProductDetails,
                [e.target.name]: e.target.value,
              });
            }}
            error={Boolean(errors.product_name)}
            helperText={errors?.product_name?.message}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ mt: 4 }}>Product Description</Typography>
          <TextField
            sx={{ width: "600px", mt: 4, mr: 2 }}
            placeholder="Enter Product Description"
            name="product_desc"
            {...register("product_desc", {
              required: {
                value: true,
                message: "Product Description is required",
              },
            })}
            onChange={(e) => {
              setNewProductDetails({
                ...newProductDetails,
                [e.target.name]: e.target.value,
              });
            }}
            error={Boolean(errors.product_desc)}
            helperText={errors?.product_desc?.message}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ mt: 4 }}>Product Quantity</Typography>
          <TextField
            sx={{ width: "600px", mt: 4, mr: 1 }}
            placeholder="Enter Product Quantity"
            name="product_quantity"
            {...register("product_quantity", {
              required: {
                value: true,
                message: "Product Quantity is required",
              },
            })}
            onChange={(e) => {
              setNewProductDetails({
                ...newProductDetails,
                [e.target.name]: e.target.value,
              });
            }}
            error={Boolean(errors.product_quantity)}
            helperText={errors?.product_quantity?.message}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ mt: 4 }}>Product Name</Typography>
          <TextField
            sx={{ width: "600px", mt: 4 }}
            placeholder="Enter Product Price"
            name="product_price"
            {...register("product_price", {
              required: {
                value: true,
                message: "Product Price is required",
              },
            })}
            onChange={(e) => {
              setNewProductDetails({
                ...newProductDetails,
                [e.target.name]: e.target.value,
              });
            }}
            error={Boolean(errors.product_price)}
            helperText={errors?.product_price?.message}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            mt:3
          }}
        >
          <Typography>Product image</Typography>
          <input onChange={  
            (e)=>{
            setNewProductDetails({
              ...newProductDetails,
              product_img:URL.createObjectURL(e.target.files[0])})
          }} type="file" />
        </Box>
        <Button
          type="submit"
          endIcon={<ArrowForwardIcon />}
          variant="contained"
          sx={{ mt: 2, width: "300px" }}
        >
          Register & Continue
        </Button>
      </Box>
    </form>
  );
}
