// src/components/PaymentMethod.js
import React from "react";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => (
    <div className="payment-method">
        <h2>Payment Method</h2>
        <label>
            <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={paymentMethod === "credit-card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit Card
        </label>
        <label>
            <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
        </label>
    </div>
);

export default PaymentMethod;
