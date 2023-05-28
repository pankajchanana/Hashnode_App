import { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext(null);

const ContextStore = ({ children }) => {
  const [sellerLogin, setSellerLogin] = useState(false);
  const [sellerSignup, setSellerSignup] = useState(false);

  return (
    <DataContext.Provider value={{ sellerLogin, setSellerLogin ,sellerSignup,setSellerSignup}}>
      {children}
    </DataContext.Provider>
  );
};

export default ContextStore;
