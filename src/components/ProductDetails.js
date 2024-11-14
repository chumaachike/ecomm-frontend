import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/slices/productSlice"; 
import { useParams } from "react-router-dom";
import Cart from "./Cart";
import '../assets/styles/products.css'; // Import the CSS file
import Navbar from "./Navbar";

function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

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
    <Cart />
    <div className="product-details">
      <img src={product.imageUrl} alt={product.name} />
      <h1>{product.productName}</h1>
      <p>Price: <span>${product.price}</span></p>
      <p>Quantity: {product.quantity}</p>
      <p>Description: {product.description}</p>
      <p>Discount Price: <span>${product.specialPrice}</span></p>
    </div>
    </>
  );
}

export default ProductDetails;
