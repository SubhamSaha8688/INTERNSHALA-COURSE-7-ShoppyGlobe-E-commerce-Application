import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      navigate("/cart");
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-detail-left">
        <img src={product.thumbnail || "/placeholder.svg"} alt={product.title} className="product-detail-image" />
        <div className="product-images">
          {product.images &&
            product.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${product.title} ${index}`}
                className="product-thumbnail"
              />
            ))}
        </div>
      </div>
      <div className="product-detail-right">
        <h1 className="product-detail-title">{product.title}</h1>
        <p className="product-detail-description">{product.description}</p>
        <div className="product-detail-info">
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-rating">Rating: {product.rating} ★</p>
          <p className="product-detail-stock">In Stock: {product.stock}</p>
          <p className="product-detail-brand">Brand: {product.brand}</p>
          <p className="product-detail-category">Category: {product.category}</p>
        </div>
        <div className="product-detail-actions">
          <div className="quantity-selector">
            <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="quantity-btn">
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)} className="quantity-btn">
              +
            </button>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;