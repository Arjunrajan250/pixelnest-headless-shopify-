import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES_META } from '../../data/initialData';
import { ArrowLeft, Search, ChevronRight, DownloadCloud } from 'lucide-react';
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

      <div className="instant-download-banner" style={{ marginTop: '20px' }}>
        <div className="instant-download-icon">
          <DownloadCloud size={18} />
        </div>
        <div>
          <div className="instant-download-title">Instant Download</div>
          <div className="instant-download-desc">Get your product right after purchase.</div>
        </div>
      </div>
    </div>
  );
};
