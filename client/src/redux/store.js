import { configureStore, combineReducers,applyMiddleware } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({
  products: productReducer,
});

const middleware=[thunk];

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware()

});

export default store;
