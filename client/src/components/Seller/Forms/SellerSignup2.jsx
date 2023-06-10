import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext } from "react";
import { DataContext } from "../../utilities/ContextStore";
import { account, databases } from "../../../services/appwriteConfig";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import { Query } from "appwrite";

export default function SellerSignup2() {
  const { setSellerSignupStatus, sellerSignupData, setSellerSignupData } =
    useContext(DataContext);
  const { VITE_DATABASE_ID, VITE_USERS_TABLE_ID } = import.meta.env;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const promises = databases.listDocuments(
      VITE_DATABASE_ID,
      VITE_USERS_TABLE_ID,
      [Query.limit(100), Query.offset(0)]
    );
    const uid = sessionStorage.getItem("uid");
    promises
      .then((res) => {
        const currentUser = res?.documents.filter((q) => q.$id === uid);
        console.log(res.documents, currentUser, uid);
        if (uid) {
          setSellerSignupData({
            ...sellerSignupData,
            email: currentUser[0]?.email,
            gst_in: currentUser[0]?.gst_in,
            mobile_number: currentUser[0]?.mobile_number,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleSellerSignup2 = (e) => {
    // e.preventDefault();
    console.log(sellerSignupData, "sellerSignupData in sign2");
    const uid=uuidv4()
    const promise = databases.updateDocument(
      VITE_DATABASE_ID,
      VITE_USERS_TABLE_ID,
      uid,
      sellerSignupData
    );
    promise.then((res) => {
      setSellerSignupStatus("2");
    });
    const user = account.create(
      uid,
      sellerSignupData.email,
      sellerSignupData.password,
      sellerSignupData.full_name
    );
    user
      .then((res) => {
        sellerSignupData.seller_signup_status = "3";
        setSellerSignupStatus("3");
        const promise = databases.updateDocument(
          VITE_DATABASE_ID,
          VITE_USERS_TABLE_ID,
          uid,
          sellerSignupData
        );
        promise.then((res) => {
          setSellerSignupStatus("3");
        });
        console.log(res, "account created");
      })
      .catch((e) => {
        console.log("not created");
        setSellerSignupStatus("2");
      });
  };
  return (
    <form onSubmit={handleSubmit(handleSellerSignup2)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Typography>Almost there...</Typography>
          <Typography sx={{ color: "#3D464D" }}>
            We need these details to set up your account. Please fill these
            details
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "600px", mt: 4 }}
            placeholder="Create Password"
            name="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password should be minimum 8 characters",
              },
            })}
            onChange={(e) => {
              setSellerSignupData({
                ...sellerSignupData,
                [e.target.name]: e.target.value,
              });
            }}
            error={Boolean(errors.password)}
            helperText={errors?.password?.message}
          ></TextField>
          <TextField
            sx={{ width: "600px", mt: 4 }}
            placeholder="Enter Your Full Name"
            name="full_name"
            {...register("full_name", {
              required: {
                value: true,
                message: "Full name is required",
              },
            })}
            onChange={(e) => {
              setSellerSignupData({
                ...sellerSignupData,
                [e.target.name]: e.target.value,
              });
            }}
            error={Boolean(errors.full_name)}
            helperText={errors?.full_name?.message}
          ></TextField>
          <TextField
            sx={{ width: "600px", mt: 4 }}
            placeholder="Enter Display Name"
            name="display_name"
            {...register("display_name", {
              required: {
                value: true,
                message: "Display name is required",
              },
            })}
            onChange={(e) => {
              setSellerSignupData({
                ...sellerSignupData,
                [e.target.name]: e.target.value,
              });
            }}
            error={Boolean(errors.display_name)}
            helperText={errors?.display_name?.message}
          ></TextField>

          <Button
            endIcon={<ArrowForwardIcon />}
            variant="contained"
            type="submit"
            sx={{ mt: 2, width: "300px" }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </form>
  );
}
