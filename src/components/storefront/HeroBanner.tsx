import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveTab } = useStore();

  return (
    <section className="hero-banner-section">
      <div className="hero-banner-card">
        <img 
          src="/images/hardware_hero.jpg" 
          alt="Curated ergonomic workspace gear and smart everyday lifestyle products" 
          className="hero-banner-img"
        />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', color: '#FAF7F2', fontSize: '11px', fontWeight: 600, marginBottom: '12px', width: 'fit-content' }}>
            <Sparkles size={12} style={{ color: '#82A189' }} />
            <span>Curated International Collection</span>
          </div>

          <h1 className="hero-headline" style={{ fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, marginBottom: '12px' }}>
            Smart Products<br />
            for Everyday Life
          </h1>
          <p className="hero-subtext" style={{ maxWidth: '440px', lineHeight: 1.5, marginBottom: '20px' }}>
            Curated tech essentials, ergonomic peripherals, fast charging, and modern tools crafted for seamless daily productivity.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              type="button"
              className="hero-shop-btn"
              onClick={() => setActiveTab('planners')}
            >
              Shop All Products <ArrowRight size={14} />
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('categories')}
              style={{
                background: 'rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(8px)',
                color: '#FAF7F2',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 'var(--radius-full)',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

