import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/cart', {
        headers: getAuthHeaders()
      });
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, size, color, quantity = 1) => {
    try {
      const res = await axios.post('/api/cart/add', 
        { productId, size, color, quantity },
        { headers: getAuthHeaders() }
      );
      setCart(res.data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await axios.put(`/api/cart/update/${itemId}`,
        { quantity },
        { headers: getAuthHeaders() }
      );
      setCart(res.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${itemId}`, {
        headers: getAuthHeaders()
      });
      setCart(res.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete('/api/cart/clear', {
        headers: getAuthHeaders()
      });
      setCart(res.data);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};