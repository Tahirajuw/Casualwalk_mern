import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <img 
                  src={item.product?.images?.[0] || 'https://via.placeholder.com/100'} 
                  alt={item.product?.name}
                />
                
                <div className="item-details">
                  <h3>{item.product?.name}</h3>
                  <p className="item-meta">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="item-price">${item.product?.price.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <div className="item-total">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="remove-btn"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{getCartTotal() > 100 ? 'FREE' : '$10.00'}</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>
                ${(getCartTotal() + (getCartTotal() > 100 ? 0 : 10) + getCartTotal() * 0.1).toFixed(2)}
              </span>
            </div>

            <button 
              onClick={() => navigate('/checkout')} 
              className="btn btn-primary btn-lg"
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => navigate('/products')} 
              className="btn btn-secondary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;