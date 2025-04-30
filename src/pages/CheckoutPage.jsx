import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../features/cart/cartSlice";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    alert("Order placed successfully!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <h2>Payment Information</h2>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-info">
                  <span className="order-item-name">{item.title}</span>
                  <span className="order-item-quantity">x{item.quantity}</span>
                </div>
                <span className="order-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;