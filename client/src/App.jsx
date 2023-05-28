import { Routes, Route, BrowserRouter } from "react-router-dom";
import SellerDashBoard from "./components/Seller/Dashboard/SellerDashBoard";
import SellerSignup from "./components/Seller/Forms/SellerSignup";
import ContextStore from "./components/utilities/ContextStore";

function App() {
  return (
    <ContextStore>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SellerDashBoard />} />
          <Route path="/sellerSignup" element={<SellerSignup />} />
        </Routes>
      </BrowserRouter>
    </ContextStore>
  );
}

export default App;
