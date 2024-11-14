import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../redux/slices/productSlice";
import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import "../assets/styles/categoryProduct.css"; // Updated CSS file

const CategoryProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category.category);

    useEffect(() => {
        dispatch(getProductsByCategory(id));
    }, [dispatch, id]);

    const { products, loading, error } = useSelector((state) => state.product);

    return (
        <>
        <Navbar />
        <div className="category-page">
            <div className="category-header">
                <h1>{category?.categoryName || "Category"}</h1>
            </div>
            <div className="category-content">
                <div className="product-section">
                    {loading && <p className="loading">Loading Products...</p>}
                    {error && <p className="error">Error loading products: {error}</p>}
                    {!loading && !error && <ProductList products={products} />}
                </div>
                <Cart />
            </div>
        </div>
        </>
    );
};

export default CategoryProduct;
