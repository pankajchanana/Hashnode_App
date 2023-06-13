import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
const link = document.createElement("script");
const route =  window.location.pathname.split("/").slice(-1)[0];
const notAllowedRoutes = ["seller", sessionStorage.getItem('token'),"dashboard"];
if (!notAllowedRoutes.find((q) => q === route)) {
  link.src =
    "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
  document.getElementsByTagName("head")[0].appendChild(link);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
