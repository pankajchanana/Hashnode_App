import { Routes, Route, BrowserRouter } from "react-router-dom";
import RedirectAuth from "./components/Authentication/RedirectAuth";
import RequireAuth from "./components/Authentication/RequireAuth";
import SellerDashBoard from "./components/Seller/Dashboard/SellerDashBoard";
import SellerSignup from "./components/Seller/Forms/SellerSignup";
import Home from "./components/Seller/Home/Home";
import SellerAddNewProduct from "./components/Seller/Home/SellerAddNewProduct";
import ContextStore from "./components/utilities/ContextStore";
import UserDashboard from "./components/User/Dashboard/UserDashboard";

function App() {
  return (
    <ContextStore>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route element={<RedirectAuth />}>
            <Route path="/seller" element={<SellerDashBoard />} />
            <Route path="/seller-signup" element={<SellerSignup />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/seller-home/dashboard/:id" element={<Home />} />
            <Route path="/seller-home/products/:id" element={<Home />} />
            <Route path="/new-product" element={<SellerAddNewProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextStore>
  );
}

export default App;
