import { Routes, Route, BrowserRouter } from "react-router-dom";
import SellerDashBoard from "./components/Seller/Dashboard/SellerDashBoard";
import ContextStore from "./components/utilities/ContextStore";

function App() {
  return (
    <ContextStore>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SellerDashBoard />} />
        </Routes>
      </BrowserRouter>
    </ContextStore>
  );
}

export default App;
