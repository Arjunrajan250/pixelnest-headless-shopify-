import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, ShoppingBag, Sparkles, Sliders } from 'lucide-react';

export const Header: React.FC = () => {
  const { cart, activeTab, setActiveTab, setIsCartOpen, setIsSearchOpen, setAppMode } = useStore();
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

      <nav className="desktop-header-nav">
        <button 
          className={`desktop-nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`desktop-nav-link ${activeTab === 'planners' ? 'active' : ''}`}
          onClick={() => setActiveTab('planners')}
        >
          Planners
        </button>
        <button 
          className={`desktop-nav-link ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button 
          className={`desktop-nav-link ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`desktop-nav-link ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </nav>

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

        <button 
          className="icon-btn-pill" 
          title="Merchant Admin Panel"
          onClick={() => setAppMode('admin')}
        >
          <Sliders size={17} />
        </button>
      </div>
    </header>
  );
};
