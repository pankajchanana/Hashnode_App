import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DataContext } from "../../utilities/ContextStore";
import { account, databases } from "../../../services/appwriteConfig";
import { Query } from "appwrite";

export default function SellerSignup3() {
  const { sellerSignupData } = useContext(DataContext);

  const handleSellerSignup3 = async (e) => {
    e.preventDefault();
    const uid = sessionStorage.getItem("uid");
    databases
      .listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USERS_TABLE_ID,
        [Query.limit(100), Query.offset(0)]
      )
      .then((res) => {
        const currentUser = res.documents.filter((q) => q.$id === uid);
        console.log(currentUser, "user");
      })
      .catch((e) => {
        console.log(e, "error in signup3");
      });

    console.log(sellerSignupData, "sellerSignupData in sign3");

    const promiseds = account.createEmailSession(
      sellerSignupData.email,
      sellerSignupData.password
    );
    promiseds.then(
      function (response) {
        console.log(response, "email session success"); // Success
      },
      function (error) {
        console.log(error, "email session failed"); // Failure
      }
    );
    account.createVerification("http://localhost:5173/seller-home/").then(
      function (response) {
        console.log(response, "email sent"); // Success
      },
      function (error) {
        console.log(error, "email not sending failed"); // Failure
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
      <Typography> Please verify your email to get started </Typography>
      <Button
        onClick={handleSellerSignup3}
        variant="contained"
        sx={{ mt: 3 }}
        endIcon={<ArrowForwardIcon />}
      >
        Verify email{" "}
      </Button>
    </Box>
  );
}
