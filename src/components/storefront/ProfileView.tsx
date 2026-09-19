import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  ArrowLeft, 
  Truck, 
  Plus, 
  Trash2, 
  LogOut, 
  CheckCircle2, 
  User, 
  Mail, 
  Package,
  Headphones
} from 'lucide-react';
import { Order } from '../../types';
import { formatPrice } from '../../utils/currency';

export const ProfileView: React.FC = () => {
  const { 
    customer, 
    orders, 
    products, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    setActiveTab, 
    logoutCustomer, 
    saveAddress, 
    deleteAddress, 
    setDefaultAddress, 
    setIsAuthModalOpen,
    currency,
    triggerDownload
  } = useStore();

  const [activeSection, setActiveSection] = useState<'overview' | 'orders' | 'addresses' | 'wishlist' | 'support'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  // New address form state
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    name: customer ? `${customer.firstName} ${customer.lastName}` : '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.postalCode) {
      showToast('Please fill in required address fields.');
      return;
    }
    saveAddress({
      type: newAddr.type,
      isDefault: customer?.addresses.length === 0,
      name: newAddr.name || `${customer?.firstName} ${customer?.lastName}`,
      phone: newAddr.phone || '+1 (555) 019-2834',
      street: newAddr.street,
      city: newAddr.city,
      state: newAddr.state,
      postalCode: newAddr.postalCode,
      country: newAddr.country
    });
    setIsAddAddressOpen(false);
    setNewAddr({
      type: 'Home',
      name: customer ? `${customer.firstName} ${customer.lastName}` : '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States'
    });
    showToast('Shipping address saved successfully!');
  };

  // Filter orders matching authenticated customer
  const customerOrders = customer 
    ? orders.filter(o => o.customerEmail.toLowerCase() === customer.email.toLowerCase())
    : [];

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  // If customer is NOT logged in, show the clean logged-out view
  if (!customer) {
    return (
      <div className="profile-screen-luxe" style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>
        <header className="profile-top-bar" style={{ marginBottom: '28px' }}>
          <button 
            type="button"
            className="profile-back-btn"
            onClick={() => setActiveTab('home')}
          >
            <ArrowLeft size={16} />
            <span>Back to Store</span>
          </button>
          <div className="profile-top-breadcrumbs">
            <span className="crumb-dim">Account</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Customer Portal</span>
          </div>
        </header>

        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '48px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--bg-surface-soft)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            color: 'var(--color-primary)'
          }}>
            <User size={30} />
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', margin: '0 0 10px 0' }}>
            Welcome to PixelNest
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
            Sign in to view your order history, manage saved international shipping addresses, track active dispatches, and access warranty documentation.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              type="button"
              className="primary-pill-btn"
              onClick={() => setIsAuthModalOpen(true)}
              style={{ padding: '12px 28px' }}
            >
              Sign In / Register
            </button>
            <button 
              type="button"
              className="btn-admin-secondary"
              onClick={() => setActiveTab('planners')}
              style={{ padding: '12px 24px' }}
            >
              Explore Products
            </button>
          </div>

          {/* Value Perks */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '40px',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '28px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <Truck size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '12px', color: 'var(--text-main)' }}>Tracked Global Delivery</strong>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Courier updates on every shipment</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '12px', color: 'var(--text-main)' }}>Warranty Protection</strong>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Official manufacturer support</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <Sparkles size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '12px', color: 'var(--text-main)' }}>Faster Checkout</strong>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Saved addresses & payment methods</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Customer View
  return (
    <div className="profile-screen-luxe">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="profile-toast">
          <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="profile-top-bar">
        <div className="profile-top-left">
          <button 
            type="button"
            className="profile-back-btn"
            onClick={() => setActiveTab('home')}
            title="Return to store"
          >
            <ArrowLeft size={16} />
            <span>Storefront</span>
          </button>
          <div className="profile-top-breadcrumbs">
            <span className="crumb-dim">Account</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{customer.firstName} {customer.lastName}</span>
          </div>
        </div>

        <div className="profile-top-right">
          <button 
            type="button"
            className="profile-back-btn"
            onClick={logoutCustomer}
            title="Log out of account"
            style={{ color: '#991B1B' }}
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Left Profile Sidebar + Right Content Workspace */}
      <div className="profile-lounge-grid">
        
        {/* LEFT COLUMN: Profile Sidebar */}
        <aside className="profile-lounge-sidebar">
          <div className="profile-hero-card">
            <div className="profile-avatar-wrapper">
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700
              }}>
                {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
              </div>
              <span className="profile-status-online" title="Verified Customer" />
            </div>

            <div className="profile-hero-details">
              <h1 className="profile-hero-name">{customer.firstName} {customer.lastName}</h1>
              <p className="profile-hero-email">{customer.email}</p>
              <div className="profile-hero-badge-row">
                <span className="profile-meta-chip">
                  <ShieldCheck size={12} style={{ color: '#2F7A4C' }} />
                  Verified Account
                </span>
                <span className="profile-meta-chip">Active Member</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav className="profile-nav-menu">
            <button 
              type="button"
              className={`profile-nav-link ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              <div className="nav-link-left">
                <Sparkles size={16} className="nav-icon" />
                <span>Account Overview</span>
              </div>
              <ChevronRight size={14} className="nav-arrow" />
            </button>

            <button 
              type="button"
              className={`profile-nav-link ${activeSection === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveSection('orders')}
            >
              <div className="nav-link-left">
                <ShoppingBag size={16} className="nav-icon" />
                <span>My Orders & Tracking</span>
              </div>
              <span className="nav-badge-count">{customerOrders.length}</span>
            </button>

            <button 
              type="button"
              className={`profile-nav-link ${activeSection === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveSection('addresses')}
            >
              <div className="nav-link-left">
                <MapPin size={16} className="nav-icon" />
                <span>Saved Addresses</span>
              </div>
              <span className="nav-badge-count">{customer.addresses.length}</span>
            </button>

            <button 
              type="button"
              className={`profile-nav-link ${activeSection === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveSection('wishlist')}
            >
              <div className="nav-link-left">
                <Heart size={16} className="nav-icon" />
                <span>Wishlist Items</span>
              </div>
              <span className="nav-badge-count">{wishlist.length}</span>
            </button>

            <button 
              type="button"
              className={`profile-nav-link ${activeSection === 'support' ? 'active' : ''}`}
              onClick={() => setActiveSection('support')}
            >
              <div className="nav-link-left">
                <Headphones size={16} className="nav-icon" />
                <span>Customer Support</span>
              </div>
              <ChevronRight size={14} className="nav-arrow" />
            </button>
          </nav>
        </aside>

        {/* RIGHT COLUMN: Active Section View */}
        <main className="profile-lounge-main">
          
          {/* SECTION 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="profile-panel-card">
              <h2 className="profile-panel-title">Account Overview</h2>
              <p className="profile-panel-subtitle">Welcome back, {customer.firstName}. Here is a summary of your account activity.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '20px 0' }}>
                <div style={{ background: 'var(--bg-surface-soft)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Total Orders Placed</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, margin: '6px 0', color: 'var(--text-main)' }}>{customerOrders.length}</div>
                  <button 
                    type="button" 
                    onClick={() => setActiveSection('orders')} 
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, padding: 0, cursor: 'pointer' }}
                  >
                    View order history →
                  </button>
                </div>

                <div style={{ background: 'var(--bg-surface-soft)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Default Address</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, margin: '6px 0', color: 'var(--text-main)' }}>
                    {customer.addresses.find(a => a.isDefault)?.city || (customer.addresses.length > 0 ? customer.addresses[0].city : 'None saved')}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setActiveSection('addresses')} 
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, padding: 0, cursor: 'pointer' }}
                  >
                    Manage addresses →
                  </button>
                </div>

                <div style={{ background: 'var(--bg-surface-soft)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Wishlist Products</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, margin: '6px 0', color: 'var(--text-main)' }}>{wishlist.length}</div>
                  <button 
                    type="button" 
                    onClick={() => setActiveSection('wishlist')} 
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, padding: 0, cursor: 'pointer' }}
                  >
                    View saved items →
                  </button>
                </div>
              </div>

              {/* Recent Orders Sneak Peek */}
              <div style={{ marginTop: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Recent Orders</h3>
                  {customerOrders.length > 0 && (
                    <button 
                      type="button" 
                      onClick={() => setActiveSection('orders')}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      See all ({customerOrders.length})
                    </button>
                  )}
                </div>

                {customerOrders.length === 0 ? (
                  <div style={{ padding: '32px 20px', textAlign: 'center', background: 'var(--bg-surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 14px 0' }}>
                      No orders have been placed under {customer.email} yet.
                    </p>
                    <button 
                      type="button" 
                      className="primary-pill-btn"
                      onClick={() => setActiveTab('planners')}
                      style={{ padding: '8px 18px', fontSize: '12px' }}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {customerOrders.slice(0, 2).map(order => (
                      <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13px' }}>Order #{order.orderNumber}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                            {order.deliveryDate} • {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 700, fontSize: '13px' }}>{formatPrice(order.total, order.currency || currency)}</div>
                          <span style={{ fontSize: '11px', color: '#2F7A4C', fontWeight: 600 }}>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 2: ORDERS & TRACKING */}
          {activeSection === 'orders' && (
            <div className="profile-panel-card">
              <h2 className="profile-panel-title">My Orders & Tracking</h2>
              <p className="profile-panel-subtitle">Live courier tracking and invoices for your purchases.</p>

              {customerOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                  <Package size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 12px auto' }} />
                  <h3 style={{ fontSize: '16px', margin: '0 0 6px 0' }}>No Orders Found</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    When you order hardware or accessories, live tracking details and warranty slips will appear here.
                  </p>
                  <button 
                    type="button" 
                    className="primary-pill-btn" 
                    onClick={() => setActiveTab('planners')}
                  >
                    Browse Everyday Products
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                  {customerOrders.map(order => (
                    <div 
                      key={order.id}
                      style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <span style={{ fontWeight: 700, fontSize: '14px' }}>Order #{order.orderNumber}</span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '12px',
                            background: order.status === 'Completed' ? '#E5F3EB' : '#FEF3C7',
                            color: order.status === 'Completed' ? '#266A42' : '#92400E'
                          }}>
                            {order.status}
                          </span>
                          <strong style={{ fontSize: '14px' }}>{formatPrice(order.total, order.currency || currency)}</strong>
                        </div>
                      </div>

                      {/* Items row */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                        {order.items.map((item, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={item.product.imageUrl} alt={item.product.title} style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }} />
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.product.title}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                  Qty: {item.quantity} • {item.product.warranty || '1-Year Limited Warranty'}
                                </div>
                              </div>
                            </div>
                            <button 
                              type="button" 
                              className="order-download-pill-btn"
                              onClick={() => triggerDownload(item.product)}
                              title="Download Warranty Record"
                            >
                              Warranty Slip
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Tracking footer */}
                      <div style={{ background: 'var(--bg-surface-soft)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Truck size={14} style={{ color: 'var(--color-primary)' }} />
                          <span>{order.deliveryDate}</span>
                        </div>
                        {order.trackingNumber && (
                          <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                            Tracking: <code>{order.trackingNumber}</code>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: SAVED ADDRESSES */}
          {activeSection === 'addresses' && (
            <div className="profile-panel-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 className="profile-panel-title">Saved Shipping Addresses</h2>
                  <p className="profile-panel-subtitle">Manage your primary international delivery addresses.</p>
                </div>
                <button 
                  type="button" 
                  className="btn-admin-primary" 
                  onClick={() => setIsAddAddressOpen(!isAddAddressOpen)}
                  style={{ fontSize: '12px', padding: '8px 14px' }}
                >
                  <Plus size={14} />
                  <span>{isAddAddressOpen ? 'Cancel' : 'Add Address'}</span>
                </button>
              </div>

              {/* Add Address Form */}
              {isAddAddressOpen && (
                <form onSubmit={handleSaveAddress} style={{ background: 'var(--bg-surface-soft)', padding: '18px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0' }}>Add International Delivery Address</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Recipient Name</label>
                      <input 
                        type="text" 
                        required 
                        value={newAddr.name}
                        onChange={e => setNewAddr({ ...newAddr, name: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+1 (555) 000-0000"
                        value={newAddr.phone}
                        onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Street Address</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. 742 Evergreen Terrace, Suite 4B"
                      value={newAddr.street}
                      onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>City</label>
                      <input 
                        type="text" 
                        required 
                        value={newAddr.city}
                        onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>State / Region</label>
                      <input 
                        type="text" 
                        value={newAddr.state}
                        onChange={e => setNewAddr({ ...newAddr, state: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Postal Code</label>
                      <input 
                        type="text" 
                        required 
                        value={newAddr.postalCode}
                        onChange={e => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="primary-pill-btn" style={{ fontSize: '12px', padding: '8px 16px' }}>
                    Save Address
                  </button>
                </form>
              )}

              {customer.addresses.length === 0 ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', background: 'var(--bg-surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
                    No shipping addresses saved yet.
                  </p>
                  <button 
                    type="button" 
                    className="primary-pill-btn" 
                    onClick={() => setIsAddAddressOpen(true)}
                    style={{ fontSize: '12px', padding: '8px 16px' }}
                  >
                    Add Delivery Address
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  {customer.addresses.map(addr => (
                    <div 
                      key={addr.id}
                      style={{
                        background: 'var(--bg-surface)',
                        border: `1px solid ${addr.isDefault ? 'var(--color-primary)' : 'var(--border-light)'}`,
                        borderRadius: 'var(--radius-sm)',
                        padding: '16px',
                        position: 'relative'
                      }}
                    >
                      {addr.isDefault && (
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'var(--color-primary)',
                          color: '#FFFFFF',
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: 600
                        }}>
                          Default
                        </span>
                      )}
                      <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>{addr.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.postalCode}<br />
                        {addr.country}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                        Phone: {addr.phone}
                      </div>

                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '10px' }}>
                        {!addr.isDefault && (
                          <button 
                            type="button" 
                            onClick={() => setDefaultAddress(addr.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '11px', fontWeight: 600, padding: 0, cursor: 'pointer' }}
                          >
                            Set as Default
                          </button>
                        )}
                        <button 
                          type="button" 
                          onClick={() => deleteAddress(addr.id)}
                          style={{ background: 'none', border: 'none', color: '#991B1B', fontSize: '11px', padding: 0, cursor: 'pointer', marginLeft: 'auto' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: WISHLIST */}
          {activeSection === 'wishlist' && (
            <div className="profile-panel-card">
              <h2 className="profile-panel-title">My Wishlist</h2>
              <p className="profile-panel-subtitle">Items you have saved for later.</p>

              {wishlistedProducts.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                  <Heart size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 12px auto' }} />
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                    Your wishlist is currently empty. Tap the heart icon on any product to save it.
                  </p>
                  <button 
                    type="button" 
                    className="primary-pill-btn" 
                    onClick={() => setActiveTab('planners')}
                  >
                    Discover Gear
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '16px' }}>
                  {wishlistedProducts.map(prod => (
                    <div key={prod.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
                      <img src={prod.imageUrl} alt={prod.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-xs)', marginBottom: '10px' }} />
                      <h4 style={{ fontSize: '13px', margin: '0 0 4px 0', fontWeight: 600 }}>{prod.title}</h4>
                      <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>{formatPrice(prod.price, currency)}</div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          type="button" 
                          className="primary-pill-btn" 
                          onClick={() => addToCart(prod, 1)}
                          style={{ flex: 1, padding: '7px 10px', fontSize: '11px' }}
                        >
                          Add to Cart
                        </button>
                        <button 
                          type="button" 
                          className="icon-btn-pill"
                          onClick={() => toggleWishlist(prod.id)}
                          title="Remove"
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Trash2 size={13} color="#991B1B" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 5: CUSTOMER SUPPORT */}
          {activeSection === 'support' && (
            <div className="profile-panel-card">
              <h2 className="profile-panel-title">Customer Support & Hardware Inquiries</h2>
              <p className="profile-panel-subtitle">Dedicated assistance for order dispatch, returns, and specifications.</p>

              <div style={{ background: 'var(--bg-surface-soft)', padding: '16px', borderRadius: 'var(--radius-sm)', margin: '16px 0', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                  <strong style={{ fontSize: '13px' }}>Official Support: support@pixelnest.io</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                  Response time: Under 4 hours on business days. Please mention your order number for fastest handling.
                </p>
              </div>

              <form onSubmit={e => { e.preventDefault(); showToast('Support ticket dispatched to concierge.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Subject</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Question regarding Order tracking or specification"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Message</label>
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="Describe your inquiry..."
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
                  />
                </div>
                <button type="submit" className="primary-pill-btn" style={{ padding: '10px 20px', fontSize: '12px', width: 'fit-content' }}>
                  Send Message
                </button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
