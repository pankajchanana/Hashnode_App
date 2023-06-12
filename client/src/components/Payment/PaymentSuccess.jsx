import { Button } from "@mui/material";
import React from "react";
import "./Payment.css";

export default function PaymentSuccess() {
  return (
    <div className="payment-success-container">
      <h1 className="payment-success-title">Payment Successful!</h1>
      <p className="payment-success-message">Thank you for your purchase.</p>
      <p className="payment-success-message">
        Your order will be shipped soon.
      </p>
      <Button onClick={() => (window.location.href = "/")}>
        Click here to go to homepage.
      </Button>
    </div>
  );
}
