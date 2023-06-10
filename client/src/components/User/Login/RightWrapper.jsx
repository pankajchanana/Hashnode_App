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
import { listCurrentUserCartItems } from "../../../redux/actions/productsAction";
import Radio from "@mui/material/Radio";
import { useForm } from "react-hook-form";
import {v4 as uuid4} from 'uuid'

export default function RightWrapper({
  setLoginText,
  setSignUpButton,
  setLoginModalOpen,
  signUpButton,
}) {
  const { data, setData } = useContext(DataContext);
  const [signUpMsg, setSignUpMsg] = useState("");
  const [userLoginError, setUserLoginError] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
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

  const handleSignUp = async() => {
    console.log(data);
    const user = databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USERS_TABLE_ID,
      uuid4(),
      {
        name:data.name,
        email:data.email,
        password:data.password,
        gender:data.gender,
        mobile_number:data.mobile_no,
        is_seller:data.is_seller
      }
    );
    user
      .then((res) => {
        console.log(res, "account created");
      })
      .catch((e) => {
        console.log(e,"not created");
      });
  };

  const handleUserLogin = async () => {
    const promised = await account
      .createEmailSession(data.email, data.password)
      .then((response) => {
        console.log(response, response.userId, "email session success");
        setUserLoginError(false);
        sessionStorage.setItem("secret_key", response.userId);
        setLoginModalOpen(false);
        navigate(`/`);
        dispatch(listCurrentUserCartItems());
      })
      .catch((error) => {
        setUserLoginError(true);
        console.log(error, "email session failed");
      });
  };
  return (
    <form >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          overflow: "none",
        }}
      >
        {!signUpButton && userLoginError && (
          <Typography sx={{ textAlign: "center", fontSize: 17,mb:2, color: "red" }}>
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
              name="mobile_no"
              {...register("mobile_no", {
                required: {
                  value: true,
                  message: "Mobile number is required",
                },
              })}
              error={Boolean(errors.mobile_no)}
              helperText={errors.mobile_no?.message}
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
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </>
        )}
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
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
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
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          variant="standard"
        />
        {signUpMsg && (
          <Typography sx={{ marginTop: "30px", fontSize: 12, color: "red" }}>
            {signUpMsg}
          </Typography>
        )}
        <Typography sx={{ marginTop: "10px", fontSize: 12, color: "#878787" }}>
          By continuing, you agree to Flipkart's Terms of Use and Privacy
          Policy.
        </Typography>
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
          onClick={signUpButton ? handleSignUp() :handleUserLogin()}
          variant="contained"
          type="submit"
        >
          {signUpButton ? "Sign up" : "Log in"}
        </Button>

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
    </form>
  );
}
