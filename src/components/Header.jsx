import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaGlobeAmericas } from "react-icons/fa";
import { selectCartItemCount } from "../features/cart/cartSlice";
import "./Header.css";

const Header = () => {
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <FaGlobeAmericas className="logo-icon" />
          <span>ShoppyGlobe</span>
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </nav>
      <div className="cart-icon">
        <Link to="/cart">
          <FaShoppingCart />
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;