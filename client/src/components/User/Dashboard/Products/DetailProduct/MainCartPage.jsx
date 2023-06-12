import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfUserHasAddress,
  listCurrentUserCartItems,
  listDefaultProducts,
} from "../../../../../redux/actions/productsAction";
import { DataContext } from "../../../../utilities/ContextStore";
import UserAddress from "../../UserAddress";
import CartPage from "./CartPage";
import PriceDetails from "./PriceDetails";

export default function MainCartPage() {
  let { cartItems ,userAddress} = useSelector((state) => state.products);
  const { openAdressModal, setOpenAdressModal } = useContext(DataContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDefaultProducts());
    dispatch(listCurrentUserCartItems());
  }, []);

  const calculatePriceDetails = () => {
    let mrp = 0,
      cost = 0,
      count = 0;
    if (cartItems !== undefined)
      cartItems.forEach((item) => {
        count = parseInt(item?.product_count);
        mrp += count * parseInt(item?.product_price);
        cost += count * 2000;
      });
    return [mrp, cost, mrp - cost];
  };

  const handleProductPlaceOrder = () => {
    dispatch(checkIfUserHasAddress())
    setOpenAdressModal(true);
  };

  return (
    <>
      {cartItems.length !== 0 ? (
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
              width: "80%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              {cartItems.map((item) => {
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

      {UserAddress && <UserAddress userAddress={userAddress}/>}
    </>
  );
}
