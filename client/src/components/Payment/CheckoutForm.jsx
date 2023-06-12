import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import { deleteUserCartItemsAndAddToOrdersItems } from "../../redux/actions/productsAction";
import { useDispatch, useSelector } from "react-redux";

export const CheckoutForm = ({ stripe, elements }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token, "d");
      localStorage.setItem("payment_token", result.token.id);
      window.location.href = "/payment-success";
    }
  };
  return (
    <div style={{ width: "500px" }}>
      <div class="product-info">
        <h3 className="product-title" style={{ textAlign: "center" }}>
          Please pay here
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!stripe} className="btn-pay">
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
