import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Settings, 
  ShoppingBag, 
  DownloadCloud, 
  ShieldCheck,
  Heart, 
  MapPin, 
  HelpCircle, 
  Sliders, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { setActiveTab, setAppMode, wishlist } = useStore();

  return (
    <div className="profile-screen">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button 
          className="icon-btn-pill"
          title="Merchant Admin Panel"
          onClick={() => setAppMode('admin')}
        >
          <Settings size={18} />
        </button>
      </div>

      <div className="profile-avatar-row">
        <img 
          src="/images/avatar.jpg" 
          alt="Aesthetic Girl" 
          className="profile-avatar-img"
        />
        <div>
          <h2 className="profile-user-name">Aesthetic Girl</h2>
          <p className="profile-user-email">aestheticgirl@gmail.com</p>
        </div>
      </div>

      <div className="profile-menu-list">
        <div 
          className="profile-menu-item"
          onClick={() => setActiveTab('orders')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingBag size={16} style={{ color: '#4A5B4F' }} />
            <span>My Orders</span>
          </div>
          <ChevronRight size={16} style={{ color: '#A39D95' }} />
        </div>

        <div 
          className="profile-menu-item"
          onClick={() => setActiveTab('orders')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={16} style={{ color: '#4A5B4F' }} />
            <span>Warranty Slips & Invoices</span>
          </div>
          <ChevronRight size={16} style={{ color: '#A39D95' }} />
        </div>

        <div 
          className="profile-menu-item"
          onClick={() => setActiveTab('planners')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Heart size={16} style={{ color: '#4A5B4F' }} />
            <span>Wishlist ({wishlist.length})</span>
          </div>
          <ChevronRight size={16} style={{ color: '#A39D95' }} />
        </div>

        <div className="profile-menu-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={16} style={{ color: '#4A5B4F' }} />
            <span>Addresses</span>
          </div>
          <ChevronRight size={16} style={{ color: '#A39D95' }} />
        </div>

        <div className="profile-menu-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <HelpCircle size={16} style={{ color: '#4A5B4F' }} />
            <span>Help & Support</span>
          </div>
          <ChevronRight size={16} style={{ color: '#A39D95' }} />
        </div>

        <div 
          className="profile-menu-item"
          onClick={() => setAppMode('admin')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sliders size={16} style={{ color: '#4A5B4F' }} />
            <span>Shopify Admin Panel</span>
          </div>
          <ChevronRight size={16} style={{ color: '#A39D95' }} />
        </div>
      </div>

      <div className="profile-quote-card">
        <img 
          src="/images/quote_banner.jpg" 
          alt="Desk with coffee and dried flowers" 
          className="profile-quote-img"
        />
        <div className="profile-quote-overlay">
          <div className="profile-quote-text">
            Good things take time. ♡
          </div>
        </div>
      </div>
    </div>
  );
};
