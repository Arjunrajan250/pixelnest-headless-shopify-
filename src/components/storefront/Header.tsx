import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, ShoppingBag, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { cart, activeTab, setActiveTab, setIsCartOpen, setIsSearchOpen } = useStore();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="storefront-header">
      <div 
        className="store-logo-wrapper"
        style={{ cursor: 'pointer' }}
        onClick={() => setActiveTab('home')}
      >
        <span className="store-logo-title">
          <Sparkles size={18} style={{ color: '#4A5B4F' }} />
          PixelNest
        </span>
        <span className="store-logo-subtitle">Digital products for a better you</span>
      </div>

      <div className="header-action-group">
        <button 
          className="icon-btn-pill" 
          title="Search products"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search size={18} />
        </button>

        <button 
          className="icon-btn-pill" 
          title="Shopping Cart"
          onClick={() => {
            if (activeTab !== 'cart') {
              setIsCartOpen(true);
            }
          }}
        >
          <ShoppingBag size={18} />
          {totalCartCount > 0 && (
            <span className="cart-badge-count">{totalCartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};
