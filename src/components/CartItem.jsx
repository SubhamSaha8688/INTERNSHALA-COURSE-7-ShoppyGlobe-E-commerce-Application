import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../features/cart/cartSlice";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ productId: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => handleQuantityChange(item.quantity - 1)} className="quantity-btn">
          -
        </button>
        <span className="quantity">{item.quantity}</span>
        <button onClick={() => handleQuantityChange(item.quantity + 1)} className="quantity-btn">
          +
        </button>
      </div>
      <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
      <button className="remove-btn" onClick={handleRemoveFromCart}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;