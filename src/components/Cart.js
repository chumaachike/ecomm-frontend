import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, removeItem, addOrUpdateUserCart } from "../redux/slices/cartSlice";
import { debounce } from "../services/utils"; // Assuming debounce utility is correctly exported
import "../assets/styles/cart.css";

const Cart = () => {
    const { cartItems, totalPrice, loading, error } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserCart({}));
    }, [dispatch]); // Correct dependencies for fetching the cart

    const debouncedUpdateCart = useCallback(
        debounce((productId, quantity) => {
            dispatch(addOrUpdateUserCart({ productId, quantity }));
        }, 500),
        [dispatch] // Correct dependencies for debounce
    );

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {loading && <p>Loading your cart...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="cart-item">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3>{item.productName}</h3>
                                    <p>Price: ${item.specialPrice}</p>
                                    <p>Total: ${(item.specialPrice * item.quantity).toFixed(2)}</p>
                                    <div className="cart-item-actions">
                                        <label>
                                            Quantity:
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    debouncedUpdateCart(
                                                        item.productId,
                                                        Number(e.target.value)
                                                    )
                                                }
                                                disabled={loading}
                                            />
                                        </label>
                                        <button
                                            className="remove-button"
                                            onClick={() => dispatch(removeItem(item.productId))}
                                            disabled={loading}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
