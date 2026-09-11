import React from 'react';
import { useStore } from '../../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { CategoryChips } from './CategoryChips';
import { ProductCard } from './ProductCard';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, setActiveTab } = useStore();

  const trendingProducts = products.filter(p => p.isTrending || p.status === 'active').slice(0, 4);

  return (
    <div className="home-view-wrapper">
      <HeroBanner />
      
      <CategoryChips />

      <div className="section-header-row">
        <h2 className="section-title">Top Rated Hardware</h2>
        <button 
          className="section-link"
          onClick={() => setActiveTab('planners')}
        >
          See all <ArrowRight size={14} />
        </button>
      </div>

      <div className="product-grid-container">
        {trendingProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="instant-download-banner">
        <div className="instant-download-icon">
          <ShieldCheck size={20} />
        </div>
        <div>
          <div className="instant-download-title">Free Express Shipping & 1-Year Warranty</div>
          <div className="instant-download-desc">Official brand warranty on all hardware with doorstep delivery.</div>
        </div>
      </div>

      <div className="section-header-row" style={{ marginTop: '12px' }}>
        <h2 className="section-title">
          <Sparkles size={16} style={{ display: 'inline', marginRight: '6px', color: '#4A5B4F' }} />
          Desk Setup & Lifestyle Gear
        </h2>
        <button 
          className="section-link"
          onClick={() => setActiveTab('categories')}
        >
          Explore <ArrowRight size={14} />
        </button>
      </div>

      <div className="product-grid-container">
        {products.slice(4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
