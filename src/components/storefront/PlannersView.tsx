import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';

export const PlannersView: React.FC = () => {
  const { products, setActiveTab, setIsSearchOpen } = useStore();
  const [filterSubCat, setFilterSubCat] = useState<'All' | 'Mice' | 'Keyboards' | 'Monitors' | 'Chargers' | 'Lighting' | 'Hooks'>('All');

  const filteredHardware = products.filter(p => {
    if (filterSubCat === 'All') return true;
    return p.subCategory === filterSubCat;
  });

  return (
    <div className="collection-view-wrapper">
      <div className="storefront-header">
        <button 
          className="icon-btn-pill" 
          onClick={() => setActiveTab('home')}
          title="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700 }}>
          Hardware & Gear
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="icon-btn-pill" 
            onClick={() => setIsSearchOpen(true)}
            title="Search"
          >
            <Search size={18} />
          </button>
          <button 
            className="icon-btn-pill" 
            title="Filter options"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="collection-header-box">
        <h2 className="collection-title">Engineered for performance and comfort.</h2>
        <p className="collection-desc">Premium peripherals, monitors, fast chargers, and lifestyle desk gear.</p>
      </div>

      <div className="filter-pills-row">
        {(['All', 'Mice', 'Keyboards', 'Monitors', 'Chargers', 'Lighting', 'Hooks'] as const).map(cat => (
          <button
            key={cat}
            className={`filter-pill ${filterSubCat === cat ? 'active' : ''}`}
            onClick={() => setFilterSubCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid-container">
        {filteredHardware.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
