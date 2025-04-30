import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.thumbnail || "/placeholder.svg"} alt={product.title} className="product-image" />
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <div className="product-rating">Rating: {product.rating} ★</div>
      </Link>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;