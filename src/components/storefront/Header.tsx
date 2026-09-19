import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, ShoppingBag, Sparkles, User } from 'lucide-react';
import { CurrencySelector } from './CurrencySelector';

export const Header: React.FC = () => {
  const { cart, activeTab, setActiveTab, setIsCartOpen, setIsSearchOpen, customer, setIsAuthModalOpen } = useStore();
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
        <span className="store-logo-subtitle">Smart Products for Everyday Life</span>
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
          Shop All
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
          onClick={() => {
            if (!customer) {
              setIsAuthModalOpen(true);
            } else {
              setActiveTab('profile');
            }
          }}
        >
          {customer ? `Hi, ${customer.firstName}` : 'Account'}
        </button>
      </nav>

      <div className="header-action-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CurrencySelector compact />

        <button 
          className="icon-btn-pill" 
          title="Search products"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search size={17} />
        </button>

        <button 
          className="icon-btn-pill" 
          title={customer ? `Account: ${customer.firstName}` : 'Sign In / Account'}
          onClick={() => {
            if (!customer) {
              setIsAuthModalOpen(true);
            } else {
              setActiveTab('profile');
            }
          }}
        >
          <User size={17} />
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
          <ShoppingBag size={17} />
          {totalCartCount > 0 && (
            <span className="cart-badge-count">{totalCartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};

