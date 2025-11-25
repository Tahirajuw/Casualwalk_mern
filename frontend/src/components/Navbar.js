import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            ShoesHub
          </Link>
          
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            
            {user ? (
              <>
                <Link to="/orders">Orders</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/cart" className="cart-link">
                  Cart {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
                </Link>
                <button onClick={logout} className="btn btn-secondary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;