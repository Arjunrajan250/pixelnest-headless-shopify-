import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveTab } = useStore();

  return (
    <section className="hero-banner-section">
      <div className="hero-banner-card">
        <img 
          src="/images/hardware_hero.jpg" 
          alt="Modern minimalist aesthetic desk setup with monitor and peripherals" 
          className="hero-banner-img"
        />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content">
          <h1 className="hero-headline">
            Precision<br />
            Power<br />
            Aesthetic
          </h1>
          <p className="hero-subtext">
            High-performance peripherals, desk gear, and home essentials.
          </p>
          <button 
            className="hero-shop-btn"
            onClick={() => setActiveTab('planners')}
          >
            Explore Gear <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
