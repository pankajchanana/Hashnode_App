import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewSellerProduct } from "../../../redux/actions/productsAction";
import { useNavigate } from "react-router";
// import bg from "../../../../assets/bg.jpeg";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../services/appwriteConfig";

export default function SellerAddNewProduct() {
  const { VITE_BUCKET_ID } = import.meta.env;
  const [newProductDetails, setNewProductDetails] = useState({
    product_name: "",
    product_desc: "",
    product_price: "",
    product_quantity: "",
    product_img: "",
    product_category: "",
    product_brand: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const uid = sessionStorage.getItem("secret_key");
  const [imgFile,setImgFile]=useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddProduct = () => {
    console.log("added product");
    console.log(newProductDetails,imgFile);
    const productImgUrl=uuidv4();
    newProductDetails.product_img=productImgUrl;
    const promise = storage.createFile(VITE_BUCKET_ID,productImgUrl , imgFile);
    promise
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("error", e);
      });
    dispatch(addNewSellerProduct(newProductDetails));
    navigate(`/seller-home/products/${uid}`);
  };

  const handleImageInput = async (e) => {
    const file = e.target.files[0];
    setImgFile(file)
  };

  return (
    <form onSubmit={handleSubmit(handleAddProduct)}>
      <Box sx={{ backgroundColor: "aliceblue" }}>
        <Box>
          <Typography sx={{ textAlign: "center" }}>
            Add a Product here
          </Typography>
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
            <Typography sx={{ mt: 4 }}>Product Category</Typography>
            <TextField
              sx={{ width: "600px", mt: 4 }}
              placeholder="Enter Product category"
              name="product_category"
              {...register("product_category", {
                required: {
                  value: true,
                  message: "Product category is required",
                },
              })}
              onChange={(e) => {
                setNewProductDetails({
                  ...newProductDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              error={Boolean(errors.product_category)}
              helperText={errors?.product_category?.message}
            ></TextField>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ mt: 4 }}>Product Brand</Typography>
            <TextField
              sx={{ width: "600px", mt: 4 }}
              placeholder="Enter Product brand"
              name="product_brand"
              {...register("product_brand", {
                required: {
                  value: true,
                  message: "Product brand is required",
                },
              })}
              onChange={(e) => {
                setNewProductDetails({
                  ...newProductDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              error={Boolean(errors.product_brand)}
              helperText={errors?.product_brand?.message}
            ></TextField>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ mt: 4 }}>Product Price</Typography>
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
              mt: 3,
            }}
          >
            <Typography sx={{ ml: 3 }}>Product image</Typography>
            <input
              style={{ marginLeft: "60px" }}
              onChange={handleImageInput}
              type="file"
            />
            <Button
              type="submit"
              endIcon={<ArrowForwardIcon />}
              variant="contained"
              sx={{ mt: 2, width: "300px" }}
            >
              Register & Continue
            </Button>
          </Box>
        </Box>
        <Box>
          <img id="imgfile" style={{ width: "100%" }} src={""} />
        </Box>
      </Box>
    </form>
  );
}
