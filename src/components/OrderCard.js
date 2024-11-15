// src/components/OrderCard.js
import React from "react";
import "../assets/styles/orderCard.css"; // Ensure specific styles for OrderCard

const OrderCard = ({ order }) => (
    <div className="order-card">
        <h3>Order ID: {order.orderId}</h3>
        <p>Date: {order.orderDate}</p>
        <p>Total: ${order.totalPrice.toFixed(2)}</p>
        <p>Zip Code: {order.address.zipCode}</p>
        <div className="order-items">
            {order.orderItems.map((item, index) => (
                <p key={index}>
                    {item.quantity} x {item.productDTO.productName}
                </p>
            ))}
        </div>
    </div>
);

export default OrderCard;
