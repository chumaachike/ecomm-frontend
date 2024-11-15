// src/components/OrderSummary.js
import React from "react";

const OrderSummary = ({ cartItems, totalPrice, handleOrderConfirmation }) => (
    <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
            {cartItems.map((item) => (
                <li key={item.productId}>
                    {item.quantity} x {item.productName} - $
                    {(item.specialPrice * item.quantity).toFixed(2)}
                </li>
            ))}
        </ul>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={handleOrderConfirmation} className="confirm-button"
        disabled={totalPrice <= 0}>
            Confirm Order
        </button>
    </div>
);

export default OrderSummary;
