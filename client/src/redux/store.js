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
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['ITEM_SEARCHED'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.time  stamp'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates'],
    },
  })

});

export default store;
