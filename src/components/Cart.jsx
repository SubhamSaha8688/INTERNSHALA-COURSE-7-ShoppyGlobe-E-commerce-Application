import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { selectCartItems, selectCartTotal } from "../features/cart/cartSlice";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="cart-actions">
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;