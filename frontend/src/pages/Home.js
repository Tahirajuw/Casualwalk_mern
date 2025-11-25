import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await axios.get('/api/products/featured');
      setFeaturedProducts(res.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Step Into Style</h1>
            <p>Discover the perfect pair for every occasion</p>
            <a href="/products" className="btn btn-primary btn-lg">Shop Now</a>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Shop By Category</h2>
          <div className="category-grid">
            <a href="/products?category=Running" className="category-card">
              <div className="category-icon">🏃</div>
              <h3>Running</h3>
            </a>
            <a href="/products?category=Casual" className="category-card">
              <div className="category-icon">👟</div>
              <h3>Casual</h3>
            </a>
            <a href="/products?category=Sports" className="category-card">
              <div className="category-icon">⚽</div>
              <h3>Sports</h3>
            </a>
            <a href="/products?category=Formal" className="category-card">
              <div className="category-icon">👞</div>
              <h3>Formal</h3>
            </a>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $100</p>
            </div>
            <div className="feature">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Always here to help</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;