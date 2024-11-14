import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/slices/productSlice";
import { useParams } from "react-router-dom";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { addOrUpdateUserCart } from "../redux/slices/cartSlice";
import '../assets/styles/products.css';


function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState(1); // Default quantity set to 1

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value)); // Update state when user selects a quantity
  };

  const handleClick = () => {
    dispatch(addOrUpdateUserCart({productId: product.productId, quantity}))
  }
  useEffect(() => {
    dispatch(getProductById(id)); // Fetch product details by ID
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error.message || 'Failed to load product details.'}</p>;
  }

  if (!product) {
    return <p>No product found with ID {id}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="product-details-page">
        <div className="main-content">
          <div className="product-details">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.productName} />
            </div>
            <div className="product-info">
              <h1>{product.productName}</h1>
              <p>Price: <span>${product.price}</span></p>
              <p>Discount Price: <span>${product.specialPrice}</span></p>
              <p>Quantity Available: {product.quantity}</p>
              <p>Description: {product.description}</p>
              <label className="product-quantity-label">
                Select Quantity:
                <select value={quantity} onChange={handleQuantityChange} className="product-quantity-select">
                  {[...Array(product.quantity)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </label>
              <div className="product-actions">
                <button onClick={handleClick}>Add to Cart</button>
                <button>Buy Now</button>
              </div>
            </div>
          </div>

          {/* Product Reviews */}
          <div className="product-reviews">
            <h2>Customer Reviews</h2>
            <p>Average Rating: ⭐⭐⭐⭐☆ (4.5)</p>
            <div className="review">
              <h3>John Doe</h3>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Excellent product! Highly recommend.</p>
            </div>
            <div className="review">
              <h3>Jane Smith</h3>
              <p>⭐⭐⭐⭐</p>
              <p>Good quality, but shipping was delayed.</p>
            </div>
            <button>Write a Review</button>
          </div>

          {/* Related Products */}
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-products-list">
              <div className="related-product-item">
                <img src="/path/to/image1.jpg" alt="Related Product 1" />
                <p>Product 1</p>
                <p>$19.99</p>
              </div>
              <div className="related-product-item">
                <img src="/path/to/image2.jpg" alt="Related Product 2" />
                <p>Product 2</p>
                <p>$24.99</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Section */}
        <div className="cart-section">
          <Cart />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
