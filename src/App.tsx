import React from 'react';
import { useStore, StoreProvider } from './context/StoreContext';
import { Header } from './components/storefront/Header';
import { HomeView } from './components/storefront/HomeView';
import { CategoriesView } from './components/storefront/CategoriesView';
import { PlannersView } from './components/storefront/PlannersView';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutView } from './components/storefront/CheckoutView';
import { OrdersView } from './components/storefront/OrdersView';
import { ProfileView } from './components/storefront/ProfileView';
import { BottomNav } from './components/storefront/BottomNav';
import { SearchModal } from './components/storefront/SearchModal';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminShopifySettings } from './components/admin/AdminShopifySettings';

import { 
  Smartphone, 
  Monitor, 
  Store, 
  Sliders, 
  Wifi, 
  Battery, 
  Signal, 
  Sparkles,
  X
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    appMode, 
    setAppMode, 
    deviceView, 
    setDeviceView, 
    activeTab, 
    adminTab,
    isCartOpen,
    setIsCartOpen,
    selectedProduct
  } = useStore();

  const renderStorefrontContent = () => {
    // If a product is selected and we are on product-detail tab
    if (activeTab === 'product-detail' && selectedProduct) {
      return <ProductDetailModal />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'categories':
        return <CategoriesView />;
      case 'planners':
        return <PlannersView />;
      case 'cart':
        return <CartDrawer />;
      case 'checkout':
        return <CheckoutView />;
      case 'orders':
        return <OrdersView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  const renderAdminContent = () => {
    switch (adminTab) {
      case 'overview':
        return <AdminOverview />;
      case 'products':
        return <AdminProducts />;
      case 'orders':
        return <AdminOrders />;
      case 'shopify-settings':
        return <AdminShopifySettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Universal Mode & Device Switcher Bar */}
      <nav className="universal-top-bar">
        <div className="top-bar-brand">
          <Sparkles size={16} color="#C4B49F" />
          <span><strong>PixelNest</strong> • Headless Shopify</span>
          <span className="top-bar-badge">v1.0 Live</span>
        </div>

        <div className="top-bar-controls">
          {/* Viewport Frame Switcher */}
          {appMode === 'storefront' && (
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.08)', padding: '2px', borderRadius: '6px', marginRight: '10px' }}>
              <button
                className={`device-toggle-btn ${deviceView === 'mobile-mockup' ? 'active' : ''}`}
                onClick={() => setDeviceView('mobile-mockup')}
                title="Mobile Prototype View (Matches Mockup)"
              >
                <Smartphone size={14} />
                <span style={{ fontSize: '11px' }}>Mobile View</span>
              </button>
              <button
                className={`device-toggle-btn ${deviceView === 'responsive' ? 'active' : ''}`}
                onClick={() => setDeviceView('responsive')}
                title="Full Responsive Desktop Store"
              >
                <Monitor size={14} />
                <span style={{ fontSize: '11px' }}>Responsive</span>
              </button>
            </div>
          )}

          {/* Mode Switcher: Storefront vs Admin */}
          <button
            className={`mode-toggle-btn ${appMode === 'storefront' ? 'active' : ''}`}
            onClick={() => setAppMode('storefront')}
          >
            <Store size={14} />
            <span>Storefront</span>
          </button>

          <button
            className={`mode-toggle-btn ${appMode === 'admin' ? 'active' : ''}`}
            onClick={() => setAppMode('admin')}
          >
            <Sliders size={14} />
            <span>Admin Panel</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      {appMode === 'admin' ? (
        <AdminLayout>
          {renderAdminContent()}
        </AdminLayout>
      ) : deviceView === 'mobile-mockup' ? (
        /* Mobile Prototype Frame (Exact match for reference image screens) */
        <div className="preview-wrapper-mockup">
          <div className="phone-chassis">
            {/* Phone Status Bar (9:41, Cellular, Wifi, Battery) */}
            <div className="phone-status-bar">
              <span>9:41</span>
              <div className="status-bar-icons">
                <Signal size={13} />
                <Wifi size={13} />
                <Battery size={15} />
              </div>
            </div>

            {/* Header (unless in sub-pages that have custom headers) */}
            {activeTab === 'home' && <Header />}

            {/* Scrollable Screen Content */}
            <div className="phone-screen-content">
              {renderStorefrontContent()}
            </div>

            {/* Bottom Nav Bar */}
            {activeTab !== 'checkout' && activeTab !== 'product-detail' && (
              <BottomNav />
            )}
          </div>
        </div>
      ) : (
        /* Responsive Desktop & Tablet Storefront */
        <div className="responsive-store-wrapper">
          <Header />
          <main style={{ flex: 1 }}>
            {renderStorefrontContent()}
          </main>
          <BottomNav />
        </div>
      )}

      {/* Slide-over Cart Modal (when opened via header cart button on responsive view) */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div 
            className="modal-card" 
            style={{ maxWidth: '440px', padding: 0, height: '85vh', display: 'flex', flexDirection: 'column' }} 
            onClick={e => e.stopPropagation()}
          >
            <CartDrawer isModal onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
