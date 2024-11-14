import ProductCard from "./ProductCard";
import '../assets/styles/products.css';

const FeaturedProducts = ({products}) => {
    return (
        <section className="featured-products">
            <h2>Recommended Products</h2>
            <div className="product-grid">
                {/* Use ProductCard component */}
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </section>

    )
}

export default FeaturedProducts;