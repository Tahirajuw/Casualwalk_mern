import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
      setMainImage(res.data.images[0]);
      if (res.data.sizes.length > 0) {
        setSelectedSize(res.data.sizes[0].size);
      }
      if (res.data.colors.length > 0) {
        setSelectedColor(res.data.colors[0]);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load product' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedSize || !selectedColor) {
      setMessage({ type: 'error', text: 'Please select size and color' });
      return;
    }

    const result = await addToCart(product._id, selectedSize, selectedColor, quantity);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Added to cart successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="container"><p>Product not found</p></div>;
  }

  return (
    <div className="product-detail">
      <div className="container">
        {message.text && (
          <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
            {message.text}
          </div>
        )}

        <div className="product-detail-content">
          <div className="product-images">
            <div className="main-image">
              <img src={mainImage || 'https://via.placeholder.com/500'} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={mainImage === img ? 'active' : ''}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="product-info-detail">
            <h1>{product.name}</h1>
            <p className="brand">{product.brand}</p>
            <div className="rating">
              ★ {product.rating.toFixed(1)} ({product.numReviews} reviews)
            </div>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>

            <div className="product-options">
              <div className="option-group">
                <label>Size:</label>
                <div className="size-options">
                  {product.sizes.map((sizeObj) => (
                    <button
                      key={sizeObj.size}
                      className={`size-btn ${selectedSize === sizeObj.size ? 'active' : ''} ${sizeObj.stock === 0 ? 'disabled' : ''}`}
                      onClick={() => setSelectedSize(sizeObj.size)}
                      disabled={sizeObj.stock === 0}
                    >
                      {sizeObj.size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label>Color:</label>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    >
                      {selectedColor === color && '✓'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
              Add to Cart
            </button>

            <div className="product-meta">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>SKU:</strong> {product._id.slice(-8).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;