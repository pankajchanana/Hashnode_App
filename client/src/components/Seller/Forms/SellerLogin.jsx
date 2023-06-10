import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../utilities/ContextStore";
import { useContext } from "react";
import { account } from "../../../services/appwriteConfig";
import { useForm } from "react-hook-form";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function SellerLogin() {
  const { sellerLogin, setSellerLogin, sellerSignupData, setSellerSignupData } =
    useContext(DataContext);
  const [loginError, setLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const hangleLogin = () => {
    const promised =  account.createEmailSession(
      sellerSignupData.email,
      sellerSignupData.password
    );
    promised.then(
      function (response) {
        console.log(response,response.userId, "email session success");
        setLoginError(false);
        sessionStorage.setItem("token", response.userId);
        localStorage.setItem("token", response.userId);
        navigate(`/seller-home/dashboard/${response.userId}`);
      },
      function (error) {
        setLoginError(true);
        console.log(error, "email session failed");
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(hangleLogin)}>
      <Dialog
        PaperProps={{
          sx: {
            maxWidth: 800,
            width: 500,
            maxHeight: 650,
            height: 300,
          },
        }}
        open={sellerLogin}
        onClose={sellerLogin}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px dotted black",
            }}
          >
            <Typography sx={{ padding: 1 }}>Log in</Typography>
            <CloseIcon
              onClick={() => setSellerLogin(false)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 100,
              width: 500,
            }}
          >
            {loginError && (
              <Typography sx={{ color: "red" }}>
                Entered email or password is Incorrect
              </Typography>
            )}
            <TextField
              label="Enter your email"
              sx={{ width: 400, mt: 3 }}
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
              sx={{ width: 400, mt: 3 }}
              placeholder="Enter Password"
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
           <Link to="seller-signup"> <Button>Register for new account</Button></Link>
            <Button endIcon={<ArrowForwardIcon/>} variant="contained" onClick={hangleLogin}>
              Login
            </Button>
          </Box>
        </Box>
      </Dialog>
    </form>
  );
}
