import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedCategories from "../components/FeaturedCategories";
import FeaturedProducts from "../components/FeaturedProducts";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/slices/categorySlice";
import { getProducts } from "../redux/slices/productSlice";
import "../assets/styles/home.css";
import Navbar from "../components/Navbar";

function HomePage() {
  const dispatch = useDispatch();
  const { categories, categoryLoading, categoryError } = useSelector((state) => state.category);
  const { products, productLoading, productError } = useSelector((state) => state.product); 

  useEffect(() => {
    dispatch(getCategories({}));
    dispatch(getProducts({}));
  }, [dispatch]);

  return (
    <div className="homepage">
      <Navbar/>
      <HeroSection />
      {categoryLoading && <p>Loading categories...</p>}
      {categoryError && <p>Error loading categories: {categoryError}</p>}
      {!categoryLoading && !categoryError && <FeaturedCategories categories={categories} />}
      {productLoading && <p>Loading products</p>}
      {productError && <p>Error loading products: {productError}</p>}
      {!productLoading && !productError && <FeaturedProducts products={products} />}
      {/*<CTASection />  */}
      <Footer />
    </div>
  );
}

export default HomePage;
