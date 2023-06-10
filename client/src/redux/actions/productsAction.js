import { Query } from "appwrite";
import { account, databases } from "../../services/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import * as ActionTypes from "../constants/action-types"
import axios from 'axios'

const { VITE_DATABASE_ID, VITE_PRODUCTS_TABLE_ID,VITE_CARTS_TABLE_ID } = import.meta.env;

//user initial products to display
export const listDefaultProducts = () => (dispatch) => {
  try {
    databases
      .listDocuments(VITE_DATABASE_ID, VITE_PRODUCTS_TABLE_ID, [
        Query.limit(100),
        Query.offset(0),
      ])
      .then((res) => {
        console.log(res, "initial prodcuts");
      })
      .catch((e) => {
        console.log("initial products failed", e);
      });
  } catch (e) {
    console.log(e);
  }
};

//seller products
export const sellerProductsList = () => (dispatch) => {
  const uid = sessionStorage.getItem("token");
  try {
    databases
      .listDocuments(VITE_DATABASE_ID, VITE_PRODUCTS_TABLE_ID, [
        Query.equal("seller_id", uid),
        Query.limit(100),
        Query.offset(0),
      ])
      .then((res) => {
        dispatch({
          type:ActionTypes.SET_INITIAL_SELLER_PRODUCTS,
          payload:res.documents
        })
        console.log(res, "initial prodcuts");
      })
      .catch((e) => {
        console.log("initial products failed", e);
      });
  } catch (e) {
    console.log(e);
  }
};

//add new product

export const addNewSellerProduct = (data) => (dispatch) => {
  const uuid=uuidv4();
  const seller_id=sessionStorage.getItem("token")
  data.seller_id=seller_id;
  data.product_id=uuid;
  try {
    databases
      .createDocument(VITE_DATABASE_ID, VITE_PRODUCTS_TABLE_ID,uuid,data)
      .then((res) => {
        console.log(res, "Products added");
      })
      .catch((e) => {
        console.log("Products failed to add", e);
      });
  } catch (e) {
    console.log(e);
  }
};

//list all current user cart items
export const listCurrentUserCartItems = () => (dispatch) => {
  const token = sessionStorage.getItem("secret_key");
  try {
    databases
      .listDocuments(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, [
        Query.equal("user_id", token),
        Query.limit(100),
        Query.offset(0),
      ])
      .then((res) => {
        dispatch({
          type:ActionTypes.USER_CART_ITEMS,
          payload:res.documents
        })
        console.log(res, "cart prodcuts");
      })
      .catch((e) => {
        console.log("initial products failed", e);
      });
  } catch (e) {
    console.log(e);
  }
};


//check if product already in cart

export const checkIfProductAlreadyInCart = (productId) => (dispatch) => {
  const token = sessionStorage.getItem("secret_key");
  try {
    databases
      .listDocuments(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, [
        Query.equal("product_id", [productId,token]),
        Query.limit(100),
        Query.offset(0),
      ])
      .then((res) => {
        dispatch({
          type:ActionTypes.ITEM_ALREADY_IN_CART,
          payload:res.documents
        })
        console.log(res, "product present");
      })
      .catch((e) => {
        console.log("products failed", e);
      });
  } catch (e) {
    console.log(e);
  }
};


//add or reduce cart items count
export const addOrReduceCartItemsCount = (productId,count) => (dispatch) => {
  const token = sessionStorage.getItem("secret_key");
  try {
    databases
      .updateDocument(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID,productId, { product_count : count.toString()})
      .then((res) => {
        dispatch({
          type:ActionTypes.ITEM_ADDED,
          payload:res
        })
        console.log(res, "product added or remove");
      })
      .catch((e) => {
        console.log("products adding failed", e);
      });
  } catch (e) {
    console.log(e);
  }
};


//remove item from cart
export const removeItemFromCart = (productId) => (dispatch) => {
  const token = sessionStorage.getItem("secret_key");
  try {
    databases
      .deleteDocument(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID,productId)
      .then((res) => {
        dispatch({
          type:ActionTypes.ITEM_DELETED,
          payload:productId
        })
        console.log(res, "product deleted");
      })
      .catch((e) => {
        console.log("products delete failed", e);
      });
  } catch (e) {
    console.log(e);
  }
};


//search user input data 

export const searchUserInputData = (data) => async (dispatch) => {
  const token = sessionStorage.getItem("secret_key");
  try {
    await axios.post('http://localhost:3000/api/search',{
      "keyword":data
    }).then((res)=>{
      dispatch({
        type:ActionTypes.ITEM_SEARCHED,
        payload:res
      })
      console.log(res);
    }).catch((e)=>{
      console.log(e,"error while searching");
    })
  } catch (e) {
    console.log(e);
  }
};