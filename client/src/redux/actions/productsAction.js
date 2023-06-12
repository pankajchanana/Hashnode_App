import { Query } from "appwrite";
import { account, databases } from "../../services/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import * as ActionTypes from "../constants/action-types";
import axios from "axios";
import { useNavigate } from "react-router";

const {
  VITE_DATABASE_ID,
  VITE_PRODUCTS_TABLE_ID,
  VITE_CARTS_TABLE_ID,
  VITE_USERS_TABLE_ID,
  VITE_ORDERS_TABLE_ID,
} = import.meta.env;

//user initial products to display
export const listDefaultProducts = () => (dispatch) => {
  try {
    databases
      .listDocuments(VITE_DATABASE_ID, VITE_PRODUCTS_TABLE_ID, [
        Query.limit(100),
        Query.offset(0),
      ])
      .then((res) => {
        dispatch({
          type: ActionTypes.SET_INITIAL_USER_PRODUCTS,
          payload: res.documents,
        });
        // console.log(res, "initial prodcuts");
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
  if (uid) {
    try {
      databases
        .listDocuments(VITE_DATABASE_ID, VITE_PRODUCTS_TABLE_ID, [
          Query.equal("seller_id", uid),
          Query.limit(100),
          Query.offset(0),
        ])
        .then((res) => {
          dispatch({
            type: ActionTypes.SET_INITIAL_SELLER_PRODUCTS,
            payload: res.documents,
          });
          // console.log(res, "initial prodcuts");
        })
        .catch((e) => {
          console.log("initial products failed", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

//seller last order products

export const sellerLastOrderProductsList = () => (dispatch) => {
  const uid = sessionStorage.getItem("token");
  if (uid) {
    try {
      databases
        .listDocuments(VITE_DATABASE_ID, VITE_ORDERS_TABLE_ID, [
          Query.equal("seller_id", uid),
          Query.limit(100),
          Query.offset(0),
        ])
        .then((res) => {
          dispatch({
            type: ActionTypes.SET_INITIAL_LAST_ORDERS_PRODUCTS,
            payload: res.documents,
          });
          // console.log(res, "initial prodcuts");
        })
        .catch((e) => {
          console.log("initial products failed", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

//add new product

export const addNewSellerProduct = (data) => (dispatch) => {
  const uuid = uuidv4();
  const seller_id = sessionStorage.getItem("token");
  data.seller_id = seller_id;
  data.product_id = uuid;
  if (seller_id) {
    try {
      databases
        .createDocument(VITE_DATABASE_ID, VITE_PRODUCTS_TABLE_ID, uuid, data)
        .then((res) => {
          console.log(res, "Products added");
        })
        .catch((e) => {
          console.log("Products failed to add", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

//list all current user cart items
export const listCurrentUserCartItems = () => (dispatch) => {
  const token = sessionStorage.getItem("secret_key")
    ? sessionStorage.getItem("secret_key")
    : localStorage.getItem("secret_key");
  if (token) {
    try {
      databases
        .listDocuments(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, [
          Query.equal("user_id", token),
          Query.limit(100),
          Query.offset(0),
        ])
        .then((res) => {
          dispatch({
            type: ActionTypes.USER_CART_ITEMS,
            payload: res.documents,
          });
          // console.log(res, "cart prodcuts");
        })
        .catch((e) => {
          console.log("initial products failed", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

//check if product already in cart

export const checkIfProductAlreadyInCart = (productId) => (dispatch) => {
  const token = sessionStorage.getItem("secret_key")
    ? sessionStorage.getItem("secret_key")
    : localStorage.getItem("secret_key");
  if (token) {
    try {
      databases
        .listDocuments(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, [
          Query.equal("product_id", [productId, token]),
          Query.limit(100),
          Query.offset(0),
        ])
        .then((res) => {
          dispatch({
            type: ActionTypes.ITEM_ALREADY_IN_CART,
            payload: res.documents,
          });
          console.log(res, "product present");
        })
        .catch((e) => {
          console.log("products failed", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

//add or reduce cart items count
export const addOrReduceCartItemsCount = (productId, count) => (dispatch) => {
  const token = sessionStorage.getItem("secret_key")
    ? sessionStorage.getItem("secret_key")
    : localStorage.getItem("secret_key");
  if (token) {
    try {
      databases
        .updateDocument(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, productId, {
          product_count: count.toString(),
        })
        .then((res) => {
          dispatch({
            type: ActionTypes.ITEM_ADDED,
            payload: res,
          });
          console.log(res, "product added or remove");
        })
        .catch((e) => {
          console.log("products adding failed", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

//remove item from cart
export const removeItemFromCart = (productId) => (dispatch) => {
  const token = sessionStorage.getItem("secret_key")
    ? sessionStorage.getItem("secret_key")
    : localStorage.getItem("secret_key");
  if (token) {
    try {
      databases
        .deleteDocument(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, productId)
        .then((res) => {
          dispatch({
            type: ActionTypes.ITEM_DELETED,
            payload: productId,
          });
          console.log(res, "product deleted");
        })
        .catch((e) => {
          console.log("products delete failed", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

//search user input data

export const searchUserInputData = (data) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3000/api/search", {
        keyword: data,
      })
      .then((res) => {
        dispatch({
          type: ActionTypes.ITEM_SEARCHED,
          payload: res,
        });
        console.log(res, "search");
      })
      .catch((e) => {
        console.log(e, "error while searching");
      });
  } catch (e) {
    console.log(e);
  }
};

//user adress data
export const setUserAddressInfo = (data) => (dispatch) => {
  const token = sessionStorage.getItem("secret_key")
    ? sessionStorage.getItem("secret_key")
    : localStorage.getItem("secret_key");
  if (token) {
    try {
      databases
        .updateDocument(VITE_DATABASE_ID, VITE_USERS_TABLE_ID, token, {
          house_no: data.house_no,
          zip_code: data.zip_code,
          land_mark: data.land_mark,
          address: data.address,
          mobile_number: data.mobile_number,
        })
        .then((res) => {
          console.log(res, "address added");
          window.location.href = "/payment";
        })
        .catch((e) => {
          console.log("address adding failed", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

export const deleteUserCartItemsAndAddToOrdersItems = () => (dispatch) => {
  const token = sessionStorage.getItem("secret_key")
    ? sessionStorage.getItem("secret_key")
    : localStorage.getItem("secret_key");

  if (token) {
    try {
      databases
        .listDocuments(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, [
          Query.equal("user_id", token),
          Query.limit(100),
          Query.offset(0),
        ])
        .then((res) => {
          const cartItems = res.documents;
          console.log(cartItems, "users");
          cartItems.map((i) => {
            const uid = uuidv4();
            databases
              .createDocument(VITE_DATABASE_ID, VITE_ORDERS_TABLE_ID, uid, {
                order_status: "Order Placed",
                user_id: token,
                seller_id: i.seller_id,
                product_id: i.product_id,
                order_id: uid,
                customer_name:i.customer_name,
                product_price:i.product_price
              })
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
            databases
              .deleteDocument(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, i.$id)
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
};

//set token

export const setToken = (data, isSeller) => (dispatch) => {
  try {
    databases
      .listDocuments(VITE_DATABASE_ID, VITE_USERS_TABLE_ID, [
        Query.equal("email", data),
        Query.limit(100),
        Query.offset(0),
      ])
      .then((res) => {
        console.log(res, "login token");
        if (isSeller) {
          sessionStorage.setItem("token", res.documents[0].$id);
          localStorage.setItem("token", res.documents[0].$id);
          window.location.href=`/seller-home/dashboard/${res.documents[0].$id}`;
        } else {
          sessionStorage.setItem("secret_key", res.documents[0].$id);
          localStorage.setItem("secret_key", res.documents[0].$id);
        }
      })
      .catch((e) => {
        console.log("initial products failed", e);
      });
  } catch (e) {
    console.log(e);
  }
};

//check if user already has address

export const checkIfUserHasAddress = () => (dispatch) => {
  try {
    const token = sessionStorage.getItem("secret_key");
    databases
      .listDocuments(VITE_DATABASE_ID, VITE_USERS_TABLE_ID, [
        Query.equal("user_id", token),
        Query.limit(100),
        Query.offset(0),
      ])
      .then((res) => {
        const products = res.documents;
        console.log(products, "my pro");
        dispatch({
          type: ActionTypes.USER_ADDRESS_STATUS,
          payload: products[0],
        });
      })
      .catch((e) => {
        console.log("address check failed", e);
      });
  } catch (e) {
    console.log(e);
  }
};
