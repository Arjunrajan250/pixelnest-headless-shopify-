import React from 'react';
import { useStore } from '../../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { CategoryChips } from './CategoryChips';
import { ProductCard } from './ProductCard';
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, setActiveTab } = useStore();

  const trendingProducts = products.filter(p => p.isTrending || p.status === 'active').slice(0, 4);

  return (
    <div className="home-view-wrapper">
      <HeroBanner />
      
      <CategoryChips />

      <div className="section-header-row">
        <h2 className="section-title">Curated Essentials & Best Sellers</h2>
        <button 
          type="button"
          className="section-link"
          onClick={() => setActiveTab('planners')}
        >
          See all ({products.length}) <ArrowRight size={14} />
        </button>
      </div>

      <div className="product-grid-container">
        {trendingProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="instant-download-banner" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--bg-surface-soft)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '16px 20px', margin: '24px 0' }}>
        <div className="instant-download-icon" style={{ background: '#EBF0EC', color: 'var(--color-primary)', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Truck size={20} />
        </div>
        <div>
          <div className="instant-download-title" style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>
            Tracked International Shipping & 30-Day Guarantee
          </div>
          <div className="instant-download-desc" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Insured global parcel delivery with live tracking, 256-bit SSL checkout, and official manufacturer warranty.
          </div>
        </div>
      </div>

      <div className="section-header-row" style={{ marginTop: '12px' }}>
        <h2 className="section-title">
          <Sparkles size={16} style={{ display: 'inline', marginRight: '6px', color: '#4A5B4F' }} />
          Workstation & Home Lifestyle
        </h2>
        <button 
          type="button"
          className="section-link"
          onClick={() => setActiveTab('categories')}
        >
          Explore Categories <ArrowRight size={14} />
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

