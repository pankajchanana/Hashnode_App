import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCurrentUserCartItems } from "../../../../../redux/actions/productsAction";
import CartPage from "./CartPage";
import PriceDetails from "./PriceDetails";

export default function MainCartPage() {
  const cartData = useSelector((state) => state.products.cartItems);
  console.log(cartData, "cartdata");
  // useEffect(() => {
  //   fetch('https://dummyjson.com/products/categories')
  //   .then(res => console.log(res.json()),"ewasjnwdas")
  //   .then(console.log);
  // }, [])

  const calculatePriceDetails = () => {
    let mrp = 0,
      cost = 0,
      count = 0;
    if (cartData)
      cartData.forEach((item) => {
        console.log(item, "item");
        count = parseInt(item?.product_count);
        mrp += count * parseInt(item?.price?.mrp);
        cost += count * parseInt(item?.price?.cost);
        console.log(mrp, cost);
      });
    return [mrp, cost, mrp - cost];
  };

  const handleProductPlaceOrder = () => {
    // setCartItemsData({
    //   ...cartItemsData,
    //   product,
    // });
    // databases
    //   .updateDocument(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, product.id, {
    //     user_id: sessionStorage.getItem("secret_key"),
    //     product_id: product.id,
    //     product_count: itemCount,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  return (
    <>
      {cartData.length !== 0 ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "#F0F3F6",
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "90%" }}>
              {cartData.map((item) => {
                return <CartPage item={item} />;
              })}
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fb641b",
                width: "300px",
                mr: 5,
                mb: 10,
                mt: 2,
              }}
              onClick={handleProductPlaceOrder}
            >
              Place Order
            </Button>
          </Box>

          <Box sx={{ width: "30%", zIndex: 1 }}>
            <PriceDetails
              // mrp={product?.price?.mrp}
              // cost={product?.price?.cost}
              // discount={product?.price?.discount}
              details={calculatePriceDetails()}
            />
          </Box>
        </Box>
      ) : (
        <Typography sx={{ textAlign: "center", margin: "10% 10%" }}>
          No products in your cart
        </Typography>
      )}
    </>
  );
}
