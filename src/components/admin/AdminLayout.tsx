import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Settings, 
  Store, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AdminTab } from '../../types';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminTab, setAdminTab, setAppMode, shopifyConfig } = useStore();

  const tabs = [
    { id: 'overview' as AdminTab, label: 'Dashboard', icon: BarChart3 },
    { id: 'products' as AdminTab, label: 'Products', icon: Package },
    { id: 'orders' as AdminTab, label: 'Orders & Tracking', icon: ShoppingBag },
    { id: 'shopify-settings' as AdminTab, label: 'Shopify Settings', icon: Settings }
  ];

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-title">
          <Sparkles size={22} style={{ color: '#82A189' }} />
          <span>PixelNest Admin</span>
          <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '12px', fontWeight: 500 }}>
            {shopifyConfig.liveMode ? '🟢 Shopify Live' : '⚪ Headless Demo Store'}
          </span>
        </div>

        <nav className="admin-nav-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`admin-nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setAdminTab(tab.id)}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <button 
          className="mode-toggle-btn active"
          onClick={() => setAppMode('storefront')}
          title="Return to customer store"
        >
          <Store size={14} />
          <span>View Storefront</span>
        </button>
      </header>

      <main className="admin-body">
        {children}
      </main>
    </div>
  );
};
