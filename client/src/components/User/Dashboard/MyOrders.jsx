import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listDefaultProducts,
  userLastOrderProductsList,
} from "../../../redux/actions/productsAction";
import "./styles.css"; // Import the CSS file for styling


export default function MyOrders()  {
  const dispatch = useDispatch();
  const { userMyOrders, initialProducts } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(listDefaultProducts()).then(() => {
      dispatch(userLastOrderProductsList());
    });
  }, []);
  let orders = [];
  const filterMyOrders = () => {
    initialProducts.forEach((q) => {
      userMyOrders.forEach((p) => {
        if (p.product_id === q.product_id) {
          const merge = { ...q, ...p };
          orders.push(merge);
        }
      });
    });
    return orders;
  };
  return (
    <div className="order-list">
      <h2 className="order-list__title">Orders</h2>
      {userMyOrders.length === 0 ? (
        <p>Loading orders...</p>
      ) : (
        <ul className="order-list__list">
          {filterMyOrders().map((order) => (
            <li
              key={order.id}
              className="order-list__item"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <div className="order-list__item-details">
                <div className="order-list__item-id">Order ID: {order.$id}</div>
                <div className="order-list__item-id">Order Status: {order.order_status}</div>
                <div className="order-list__item-id">Seller Id: {order.seller_id}</div>
              </div>
              <div className="order-list__item-details">
                <div
                  style={{ fontSize: "20px" }}
                  className="order-list__item-customer"
                >
                  Product Name: {order.product_name}
                </div>
                <div
                  style={{ fontSize: "20px" }}
                  className="order-list__item-total"
                >
                  Total: Rs.{order.product_price}/-
                </div>
              </div>
              <div>
                <img
                  style={{
                    borderRadius: "30px",
                    height: "200px",
                    width: "200px",
                  }}
                  src={order.product_img}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
