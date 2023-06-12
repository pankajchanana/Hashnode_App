import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataContext } from "../../utilities/ContextStore";
// import { userSignup } from "../../redux/actions/userAuthentication";
import { useNavigate } from "react-router";
// import { userLogin } from "../../redux/actions/userAuthentication";
import { account, databases } from "../../../services/appwriteConfig";
import {
  listCurrentUserCartItems,
  setToken,
} from "../../../redux/actions/productsAction";
import Radio from "@mui/material/Radio";
import { useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";

export default function RightWrapper({
  setLoginText,
  setSignUpButton,
  setLoginModalOpen,
  signUpButton,
}) {
  const { data, setData, loginErrorMsg, setLoginErrorMsg } =
    useContext(DataContext);
  const [signUpMsg, setSignUpMsg] = useState("");
  const [userLoginError, setUserLoginError] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();
  // const signUpData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignUpButton = () => {
    setLoginText({
      title: "Looks like you're new here!",
      subTitle: "Sign up with your mobile number to get started",
    });
    setSignUpButton(true);
  };

  const handleExistingLoginUpButton = () => {
    setLoginText({
      title: "Login",
      subTitle: "Get access to your Orders,Wishlist and Recommendations",
    });
    setSignUpButton(false);
  };

  const handleSignUp = async () => {
    console.log(data);
    const id = uuid4();
    const user = databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USERS_TABLE_ID,
      id,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        mobile_number: data.mobile_number,
        is_seller: data.is_seller,
        user_id: id,
      }
    );
    user
      .then((res) => {
        console.log(res, "account created");
        const users = account.create(id, data.email, data.password, data.name);
        users
          .then((res) => {
            console.log(res, "account created");
          })
          .catch((e) => {
            console.log("not created");
          });
        setLoginModalOpen(false);
      })
      .catch((e) => {
        console.log(e, "not created");
      });
  };

  const handleUserLogin = async () => {
    console.log(data, "data in login");
    await account
      .createEmailSession(data.email, data.password)
      .then((response) => {
        console.log(response, response.userId, "email session success");
        setUserLoginError(false);
        setLoginErrorMsg("");
        sessionStorage.setItem("secret_key", response.userId);
        setLoginModalOpen(false);
        navigate(`/`);
        dispatch(setToken(data.email, false));
        dispatch(listCurrentUserCartItems());
      })
      .catch((error) => {
        setUserLoginError(true);
        console.log(error, "email session failed");
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        overflow: "none",
      }}
    >
      {!signUpButton && userLoginError && (
        <Typography
          sx={{ textAlign: "center", fontSize: 17, mb: 2, color: "red" }}
        >
          Entered email or password is Incorrect
        </Typography>
      )}

      {signUpButton && (
        <>
          <TextField
            sx={{ width: 250 }}
            label={"Enter your Name"}
            name="name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            variant="standard"
          />
          <TextField
            sx={{ width: 250 }}
            label={"Enter your Mobile number"}
            name="mobile_number"
            {...register("mobile_number", {
              required: {
                value: true,
                message: "Mobile number is required",
              },
            })}
            error={Boolean(errors.mobile_number)}
            helperText={errors.mobile_number?.message}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            variant="standard"
          />
          <FormControl sx={{ mt: 2 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              name="gender"
              {...register("gender", {
                required: {
                  value: true,
                  message: "Gender is required",
                },
              })}
              error={Boolean(errors.gender)}
              helperText={errors.gender?.message}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              aria-labelledby="demo-row-radio-buttons-group-label"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </>
      )}
      <Typography sx={{ textAlign: "center", color: "red" }}>
        {loginErrorMsg}
      </Typography>
      <TextField
        sx={{ width: 250 }}
        label={"Enter your Email"}
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
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        variant="standard"
      />

      <TextField
        sx={{ width: 250 }}
        id="standard-basic"
        label={"Enter your Password"}
        name="password"
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
        })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        variant="standard"
      />
      {signUpMsg && (
        <Typography sx={{ marginTop: "30px", fontSize: 12, color: "red" }}>
          {signUpMsg}
        </Typography>
      )}
      <Typography sx={{ marginTop: "10px", fontSize: 12, color: "#878787" }}>
        By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
      </Typography>
      {!signUpButton && (
        <Button
          sx={{
            marginTop: "10px",
            height: 45,
            backgroundColor: "#fb641b",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#fb641b",
            },
          }}
          onClick={handleUserLogin}
          variant="contained"
          type="submit"
        >
          {"Log in"}
        </Button>
      )}
      {signUpButton && (
        <Button
          sx={{
            marginTop: "10px",
            height: 45,
            backgroundColor: "#fb641b",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#fb641b",
            },
          }}
          onClick={handleSignUp}
          variant="contained"
          type="submit"
        >
          {"Sign up"}
        </Button>
      )}

      {!signUpButton ? (
        <Button
          onClick={handleSignUpButton}
          sx={{
            height: 45,
            fontWeight: 600,
            textTransform: "none",
          }}
          variant="text"
        >
          New to Flipkart? Create an account
        </Button>
      ) : (
        <Button
          onClick={handleExistingLoginUpButton}
          sx={{
            height: 45,
            fontWeight: 600,
            textTransform: "none",
            color: "#2874f0",
            backgroundColor: "#ffffff",
            marginTop: 2,
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          }}
          variant="contained"
        >
          Existing User? Log in
        </Button>
      )}
    </Box>
  );
}
