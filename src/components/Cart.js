import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, removeItem, addOrUpdateUserCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { debounce } from "../services/utils"; // Assuming debounce utility is correctly exported
import "../assets/styles/cart.css";

const Cart = () => {
    const { cartItems, loading, error } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState({});
    const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    const debouncedUpdateCart = useCallback(
        debounce((productId, quantity) => {
            dispatch(addOrUpdateUserCart({ productId, quantity }));
        }, 500),
        [dispatch]
    );

    const handleSelect = (productId) => {
        const updatedSelectedItems = { ...selectedItems };

        if (selectedItems[productId]) {
            delete updatedSelectedItems[productId];
        } else {
            const selectedItem = cartItems.find((item) => item.productId === productId);
            updatedSelectedItems[productId] = { ...selectedItem };
        }

        setSelectedItems(updatedSelectedItems);
        recalculateTotal(updatedSelectedItems);
    };

    const recalculateTotal = (selectedItems) => {
        const total = Object.values(selectedItems).reduce(
            (sum, item) => sum + item.specialPrice * item.quantity,
            0
        );
        setTotalSelectedPrice(total);
    };

    const handleProceedToCheckout = () => {
        navigate("/checkout", { state: { selectedItems } });
    };

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
                                <input
                                    type="checkbox"
                                    checked={!!selectedItems[item.productId]}
                                    onChange={() => handleSelect(item.productId)}
                                />
                                <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3>{item.productName}</h3>
                                    <p>Price: ${item.specialPrice.toFixed(2)}</p>
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
                        <h3>Selected Items Total: ${totalSelectedPrice.toFixed(2)}</h3>
                        <button
                            onClick={handleProceedToCheckout}
                            className="checkout-button"
                            disabled={Object.keys(selectedItems).length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
