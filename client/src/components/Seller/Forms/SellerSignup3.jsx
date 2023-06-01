import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DataContext } from "../../utilities/ContextStore";
import { account, databases } from "../../../services/appwriteConfig";

export default function SellerSignup3() {
  const { sellerSignupData } = useContext(DataContext);
  const [emailSent, setEmailSent] = useState(false);

  const handleSellerSignup3 = async (e) => {
    // e.preventDefault();
    console.log(sellerSignupData, "sellerSignupData in sign3");
    const uid=sessionStorage.getItem('uid');
    await account
      .createEmailSession(sellerSignupData.email, sellerSignupData.password)
      .then(
        function (response) {
          console.log(response, "email session success"); // Success
        },
        function (error) {
          console.log(error, "email session failed"); // Failure
        }
      );

    await account.createVerification("http://localhost:5173/seller-home/dashboard/").then(
      function (response) {
        setEmailSent(true);
        console.log(response, "email sent"); // Success
        localStorage.setItem('secret_key',uid);
      },
      function (error) {
        setEmailSent(false);
        console.log(error, "email sending failed"); // Failure
      }
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 30,
      }}
    >
      {emailSent && (
        <Typography sx={{ color: "#2a8f2a" }}>
          Email sent Successfully,Please click on the email to redirect to
          dashboard
        </Typography>
      )}
      {!emailSent && (
        <>
          <Typography>
            {" "}
            Please click here to send verification email to get started{" "}
          </Typography>
          <Button
            onClick={handleSellerSignup3}
            variant="contained"
            sx={{ mt: 3 }}
            endIcon={<ArrowForwardIcon />}
          >
            Send mail to verify{" "}
          </Button>
        </>
      )}
    </Box>
  );
}
