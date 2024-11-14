// src/components/ProductList/ProductList.js
import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
