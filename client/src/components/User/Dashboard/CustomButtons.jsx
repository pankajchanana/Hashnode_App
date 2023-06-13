import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import { Badge, Box, Button, Typography, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Login from "../Login/Login";
import { DataContext } from "../../utilities/ContextStore";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCurrentUserCartItems } from "../../../redux/actions/productsAction";
import { useEffect, useState } from "react";
import { databases } from "../../../services/appwriteConfig";

const { VITE_DATABASE_ID, VITE_USERS_TABLE_ID } = import.meta.env;
const Buttons = styled(Button)(
  ({ width, fontWeight, Color, backgroundColor, fontSize }) => ({
    backgroundColor: backgroundColor ? backgroundColor : "inherit",
    color: Color,
    borderRadius: 0,
    fontWeight: fontWeight,
    cursor: "pointer",
    fontSize: fontSize ? fontSize : "13px",
    width: width,
    "&:hover": {
      backgroundColor: backgroundColor ? backgroundColor : "inherit",
    },
  })
);

const ButtonWrapper = styled("div")(({ theme, width }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: width ? width : "600px",
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomButtons() {
  const [loginOpen, setLoginOpen] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const [user, setUser] = useState(null);
  const [userOptionsOpen, setUserOptionsOpen] = React.useState(null);
  const [menuShowingDropdown, setMenuShowingDropdown] = React.useState("");
  const buttonRef = React.useRef(null);
  const moreButtonRef = React.useRef(null);
  const loggedInButtonRef = React.useRef(null);
  const { setLoginModalOpen, loginModalOpen, setLoginErrorMsg } =
    React.useContext(DataContext);
  const secretKey = sessionStorage.getItem("secret_key");

  const theme = useTheme();

  const { cartItems } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUserLogout = () => {
    sessionStorage.removeItem("secret_key");
    localStorage.removeItem("secret_key");
    dispatch(listCurrentUserCartItems());
    navigate("/");
  };
  const handleViewCart = () => {
    if (secretKey) {
      navigate("/viewcart/" + secretKey);
      dispatch(listCurrentUserCartItems());
    } else {
      setLoginErrorMsg("Please Login to view Cart items");
      setLoginModalOpen(true);
    }
  };
  useEffect(() => {
    (async () => {
      const userId = sessionStorage.getItem("secret_key")
        ? sessionStorage.getItem("secret_key")
        : localStorage.getItem("secret_key");
      const res = await databases.getDocument(
        VITE_DATABASE_ID,
        VITE_USERS_TABLE_ID,
        userId
      );
      setUser(res);
    })();
  }, []);
  return (
    <ButtonWrapper>
      {!!!secretKey ? (
        <Buttons
          fontWeight={"800"}
          width={"130px"}
          backgroundColor={"white"}
          variant="outlined"
          onClick={(e) => setLoginModalOpen(e.currentTarget)}
          sx={{ zIndex: theme.zIndex.modal + 1 }}
          onMouseEnter={(e) => {
            setLoginOpen(e.currentTarget);
          }}
          onMouseLeave={() => setLoginOpen(false)}
          ref={buttonRef}
        >
          Login
        </Buttons>
      ) : (
        <>
          <Buttons
            fontWeight={"800"}
            width={"130px"}
            Color={"white"}
            variant="text"
            ref={loggedInButtonRef}
            onClick={(e) => setUserOptionsOpen(e.currentTarget)}
            onMouseEnter={(e) => {
              setUserOptionsOpen(e.currentTarget);
            }}
            onMouseLeave={() => setUserOptionsOpen(false)}
            sx={{ zIndex: theme.zIndex.modal + 1 }}
            endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          >
            {user?.name}
          </Buttons>
          <StyledMenu
            anchorEl={loggedInButtonRef.current}
            PaperProps={{
              onMouseEnter: (e) => {
                setUserOptionsOpen(e.currentTarget);
              },
              onMouseLeave: () => {
                setUserOptionsOpen(false);
              },
            }}
            open={userOptionsOpen}
            onClose={() => setUserOptionsOpen(false)}
          >
            <MenuItem onClick={() => setUserOptionsOpen(false)} disableRipple>
              <MoreHorizIcon />
              <Link to="/my-orders">My orders</Link>
            </MenuItem>
            <MenuItem onClick={handleUserLogout} disableRipple>
              <MoreHorizIcon />
              Log Out
            </MenuItem>
          </StyledMenu>
        </>
      )}
      {loginModalOpen && (
        <Login
          setLoginModalOpen={setLoginModalOpen}
          loginModalOpen={loginModalOpen}
        />
      )}
      <StyledMenu
        PaperProps={{
          onMouseEnter: (e) => {
            setLoginOpen(e.currentTarget);
          },
          onMouseLeave: () => {
            setLoginOpen(false);
          },
        }}
        anchorEl={buttonRef.current}
        open={loginOpen}
        onClose={() => setLoginOpen(null)}
      >
        <MenuItem onClick={() => setLoginOpen(null)} disableRipple>
          <Box>
            <ButtonWrapper width={"200px"}>
              <Typography fontWeight={"800"} fontSize={"13px"} mt={"5px"}>
                New Customer?
              </Typography>
              <Buttons fontWeight={"800"} fontSize={"11px"}>
                Sign up
              </Buttons>
            </ButtonWrapper>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => setLoginOpen(null)} disableRipple>
          <FileCopyIcon />
          My Profile
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => setLoginOpen(null)} disableRipple>
          <ArchiveIcon />
          Flipkart Plus Zone
        </MenuItem>
        <MenuItem onClick={() => setLoginOpen(null)} disableRipple>
          <MoreHorizIcon />
          Orders
        </MenuItem>
        <MenuItem onClick={() => setLoginOpen(null)} disableRipple>
          <MoreHorizIcon />
          Wishlist
        </MenuItem>
        <MenuItem onClick={() => setLoginOpen(null)} disableRipple>
          <MoreHorizIcon />
          Rewards
        </MenuItem>
        <MenuItem onClick={() => setLoginOpen(null)} disableRipple>
          <MoreHorizIcon />
          Gift Cards
        </MenuItem>
      </StyledMenu>

      {loginOpen && <Login setLoginOpen={setLoginOpen} loginOpen={loginOpen} />}
      <Link to="seller">
        <Buttons
          fontWeight={"800"}
          width={"150px"}
          Color={"white"}
          variant="text"
        >
          Become a Seller
        </Buttons>
      </Link>

      <Buttons
        fontWeight={"800"}
        width={"150px"}
        Color={"white"}
        variant="text"
        startIcon={
          <Badge badgeContent={cartItems.length} color="error">
            {" "}
            <ShoppingCartIcon />{" "}
          </Badge>
        }
        onClick={handleViewCart}
      >
        Cart
      </Buttons>
    </ButtonWrapper>
  );
}
