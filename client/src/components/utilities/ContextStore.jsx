import { useState } from "react";
import { createContext } from "react";
import { useSelector } from "react-redux";

export const DataContext = createContext(null);

const ContextStore = ({ children }) => {
  const [sellerLogin, setSellerLogin] = useState(false);
  const [sellerSignup, setSellerSignup] = useState(false);
  const [sellerSignupStatus, setSellerSignupStatus] = useState(1);
  const [signUpButton, setSignUpButton] = useState(false);
  const [cartItemsData, setCartItemsData] = useState();
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(null);

  const [data, setData] = useState({
    name: "",
    user_id: "",
    email: "",
    password: "",
    gender: "",
    mobile_number: "",
    address: "",
    zip_code: "",
    land_mark: "",
    house_no: "",
    is_seller: false,
  });
  const [itemCount, setItemCount] = useState(1);
  const [openAdressModal, setOpenAdressModal] = useState(false);

  const [sellerSignupData, setSellerSignupData] = useState({
    email: "",
    mobile_number: "",
    gst_in: "",
    seller_signup_status: "1",
    password: "",
    full_name: "",
    display_name: "",
    is_seller: true,
  });

  return (
    <DataContext.Provider
      value={{
        setLoginErrorMsg,
        openAdressModal,
        loginErrorMsg,
        setOpenAdressModal,
        signUpButton,
        setSignUpButton,
        setLoginModalOpen,
        loginModalOpen,
        setItemCount,
        itemCount,
        cartItemsData,
        setCartItemsData,
        data,
        setData,
        sellerSignupData,
        setSellerSignupData,
        sellerLogin,
        setSellerLogin,
        sellerSignup,
        setSellerSignup,
        sellerSignupStatus,
        setSellerSignupStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default ContextStore;
