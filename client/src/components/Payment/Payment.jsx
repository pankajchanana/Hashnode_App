import React from "react";
import "./Payment.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51NHUskSGWnyRQG26iUSi3EKdofnZOzX8OfuDmjDtmh7xmAG0nT8ie8WN6ioWlf82TETnqrw1u5DJQ31Y7IKieg9A00mFKbXC6c");

export const  Payment = ()=>  {
  return (
    <div className="App">
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
    </div>
  );
};

export default Payment;