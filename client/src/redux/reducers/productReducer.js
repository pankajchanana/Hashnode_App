import * as ActionTypes from "../constants/action-types";

const initialState = {
  initialProducts: [],
  sellerProducts: [],
  sellerLastOrderProducts: [],
  recommendedProducts: [],
  sellerSignupStatus: "1",
  userExistStatus: false,
  cartItems: [],
  itemPresentInCart: false,
  totalItemCount: 0,
  userSearchData: [],
  searchedProduct: {},
  userAddress: {},
  userMyOrders:[]
};

export const productReducer = (state = initialState, action) => {
  let itemId,
    newCartItems = [],
    lastOrderItms = [];
  let products;
  switch (action.type) {
    case ActionTypes.SET_INITIAL_SELLER_PRODUCTS:
      return { ...state, sellerProducts: action.payload };
    case ActionTypes.SET_INITIAL_USER_PRODUCTS:
      return { ...initialState, initialProducts: action.payload };

    case ActionTypes.SET_INITIAL_LAST_ORDERS_PRODUCTS:
      const products = [...state.initialProducts];
      const lastOrderItms = [...action.payload];
      const newCartItems = [];

      products.forEach((p) => {
        lastOrderItms.forEach((q) => {
          if (p.product_id === q.product_id) {
            const timestamp = "2023-06-11T17:27:47.185+00:00";
            const mergedItem = { ...p, ...q};
            newCartItems.push(mergedItem);
          }
        });
      });
      return { ...state, sellerLastOrderProducts: newCartItems };

    case ActionTypes.SELLER_ALREADY_EXIST:
      return { ...initialState, userExistStatus: action.payload };

    case ActionTypes.ACCOUNT_CREATED_SUCCESSFULLY:
      return { ...initialState, sellerSignupStatus: action.payload };

    case ActionTypes.USER_CART_ITEMS:
      const cartItms = action.payload;
      let updatedCartItms = [];
      let newItem = [];
      let initalproducts = [...state.initialProducts];
      initalproducts.forEach((item) => {
        newItem = { ...item };
        cartItms.forEach((q) => {
          if (q.product_id === item.product_id) {
            newItem.product_count = q.product_count;
            newItem.product_id = q.$id;
            updatedCartItms.push(newItem);
          }
        });
      });
      return { ...state, cartItems: updatedCartItms };
    case ActionTypes.ITEM_ALREADY_IN_CART:
      const items = action.payload;
      return {
        ...state,
        totalItemCount: items.length,
        itemPresentInCart: items.length !== 0,
      };

    case ActionTypes.ITEM_ADDED:
      const itemId = action.payload.$id;
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.product_id === itemId) {
          return {
            ...item,
            product_count: action.payload.product_count,
            product_name: action.payload.product_name,
            seller_id: action.payload.seller_id,
            product_id: itemId,
          };
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case ActionTypes.ITEM_DELETED:
      let itemIds = action.payload;
      let newCartItemsArr = [...state.cartItems];
      newCartItemsArr.forEach((ite, index) => {
        if (ite.product_id === itemIds) {
          newCartItemsArr.splice(index, 1);
        }
      });
      return { ...state, cartItems: newCartItemsArr };
    case ActionTypes.ITEM_SEARCHED:
      return { ...state, userSearchData: action.payload.data };

    case ActionTypes.ITEM_REDIRECTION:
      return { ...state, searchedProduct: action.payload };
    case ActionTypes.USER_ADDRESS_STATUS:
      return { ...state, userAddress: action.payload };
    case ActionTypes.USER_RECOMMENDED_PRODUCTS:
      let recommendedProduct = eval(action.payload);
      let newRecommendedProducts = [];
      let newProducts = [...state.initialProducts];
      newProducts.map((q) => {
        recommendedProduct.map((item) => {
          if (item.product_id === q.product_id) {
            newRecommendedProducts.push(q);
          }
        });
      });
      return { ...state, recommendedProducts: newRecommendedProducts };
    case ActionTypes.SET_INITIAL_USER_LAST_ORDERS_PRODUCTS:
      return {...state,userMyOrders:action.payload}
  
    default:
      return state;
  }
};
