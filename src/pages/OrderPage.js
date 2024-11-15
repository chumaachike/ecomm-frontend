// src/pages/OrderPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getUserOrders } from "../redux/slices/orderSlice";
import OrderCard from "../components/OrderCard"; // Import the new OrderCard
import "../assets/styles/orderPage.css";

const OrderPage = () => {
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders({}));
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <div className="order-page">
                <h1>Your Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <OrderCard key={order.orderId} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderPage;
