import {
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PriceDetails from "./PriceDetails";
// import { initialProducts } from "../../../constants/constants";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { DataContext } from "../../../../utilities/ContextStore";
import { databases } from "../../../../../services/appwriteConfig";
import { v4 as uuid4 } from "uuid";
import { addOrReduceCartItemsCount, listCurrentUserCartItems, removeItemFromCart } from "../../../../../redux/actions/productsAction";

const { VITE_DATABASE_ID, VITE_CARTS_TABLE_ID } = import.meta.env;

function CartPage({ item }) {
  const dispatch=useDispatch()
  const { setItemCount, itemCount, setCartItemsData, cartItemsData } =
    useContext(DataContext);
  const handleProductCounttoCartItems = (e, productState) => {
    let countItem=parseInt(item.product_count);
    if (productState === "remove") {
      countItem-=1;
    } else {
      countItem+=1;
    }
    dispatch(addOrReduceCartItemsCount(item.product_id,countItem));
  };

  const handleRemoveItemFromCart=()=>{
    dispatch(removeItemFromCart(item.product_id))
  }

 

  return (
    <Box
      sx={{
        display: "flex",
        mt: 5,
        width: "70%",
        border: "1px solid rgba(0,0,0,.2)",
        ml: 10,
        padding: "30px 20px 20px 30px",
        backgroundColor: "white",
      }}
    >
      <img style={{ height: 150, width: 150 }} src={item?.product_img} />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography sx={{ ml: 5, fontSize: 18 }}>
          {item?.product_name}
        </Typography>

        <Typography sx={{ ml: 5, mt: 3, fontSize: 14, display: "flex" }}>
          <span style={{ fontWeight: 600, marginRight: 10 }}> Seller </span>
          MYTHANGLORYRetail
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              ml: 5,
              mt: 2,
              fontSize: 14,
              fontWeight: 600,
              color: "#878787",
              textDecoration: "line-through",
            }}
          >
            ₹{parseInt(item?.product_count) * 2000}
          </Typography>
          <Typography sx={{ ml: 2, mt: 2, fontSize: 18, fontWeight: 600 }}>
            ₹{parseInt(item?.product_count) * item?.product_price}
          </Typography>
          <Typography
            sx={{
              ml: 2,
              mt: 2,
              fontSize: 14,
              fontWeight: 600,
              color: "green",
            }}
          >
            ₹{"20%"}
          </Typography>
        </Box>
        <Typography
          sx={{
            ml: 5,
            mt: 2,
            fontSize: 14,
            fontWeight: 600,
            color: "green",
          }}
        >
          4 offers applied
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <RemoveIcon
              sx={{ cursor: "pointer" }}
              onClick={(e) => handleProductCounttoCartItems(e, "remove")}
            />
            <input
              value={item?.product_count}
              style={{ width: "30px", textAlign: "center" }}
            ></input>
            <AddIcon
              sx={{ cursor: "pointer" }}
              onClick={(e) => handleProductCounttoCartItems(e, "add")}
            />
          </Box>
          <Button
            sx={{
              color: "black",
              mt: 2,
              ml: 3,
              fontSize: 16,
              fontWeight: 600,
            }}
            onClick={handleRemoveItemFromCart}
          >
            Remove
          </Button>
        </Box>
        <Divider />
      </Box>
    </Box>

  );
}

export default CartPage;
