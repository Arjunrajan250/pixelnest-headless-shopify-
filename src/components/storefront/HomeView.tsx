import React from 'react';
import { useStore } from '../../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { CategoryChips } from './CategoryChips';
import { ProductCard } from './ProductCard';
import { ArrowRight, DownloadCloud, Sparkles } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, setActiveTab } = useStore();

  const trendingProducts = products.filter(p => p.isTrending || p.status === 'active').slice(0, 4);

  return (
    <div className="home-view-wrapper">
      <HeroBanner />
      
      <CategoryChips />

      <div className="section-header-row">
        <h2 className="section-title">Trending Now</h2>
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
          <DownloadCloud size={18} />
        </div>
        <div>
          <div className="instant-download-title">Instant Download</div>
          <div className="instant-download-desc">Get your digital product and licenses right after purchase.</div>
        </div>
      </div>

      <div className="section-header-row" style={{ marginTop: '12px' }}>
        <h2 className="section-title">
          <Sparkles size={16} style={{ display: 'inline', marginRight: '6px', color: '#4A5B4F' }} />
          Best for Productivity
        </h2>
        <button 
          className="section-link"
          onClick={() => setActiveTab('categories')}
        >
          Explore <ArrowRight size={14} />
        </button>
      </div>

      <div className="product-grid-container">
        {products.slice(2, 6).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
