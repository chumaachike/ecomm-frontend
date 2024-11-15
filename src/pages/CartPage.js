import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, addOrUpdateUserCart } from "../redux/slices/cartSlice";
import "../assets/styles/cartPage.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State to track selected items and their total
    const [selectedItems, setSelectedItems] = useState({});
    const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);

    const handleQuantityChange = (productId, quantity) => {
        dispatch(addOrUpdateUserCart({ productId, quantity }));
    
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = { ...prevSelectedItems };
            if (updatedSelectedItems[productId]) {
                updatedSelectedItems[productId].quantity = quantity;
            }
            recalculateTotal(updatedSelectedItems);
            return updatedSelectedItems;
        });
    };
    const handleRemove = (productId) => {
        dispatch(removeItem(productId));
        // Remove item from selected if it's in selectedItems
        if (selectedItems[productId]) {
            const updatedSelectedItems = { ...selectedItems };
            delete updatedSelectedItems[productId];
            setSelectedItems(updatedSelectedItems);
            recalculateTotal(updatedSelectedItems);
        }
    };

    const handleSelect = (productId, quantity = null) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = { ...prevSelectedItems };
            const selectedItem = cartItems.find((item) => item.productId === productId);
    
            if (updatedSelectedItems[productId]) {
                delete updatedSelectedItems[productId];
            } else {
                updatedSelectedItems[productId] = {
                    ...selectedItem,
                    quantity: quantity ?? selectedItem.quantity,
                };
            }
    
            recalculateTotal(updatedSelectedItems);
            return updatedSelectedItems;
        });
    };

    const recalculateTotal = (selectedItems) => {
    const total = Object.values(selectedItems).reduce(
        (sum, item) => sum + item.specialPrice * item.quantity,
        0
    );
    setTotalSelectedPrice(total);
};

    const handleClick = () => {
        navigate("/checkout", { state: { selectedItems } });
    };

    return (
        <>
            <Navbar />
            <div className="cart-page">
                <h1>Your Cart</h1>
                {cartItems.length === 0 ? (
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
                                    <img src={item.imageUrl} alt={item.productName} />
                                    <div className="item-details">
                                        <h3>{item.productName}</h3>
                                        <p>Price: ${item.specialPrice}</p>
                                        <p>
                                            Total: $
                                            {(item.specialPrice * item.quantity).toFixed(2)}
                                        </p>
                                        <label>
                                            Quantity:
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.productId,
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                        </label>
                                        <button
                                            onClick={() => handleRemove(item.productId)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <h3>
                                Selected Items Total: $
                                {totalSelectedPrice.toFixed(2)}
                            </h3>
                            <button
                                onClick={handleClick}
                                className="checkout-button"
                                disabled={Object.keys(selectedItems).length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartPage;
