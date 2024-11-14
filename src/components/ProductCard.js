import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrUpdateUserCart } from "../redux/slices/cartSlice";
import "../assets/styles/products.css";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addOrUpdateUserCart({ productId: product.productId, quantity }));
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value)); // Update state when user selects a quantity
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.productId}`}>
        <img src={product.imageUrl} alt={product.productName} />
        <h3>{product.productName}</h3>
      </Link>
      <p>
        Price: <span>${product.price}</span>
      </p>
      <p>
        Discount: <span>${product.discount}</span>
      </p>
      <p>
        Available Quantity: <span>{product.quantity}</span>
      </p>
      <label>
        Select Quantity:
        <select value={quantity} onChange={handleQuantityChange}>
          {[...Array(product.quantity)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
