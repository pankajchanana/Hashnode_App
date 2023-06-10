import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SignupInfo from "./SignupInfo";
import { DataContext } from "../../utilities/ContextStore";
import { databases } from "../../../services/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Query } from "appwrite";

export default function SellerSignup1() {
  const { VITE_DATABASE_ID, VITE_USERS_TABLE_ID } = import.meta.env;
  const { setSellerSignupStatus, setSellerSignupData, sellerSignupData } =
    useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [userExistStatus, setUserExistStatus] = useState(false);

  const handleSellerSignup1 = (e) => {
    // e.preventDefault();
    const promises = databases.listDocuments(
      VITE_DATABASE_ID,
      VITE_USERS_TABLE_ID,
      [Query.limit(100), Query.offset(0)]
    );
    const email = sellerSignupData?.email;
    sellerSignupData.is_seller=true;
    promises
      .then((res) => {
        const users = res.documents;
        const user = users.filter((q) => q?.email === email);
        console.log(user, res.documents);
        if (user.length !== 0) {
          console.log("user exits");
          setUserExistStatus(true);
        } else {
          console.log("user not exits");
          sellerSignupData.seller_signup_status = "2";
          const uid = uuidv4();
          console.log("signup done");
     
          const promise = databases.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_USERS_TABLE_ID,
            uid,
            sellerSignupData
          );
          promise
            .then((res) => {
              setSellerSignupStatus("2");
            })
            .then((e) => {
              console.log(e);
            });
          setUserExistStatus(false);
        }
      })
      .catch((e) => {
        console.log(e, "error in signup3");
      });
  };

  return (
    <form onSubmit={handleSubmit(handleSellerSignup1)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userExistStatus && (
            <Typography sx={{ color: "red", mt: 5 }}>
              User already exists,Please Login
            </Typography>
          )}
          <TextField
            sx={{ width: "600px", mt: 4 }}
            placeholder="Enter Mobile Number"
            value={sellerSignupData.mobile_number}
            name="mobile_number"
            {...register("mobile_number", {
              required: {
                value: true,
                message: "Mobile number is required",
              },
              minLength: {
                value: 10,
                message: "Mobile number should be 10 digits",
              },
            })}
            error={Boolean(errors.mobile_number)}
            onChange={(e) => {
              setSellerSignupData({
                ...sellerSignupData,
                [e.target.name]: e.target.value,
              });
            }}
            helperText={errors?.mobile_number?.message}
          ></TextField>
          <TextField
            sx={{ width: "600px", mt: 4 }}
            placeholder="Email ID"
            name="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is invalid",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            onChange={(e) => {
              setSellerSignupData({
                ...sellerSignupData,
                [e.target.name]: e.target.value,
              });
            }}
          ></TextField>
          <TextField
            sx={{ width: "600px", mt: 4 }}
            placeholder="Enter GSTIN"
            onChange={(e) => {
              setSellerSignupData({
                ...sellerSignupData,
                gst_in: e.target.value,
              });
            }}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mt: 4, textAlign: "end" }}>
            GSTIN is required to sell products on Online Market place. You can
            also share it in the final step.
          </Typography>

          <Typography sx={{ mt: 4 }}>
            By continuing, I agree to Flipkart’s Terms of Use & Privacy Policy
          </Typography>

          <Button
            type="submit"
            endIcon={<ArrowForwardIcon />}
            variant="contained"
            sx={{ mt: 2, width: "300px" }}
          >
            Register & Continue
          </Button>
        </Box>
        <SignupInfo />
      </Box>
    </form>
  );
}
