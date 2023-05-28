import { Routes, Route, BrowserRouter } from "react-router-dom";
import SellerDashBoard from "./components/Seller/Dashboard/SellerDashBoard";
import SellerSignup from "./components/Seller/Forms/SellerSignup";
import Home from "./components/Seller/Home/Home";
import ContextStore from "./components/utilities/ContextStore";

function App() {
  return (
    <ContextStore>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SellerDashBoard />} />
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/seller-home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ContextStore>
  );
}

export default App;
