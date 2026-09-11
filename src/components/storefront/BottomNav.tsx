import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Search, Package, User } from 'lucide-react';
import { StorefrontTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsSearchOpen } = useStore();

  const handleNav = (tab: StorefrontTab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="bottom-nav-bar">
      <button 
        className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleNav('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        className="bottom-nav-item"
        onClick={() => setIsSearchOpen(true)}
      >
        <Search size={20} />
        <span>Search</span>
      </button>

      <button 
        className={`bottom-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
        onClick={() => handleNav('orders')}
      >
        <Package size={20} />
        <span>Orders</span>
      </button>

      <button 
        className={`bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleNav('profile')}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
};
