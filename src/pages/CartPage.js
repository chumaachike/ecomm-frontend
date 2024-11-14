// src/pages/CartPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, addOrUpdateUserCart } from "../redux/slices/cartSlice";
import "../assets/styles/cartPage.css";

const CartPage = () => {
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleQuantityChange = (productId, quantity) => {
        dispatch(addOrUpdateUserCart({ productId, quantity }));
    };

    const handleRemove = (productId) => {
        dispatch(removeItem(productId));
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="cart-item">
                                <img src={item.imageUrl} alt={item.productName} />
                                <div className="item-details">
                                    <h3>{item.productName}</h3>
                                    <p>Price: ${item.specialPrice}</p>
                                    <p>Total: ${(item.specialPrice * item.quantity).toFixed(2)}</p>
                                    <label>
                                        Quantity:
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(item.productId, Number(e.target.value))
                                            }
                                        />
                                    </label>
                                    <button onClick={() => handleRemove(item.productId)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                        <button className="checkout-button">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
