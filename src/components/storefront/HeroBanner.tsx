import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveTab } = useStore();

  return (
    <section className="hero-banner-section">
      <div className="hero-banner-card">
        <img 
          src="/images/hero.jpg" 
          alt="Woman planning in cozy morning sunlight" 
          className="hero-banner-img"
        />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content">
          <h1 className="hero-headline">
            Dream<br />
            Plan<br />
            Achieve
          </h1>
          <p className="hero-subtext">
            Premium digital products to help you create the life you love.
          </p>
          <button 
            className="hero-shop-btn"
            onClick={() => setActiveTab('planners')}
          >
            Shop Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
