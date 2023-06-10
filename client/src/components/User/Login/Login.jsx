import * as React from "react";
import { Box, Dialog } from "@mui/material";
import LeftWrapper from "./LeftWrapper";
import RightWrapper from "./RightWrapper";
import { DataContext } from "../../utilities/ContextStore";
import { account } from "../../../services/appwriteConfig";

export default function Login({ loginModalOpen, setLoginModalOpen }) {
  const [loginText, setLoginText] = React.useState({
    title: "Login",
    subTitle: "Get access to your Orders,Wishlist and Recommendations",
  });
  const { signUpButton, setSignUpButton } = React.useContext(DataContext);

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 800,
          width: 650,
          maxHeight: 650,
          height: 500,
        },
      }}
      open={loginModalOpen}
      onClose={() => setLoginModalOpen(false)}
    >
      <Box sx={{ display: "flex" }}>
        <LeftWrapper loginText={loginText} />
        <RightWrapper
          setLoginModalOpen={setLoginModalOpen}
          signUpButton={signUpButton}
          setSignUpButton={setSignUpButton}
          setLoginText={setLoginText}
        />
      </Box>
    </Dialog>
  );
}
