import * as ActionTypes from "../constants/action-types";

const initialState = {
  initialProducts: [],
  sellerProducts: [],
  sellerLastOrderProducts:[],
  sellerSignupStatus: "1",
  userExistStatus: false,
  cartItems: [],
  itemPresentInCart: false,
  totalItemCount: 0,
  userSearchData: [],
  searchedProduct: {},
  userAddress: {},
};

export const productReducer = (state = initialState, action) => {
  let itemId,
    newCartItems = [];
  switch (action.type) {
    case ActionTypes.SET_INITIAL_SELLER_PRODUCTS:
      return { ...state, sellerProducts: action.payload };
      case ActionTypes.SET_INITIAL_LAST_ORDERS_PRODUCTS:
        return { ...state, sellerLastOrderProducts: action.payload };

    case ActionTypes.SET_INITIAL_USER_PRODUCTS:
      return { ...initialState, initialProducts: action.payload };

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
      itemId = action.payload.$id;
      newCartItems = [...state.cartItems];
      newCartItems.forEach((ite) => {
        if (ite.product_id === itemId) {
          ite.product_count = action.payload.product_count;
          ite.product_name = action.payload.product_name;
          ite.seller_id = action.payload.seller_id;
          ite.product_id = itemId;
        }
      });
      return { ...state, cartItems: newCartItems };

    case ActionTypes.ITEM_DELETED:
      itemId = action.payload;
      newCartItems = [...state.cartItems];
      newCartItems.forEach((ite, index) => {
        if (ite.product_id === itemId) {
          newCartItems.splice(index, 1);
        }
      });
      return { ...state, cartItems: newCartItems };
    case ActionTypes.ITEM_SEARCHED:
      return { ...state, userSearchData: action.payload.data };

    case ActionTypes.ITEM_REDIRECTION:
      return { ...state, searchedProduct: action.payload };
    case ActionTypes.USER_ADDRESS_STATUS:
      return { ...state, userAddress: action.payload };

    default:
      return state;
  }
};
