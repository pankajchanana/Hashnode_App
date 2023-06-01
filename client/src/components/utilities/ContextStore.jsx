import { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext(null);

const ContextStore = ({ children }) => {
  const [sellerLogin, setSellerLogin] = useState(false);
  const [sellerSignup, setSellerSignup] = useState(false);
  const [sellerSignupStatus,setSellerSignupStatus]=useState(1);
  const [sellerSignupData,setSellerSignupData]=useState({
    email:"",
    mobile_number:"",
    gst_in:"",
    seller_signup_status:"1",
    password:"",
    full_name:"",
    display_name:"",
    is_seller:false,
  })

  return (
    <DataContext.Provider value={{sellerSignupData,setSellerSignupData, sellerLogin, setSellerLogin ,sellerSignup,setSellerSignup,sellerSignupStatus,setSellerSignupStatus}}>
      {children}
    </DataContext.Provider>
  );
};

export default ContextStore;
