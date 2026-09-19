import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Settings, 
  Store, 
  Sparkles,
  LogOut
} from 'lucide-react';
import { AdminTab } from '../../types';
import { AdminAuthGate } from './AdminAuthGate';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminTab, setAdminTab, setAppMode, shopifyConfig, logoutAdmin } = useStore();

  const tabs: Array<{ id: AdminTab; label: string; shortLabel: string; icon: React.ComponentType<{ size: number }> }> = [
    { id: 'overview', label: 'Dashboard', shortLabel: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', shortLabel: 'Products', icon: Package },
    { id: 'orders', label: 'Orders & Tracking', shortLabel: 'Orders', icon: ShoppingBag },
    { id: 'shopify-settings', label: 'Shopify Settings', shortLabel: 'Settings', icon: Settings }
  ];

  return (
    <AdminAuthGate>
      <div className="admin-shell">
        <header className="admin-header">
          <div className="admin-header-top-row">
            <div className="admin-header-title">
              <Sparkles size={20} style={{ color: '#82A189', flexShrink: 0 }} />
              <span className="admin-brand-name">PixelNest Admin</span>
              <span className="admin-live-badge">
                <span className={`admin-badge-dot ${shopifyConfig.liveMode ? 'live' : 'demo'}`} />
                <span className="admin-badge-text">
                  {shopifyConfig.liveMode ? 'Shopify Live' : 'Demo Store'}
                </span>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                className="admin-view-storefront-btn"
                onClick={() => setAppMode('storefront')}
                title="Return to customer store"
              >
                <Store size={14} />
                <span className="storefront-btn-text">View Store</span>
              </button>

              <button
                type="button"
                className="admin-view-storefront-btn"
                onClick={logoutAdmin}
                title="Lock admin session"
                style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                <LogOut size={13} />
                <span className="storefront-btn-text">Lock</span>
              </button>
            </div>
          </div>

          <nav className="admin-nav-tabs" aria-label="Admin navigation">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`admin-nav-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setAdminTab(tab.id)}
                >
                  <Icon size={14} />
                  <span className="tab-label-full">{tab.label}</span>
                  <span className="tab-label-short">{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </header>

        <main className="admin-body">
          {children}
        </main>
      </div>
    </AdminAuthGate>
  );
};

