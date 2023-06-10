import * as ActionTypes from "../constants/action-types";
import { initialProducts } from "../../components/User/constants/constants";

const initialState = {
  sellerProducts: [],
  sellerSignupStatus: "1",
  userExistStatus: false,
  cartItems: [],
  itemPresentInCart: false,
  totalItemCount:0,
  userSearchData:[]
};

export const productReducer = (state = initialState, action) => {
  let itemId,newCartItems=[];
  switch (action.type) {
    case ActionTypes.SET_INITIAL_SELLER_PRODUCTS:
      return { ...initialState, sellerProducts: action.payload };

    case ActionTypes.SELLER_ALREADY_EXIST:
      return { ...initialState, userExistStatus: action.payload };

    case ActionTypes.ACCOUNT_CREATED_SUCCESSFULLY:
      return { ...initialState, sellerSignupStatus: action.payload };

    case ActionTypes.USER_CART_ITEMS:
      const cartItms = action.payload;
      let updatedCartItms = [];
      initialProducts.forEach((item) => {
        cartItms.forEach((q) => {
          if (q.product_id === item.id) {
            item.product_count=q.product_count;
            item.product_id=q.$id;
            updatedCartItms.push(item);
          }
        });
      });
      return { ...initialState, cartItems: updatedCartItms };
    case ActionTypes.ITEM_ALREADY_IN_CART:
      const items = action.payload;
      return { ...state,totalItemCount:items.length , itemPresentInCart: items.length !== 0 };

      case ActionTypes.ITEM_ADDED:
         itemId = action.payload.$id;
         newCartItems=[...state.cartItems]
        newCartItems.forEach((ite)=>{
          if(ite.product_id===itemId){
            ite.product_count=action.payload.product_count
          }
        })
        return { ...state,cartItems:newCartItems};

        case ActionTypes.ITEM_DELETED:
          itemId = action.payload;
           newCartItems=[...state.cartItems]
          newCartItems.forEach((ite,index)=>{
            if(ite.product_id===itemId){
              newCartItems.splice(index,1)
            }
          })
          return { ...state,cartItems:newCartItems};
        case ActionTypes.ITEM_SEARCHED:
          return {...state,userSearchData:action.payload.data.products }
    
    default:
      return state;
  }
};
