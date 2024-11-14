import { Link } from "react-router-dom";
import '../assets/styles/categories.css';
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../redux/slices/categorySlice";
import Cart from "./Cart";

const FeaturedCategories = ({ categories }) => {
    const dispatch = useDispatch();

    const handleCategoryClick = (category) => {
        dispatch(setSelectedCategory(category));
    }
    return (
        <section className="featured-categories">
            <h2>Recommended Categories</h2>
            <div className="category-grid">
                {categories.map((category) => (
                    <Link
                        to={`/categories/${category.categoryId}`}
                        key={category.categoryId}
                        onClick={() => handleCategoryClick(category)}>
                        <div className="category-card">
                            <img src={category.categoryUrl} alt={category.categoryNameame} />
                            <p>{category.categoryName}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

    )
}

export default FeaturedCategories;