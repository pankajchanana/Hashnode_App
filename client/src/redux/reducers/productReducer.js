import * as ActionTypes from "../constants/action-types";

const initialState = {
  sellerProducts: [],
  sellerSignupStatus:"1",
  userExistStatus:false
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_INITIAL_SELLER_PRODUCTS:
      return {sellerProducts : action.payload}
    
    case ActionTypes.SELLER_ALREADY_EXIST:
      return {userExistStatus:action.payload} 

    case ActionTypes.ACCOUNT_CREATED_SUCCESSFULLY:
      return {sellerSignupStatus:action.payload}

    default:
      return state;
  }
};
