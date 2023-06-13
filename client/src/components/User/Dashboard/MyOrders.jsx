import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listDefaultProducts,
  userLastOrderProductsList,
} from "../../../redux/actions/productsAction";
import "./styles.css"; // Import the CSS file for styling

export const OrderList = () => {
  const dispatch = useDispatch();
  const { userMyOrders, initialProducts } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(listDefaultProducts()).then(() => {
      dispatch(userLastOrderProductsList());
    });
  }, []);
  // let orders=[]
  // const filterMyOrders=()=>{
  //   initialProducts.forEach((q)=>{
  //     userMyOrders.forEach((p)=>{
  //     if(p.product_id===q.product_id){
  //       const merge={...q,...p}
  //       orders.push(merge)
  //     }
  //   })
  // })

  // filterMyOrders()
  // console.log(userMyOrders, orders, "userMyOrders");
  return (
    <div className="order-list">
      <h2 className="order-list__title">Orders</h2>
      {userMyOrders.length === 0 ? (
        <p>Loading orders...</p>
      ) : (
        <ul className="order-list__list">
          {userMyOrders.map((order) => (
            <li key={order.id} className="order-list__item">
              <div className="order-list__item-id">Order ID: {order.$id}</div>
              <div className="order-list__item-details">
                <div className="order-list__item-customer">
                  Customer Name: {order.customer_name}
                </div>
                <div className="order-list__item-customer">
                  Product Name: {order.customer_name}
                </div>
                <div className="order-list__item-total">
                  Total: ${order.product_price}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
