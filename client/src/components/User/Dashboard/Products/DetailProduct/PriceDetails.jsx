import { Box, Divider, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../../../utilities/ContextStore";

function PriceDetails({ details }) {
  const { setItemCount, itemCount } = useContext(DataContext);

  const PriceWrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  });

  const DiscountWrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  });

  const DeliveryWrapper = styled(Box)({
    display: "flex",
    marginTop: 20,
    justifyContent: "space-between",
  });

  const TotalAmountWrapper = styled(Box)({
    display: "flex",
    marginTop: 20,
    justifyContent: "space-between",
  });
  // const totalDiscount = parseInt(
  //   (details[0] * details[2].substring(0, details[0].length - 1)) / 100
  // );
  return (
    <Box
      sx={{
        width: "30%",
        border: "1px solid rgba(0,0,0,.2)",
        padding: 2,
        minHeight: "300px",
        height: "300px",
        overflow: "hidden",
        position:"fixed",
        top:"97px",
        right:"20px",
        backgroundColor:"white"
      }}
    >
      <Typography sx={{ fontSize: 16, width: "100%" }}>
        {" "}
        Price Details
      </Typography>
      <Divider sx={{ ml: 2, mt: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          // mt: 1,
          // ml: 10,
          // padding: 1,
          // ml:"-100px"
        }}
      >
        <PriceWrapper>
          <Typography sx={{ fontSize: 16 }}>Price</Typography>
          <Typography sx={{ fontSize: 16 }}>{ details[0]}</Typography>
        </PriceWrapper>
        <DiscountWrapper>
          <Typography sx={{ fontSize: 16 }}>Discount</Typography>
          <Typography sx={{ fontSize: 16, color: "green" }}>
            -{ details[2]}
          </Typography>
        </DiscountWrapper>
        <DeliveryWrapper>
          <Typography sx={{ fontSize: 16 }}>Delivery</Typography>
          <Typography sx={{ fontSize: 16 }}>Free</Typography>
        </DeliveryWrapper>
        <Divider sx={{ mt: 2 }} />
        <TotalAmountWrapper>
          <Typography sx={{ fontSize: 16 }}>Total Amount</Typography>
          <Typography sx={{ fontSize: 16 }}>
            ₹{(details[0] - details[2])}
          </Typography>
        </TotalAmountWrapper>
        <Divider sx={{ mt: 2 }} />
        <Typography sx={{ fontSize: 16, mt: 3, color: "green" }}>
          You will save ₹{ details[2]} on this order
        </Typography>
      </Box>
    </Box>
  );
}

export default PriceDetails;
