import { Query } from "appwrite";
import { account, databases } from "../../services/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import * as ActionTypes from "../constants/action-types"

const { VITE_DATABASE_ID, VITE_PRODUCTS_TABLE_ID } = import.meta.env;

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
  const uid = sessionStorage.getItem("secret_key");
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
  const seller_id=sessionStorage.getItem("secret_key")
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
