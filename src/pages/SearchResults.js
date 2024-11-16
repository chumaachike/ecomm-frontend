import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByKeyword } from "../redux/slices/productSlice";
import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import "../assets/styles/searchPage.css"; // Updated CSS file

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByKeyword(searchQuery));
  }, [dispatch, searchQuery]);

  const { products, loading, error } = useSelector((state) => state.product);

  return (
    <>
      <Navbar />
      <div className="search-page">
        <div className="search-header">
          <h1>Search Results for: "{searchQuery}"</h1>
        </div>
        <div className="search-content">
          <div className="product-section">
            {loading && <p className="loading">Loading Products...</p>}
            {error && <p className="error">Error loading products: {error.message}</p>}
            {!loading && !error && <ProductList products={products} />}
          </div>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default SearchResults;