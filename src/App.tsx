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
import { Footer } from './components/storefront/Footer';
import { CustomerAuthModal } from './components/storefront/CustomerAuthModal';
import { TrustPolicyModal } from './components/storefront/TrustPolicyModal';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminShopifySettings } from './components/admin/AdminShopifySettings';

const MainAppContent: React.FC = () => {
  const { 
    appMode, 
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
      {appMode === 'admin' ? (
        <AdminLayout>
          {renderAdminContent()}
        </AdminLayout>
      ) : (
        <div className="responsive-store-wrapper">
          {activeTab === 'home' && <Header />}
          <main className="store-main-content">
            {renderStorefrontContent()}
          </main>
          {activeTab !== 'checkout' && activeTab !== 'product-detail' && (
            <>
              <Footer />
              <BottomNav />
            </>
          )}
        </div>
      )}

      {/* Slide-over Cart Modal (when opened via header cart button) */}
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

      {/* Global Search Modal */}
      <SearchModal />

      {/* Customer Account & Authentication Modal */}
      <CustomerAuthModal />

      {/* Global Trust & Policy Modal (About, Shipping, Returns, Privacy, Terms, FAQ, Order Tracking) */}
      <TrustPolicyModal />
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
