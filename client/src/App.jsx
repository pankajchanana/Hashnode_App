import { Routes, Route, BrowserRouter } from "react-router-dom";
import RedirectAuth from "./components/Authentication/RedirectAuth";
import RequireAuth from "./components/Authentication/RequireAuth";
import SellerDashBoard from "./components/Seller/Dashboard/SellerDashBoard";
import SellerSignup from "./components/Seller/Forms/SellerSignup";
import Home from "./components/Seller/Home/Home";
import SellerAddNewProduct from "./components/Seller/Home/SellerAddNewProduct";
import ContextStore from "./components/utilities/ContextStore";
import Main from "./components/User/Dashboard/Main";
import Navbar from "./components/Navbar/Navbar";
import DetailProduct from "./components/User/Dashboard/Products/DetailProduct/DetailProduct";
import CartPage from "./components/User/Dashboard/Products/DetailProduct/CartPage";
import MainCartPage from "./components/User/Dashboard/Products/DetailProduct/MainCartPage";
import { useDispatch } from "react-redux";
import {
  listCurrentUserCartItems,
  listDefaultProducts,
} from "./redux/actions/productsAction";
import { useEffect } from "react";
import Payment from "./components/Payment/Payment";
import PaymentSuccess from "./components/Payment/PaymentSuccess";

function App() {
  const route = window.location.pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCurrentUserCartItems());
  }, [route]);
  return (
    <ContextStore>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/viewcart/:id"
            element={
              <>
                <Navbar />
                <MainCartPage />{" "}
              </>
            }
          />
          <Route path="/seller" element={<SellerDashBoard />} />
          <Route
            path="/products/:id"
            element={
              <>
                <Navbar /> <DetailProduct />{" "}
              </>
            }
          />
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route element={<RedirectAuth />}></Route>
          <Route element={<RequireAuth />}>
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/seller-home/products/:id" element={<Home />} />
            <Route path="/seller-home/dashboard/*" element={<Home />} />
            <Route path="/new-product" element={<SellerAddNewProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextStore>
  );
}

export default App;
