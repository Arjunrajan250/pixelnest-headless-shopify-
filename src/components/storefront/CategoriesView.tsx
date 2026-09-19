import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES_META } from '../../data/initialData';
import { ArrowLeft, Search, ChevronRight, ShieldCheck } from 'lucide-react';
import { ProductCategory } from '../../types';

export const CategoriesView: React.FC<{
  onSelectCategory?: (category: ProductCategory) => void;
}> = ({ onSelectCategory }) => {
  const { setActiveTab, setIsSearchOpen } = useStore();

  const handleCategoryClick = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName as ProductCategory);
    } else {
      setActiveTab('planners');
    }
  };

  return (
    <div className="categories-view-wrapper">
      <div className="storefront-header">
        <button 
          className="icon-btn-pill"
          onClick={() => setActiveTab('home')}
          title="Back to Home"
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700 }}>
          Categories
        </span>
        <button 
          className="icon-btn-pill"
          onClick={() => setIsSearchOpen(true)}
          title="Search"
        >
          <Search size={18} />
        </button>
      </div>

      <div className="categories-hero">
        <h2 className="categories-hero-title">Explore by Category</h2>
        <p className="categories-hero-sub">Find exactly what you need, all in one place.</p>
      </div>

      <div className="category-list-grid">
        {CATEGORIES_META.map(cat => (
          <div 
            key={cat.name} 
            className="category-large-card"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div>
              <div className="category-info-name">{cat.name}</div>
              <div className="category-info-count">({cat.count})</div>
            </div>
            <ChevronRight size={16} style={{ color: '#A39D95' }} />
          </div>
        ))}
      </div>

      <div className="instant-download-banner" style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--bg-surface-soft)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
        <div className="instant-download-icon" style={{ background: '#EBF0EC', color: 'var(--color-primary)', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldCheck size={18} />
        </div>
        <div>
          <div className="instant-download-title" style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>Tracked Global Delivery</div>
          <div className="instant-download-desc" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>All categories ship with protective packaging and verified tracking numbers.</div>
        </div>
      </div>
    </div>
  );
};
