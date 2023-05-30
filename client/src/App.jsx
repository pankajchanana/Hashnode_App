import { Routes, Route, BrowserRouter } from "react-router-dom";
import RedirectAuth from "./components/Authentication/RedirectAuth";
import RequireAuth from "./components/Authentication/RequireAuth";
import SellerDashBoard from "./components/Seller/Dashboard/SellerDashBoard";
import SellerSignup from "./components/Seller/Forms/SellerSignup";
import Home from "./components/Seller/Home/Home";
import ContextStore from "./components/utilities/ContextStore";

function App() {
  return (
    <ContextStore>
      <BrowserRouter>
        <Routes>
          <Route element={<RedirectAuth/>}>
            <Route path="/" element={<SellerDashBoard />} />
            <Route path="/seller-signup" element={<SellerSignup />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/seller-home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextStore>
  );
}

export default App;
