import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <div className="product-image">
          <img 
            src={product.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'} 
            alt={product.name}
          />
          {product.isFeatured && <span className="featured-badge">Featured</span>}
        </div>
        
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="brand">{product.brand}</p>
          <div className="product-footer">
            <span className="price">${product.price.toFixed(2)}</span>
            <div className="rating">
              ★ {product.rating.toFixed(1)} ({product.numReviews})
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;