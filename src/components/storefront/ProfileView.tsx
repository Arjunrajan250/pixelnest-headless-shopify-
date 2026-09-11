import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Settings, 
  ShoppingBag, 
  DownloadCloud, 
  ShieldCheck,
  Heart, 
  MapPin, 
  HelpCircle, 
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Package,
  Truck,
  CreditCard,
  FileText,
  Award,
  CheckCircle2,
  Clock,
  Zap,
  Plus,
  Trash2,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
  Headphones,
  Sliders
} from 'lucide-react';

interface Address {
  id: string;
  type: string;
  isDefault: boolean;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export const ProfileView: React.FC = () => {
  const { setActiveTab, setAppMode, wishlist, products, orders, addToCart, setSelectedProduct } = useStore();

  // Active section inside the profile lounge
  const [activeSection, setActiveSection] = useState<'overview' | 'orders' | 'warranties' | 'wishlist' | 'addresses' | 'payments' | 'support'>('overview');
  
  // Interactive states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedSerial, setCopiedSerial] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  
  // Simulated address state
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      type: 'Home (Default)',
      isDefault: true,
      name: 'Aesthetic Girl',
      phone: '+91 98765 43210',
      street: 'Flat 402, Lotus Greens, Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    {
      id: 'addr-2',
      type: 'Creative Studio',
      isDefault: false,
      name: 'Aesthetic Girl',
      phone: '+91 98765 43210',
      street: 'Unit 8B, WeWork Galaxy, 43 Residency Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560025'
    }
  ]);

  // Form for new address
  const [newAddr, setNewAddr] = useState({
    type: 'Office',
    name: 'Aesthetic Girl',
    phone: '+91 98765 43210',
    street: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: ''
  });

  // Support chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'agent', text: 'Hello! Welcome to PixelNest VIP Hardware Concierge. How can we assist you with your devices or order today?', time: 'Just now' }
  ]);

  // Filter orders for Aesthetic Girl
  const customerOrders = orders.filter(
    o => o.customerEmail === 'aestheticgirl@gmail.com' || o.customerName.toLowerCase().includes('aesthetic')
  );

  // Wishlist products
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  // Registered hardware items
  const registeredHardware = [
    {
      id: 'reg-1',
      title: 'Custom Mechanical Keyboard',
      category: 'Peripherals',
      serial: 'PN-KB-75-9921-IN',
      purchaseDate: '10 Sep 2025',
      warrantyExpiry: '09 Sep 2026',
      status: 'Active (364 Days Remaining)',
      image: '/images/keyboard.jpg',
      specs: '75% Gasket Mount, Tactile Yellow Switches'
    },
    {
      id: 'reg-2',
      title: 'Ergonomic Wireless Mouse',
      category: 'Peripherals',
      serial: 'PN-MS-ERGO-4020-IN',
      purchaseDate: '08 Sep 2025',
      warrantyExpiry: '07 Sep 2026',
      status: 'Active (362 Days Remaining)',
      image: '/images/mouse.jpg',
      specs: 'Dual 2.4GHz + BT 5.2, 4000 DPI Silent'
    },
    {
      id: 'reg-3',
      title: '140W GaN 4-Port Fast Multi-Charger',
      category: 'Power & Charging',
      serial: 'PN-PWR-140-8812-IN',
      purchaseDate: '08 Sep 2025',
      warrantyExpiry: '07 Sep 2026',
      status: 'Active (362 Days Remaining)',
      image: '/images/hardware_hero.jpg',
      specs: '3x USB-C PD 3.1 + 1x USB-A QC 4.0'
    }
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopySerial = (serial: string) => {
    navigator.clipboard?.writeText?.(serial);
    setCopiedSerial(serial);
    showToast(`Copied Serial: ${serial}`);
    setTimeout(() => setCopiedSerial(null), 2000);
  };

  const handleDownloadInvoice = (orderId: string) => {
    showToast(`Downloading Tax Invoice & Warranty Slip for Order #${orderId}...`);
    // Simulated invoice file download
    const invoiceContent = `========================================================\nPIXELNEST HARDWARE COMMERCE - TAX INVOICE\nOrder ID: #${orderId}\nCustomer: Aesthetic Girl\nGSTIN: 29AAACP1234F1Z5\nWarranty: 1 Year Official Replacement Guarantee\nAuthorized Signatory: PixelNest Logistics Ltd.\n========================================================`;
    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PixelNest_Invoice_${orderId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.pincode) return;
    const added: Address = {
      id: `addr-${Date.now()}`,
      type: newAddr.type,
      isDefault: false,
      name: newAddr.name,
      phone: newAddr.phone,
      street: newAddr.street,
      city: newAddr.city,
      state: newAddr.state,
      pincode: newAddr.pincode
    };
    setAddresses([...addresses, added]);
    setIsAddAddressOpen(false);
    setNewAddr({
      type: 'Office',
      name: 'Aesthetic Girl',
      phone: '+91 98765 43210',
      street: '',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: ''
    });
    showToast('New shipping address saved successfully!');
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id,
      type: a.id === id ? `${a.type.replace(' (Default)', '')} (Default)` : a.type.replace(' (Default)', '')
    })));
    showToast('Default delivery address updated!');
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
    showToast('Address removed.');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'agent', 
          text: `Thank you for contacting PixelNest Concierge regarding "${userText}". A dedicated hardware engineer has been assigned and will update your order ticket within 15 minutes.`, 
          time: 'Just now' 
        }
      ]);
    }, 1200);
  };

  return (
    <div className="profile-screen-luxe">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="profile-toast">
          <CheckCircle2 size={16} style={{ color: '#4A5B4F' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="profile-top-bar">
        <div className="profile-top-left">
          <button 
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
            <span className="crumb-current">Customer Lounge</span>
          </div>
        </div>

        <div className="profile-top-right">
          <div className="profile-vip-pill">
            <Award size={14} style={{ color: '#D97706' }} />
            <span>PixelClub Platinum</span>
          </div>
          <button 
            className="profile-admin-shortcut-btn"
            onClick={() => setAppMode('admin')}
            title="Switch to Shopify Merchant Admin"
          >
            <Sliders size={15} />
            <span>Shopify Admin</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Left Profile Sidebar + Right Dynamic Content Workspace */}
      <div className="profile-lounge-grid">
        
        {/* LEFT COLUMN: Profile Sidebar */}
        <aside className="profile-lounge-sidebar">
          {/* User Hero Identity Card */}
          <div className="profile-hero-card">
            <div className="profile-avatar-wrapper">
              <img 
                src="/images/avatar.jpg" 
                alt="Aesthetic Girl" 
                className="profile-lounge-avatar"
              />
              <span className="profile-status-online" title="Active VIP Member" />
            </div>

            <div className="profile-hero-details">
              <h1 className="profile-hero-name">Aesthetic Girl</h1>
              <p className="profile-hero-email">aestheticgirl@gmail.com</p>
              <div className="profile-hero-badge-row">
                <span className="profile-meta-chip">
                  <Sparkles size={12} style={{ color: '#D97706' }} />
                  VIP Hardware Club
                </span>
                <span className="profile-meta-chip">Since Oct 2024</span>
              </div>
            </div>

            {/* Wallet & Loyalty Points Summary */}
            <div className="profile-points-widget">
              <div className="points-info">
                <span className="points-label">PixelNest Points</span>
                <strong className="points-value">2,450 pts</strong>
                <span className="points-equivalent">≈ ₹245.00 Redeemable</span>
              </div>
              <div className="points-action">
                <span className="points-perk-badge">Free 48h Express Shipping</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav className="profile-nav-menu">
            <button 
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
              className={`profile-nav-link ${activeSection === 'warranties' ? 'active' : ''}`}
              onClick={() => setActiveSection('warranties')}
            >
              <div className="nav-link-left">
                <ShieldCheck size={16} className="nav-icon" />
                <span>Hardware Warranties</span>
              </div>
              <span className="nav-badge-verified">3 Active</span>
            </button>

            <button 
              className={`profile-nav-link ${activeSection === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveSection('wishlist')}
            >
              <div className="nav-link-left">
                <Heart size={16} className="nav-icon" />
                <span>Saved Hardware Gear</span>
              </div>
              <span className="nav-badge-count">{wishlist.length}</span>
            </button>

            <button 
              className={`profile-nav-link ${activeSection === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveSection('addresses')}
            >
              <div className="nav-link-left">
                <MapPin size={16} className="nav-icon" />
                <span>Delivery Addresses</span>
              </div>
              <ChevronRight size={14} className="nav-arrow" />
            </button>

            <button 
              className={`profile-nav-link ${activeSection === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveSection('payments')}
            >
              <div className="nav-link-left">
                <CreditCard size={16} className="nav-icon" />
                <span>Payment & Invoices</span>
              </div>
              <ChevronRight size={14} className="nav-arrow" />
            </button>

            <button 
              className={`profile-nav-link ${activeSection === 'support' ? 'active' : ''}`}
              onClick={() => setActiveSection('support')}
            >
              <div className="nav-link-left">
                <Headphones size={16} className="nav-icon" />
                <span>VIP Concierge & Help</span>
              </div>
              <span className="nav-badge-live">Live</span>
            </button>
          </nav>

          {/* Assurance Footer Note */}
          <div className="profile-assurance-box">
            <div className="assurance-header">
              <ShieldCheck size={18} style={{ color: '#4A5B4F' }} />
              <strong>Official Brand Guarantee</strong>
            </div>
            <p className="assurance-text">
              All devices include 1-year pan-India doorstep replacement and 24/7 dedicated hardware concierge.
            </p>
          </div>
        </aside>

        {/* RIGHT COLUMN: Interactive Workspaces */}
        <main className="profile-lounge-main">

          {/* 1. OVERVIEW SECTION */}
          {activeSection === 'overview' && (
            <div className="lounge-section-fade">
              {/* Active Dispatch Live Tracker Hero */}
              <div className="active-dispatch-hero-card">
                <div className="dispatch-hero-header">
                  <div className="dispatch-header-title">
                    <span className="dispatch-pulsing-dot" />
                    <div>
                      <h3 className="dispatch-title">Live Shipment In-Transit</h3>
                      <p className="dispatch-sub">Order #DN24879 • Out for Delivery with Delhivery</p>
                    </div>
                  </div>
                  <div className="dispatch-eta-pill">
                    <Clock size={13} />
                    <span>Estimated: Tomorrow, by 2:00 PM</span>
                  </div>
                </div>

                {/* 4-Step Visual Tracker */}
                <div className="dispatch-steps-bar">
                  <div className="dispatch-step completed">
                    <div className="step-circle"><Check size={12} /></div>
                    <span className="step-label">Ordered</span>
                    <span className="step-sub">10 Sep</span>
                  </div>
                  <div className="dispatch-connector active" />
                  <div className="dispatch-step completed">
                    <div className="step-circle"><Check size={12} /></div>
                    <span className="step-label">Tested & Packed</span>
                    <span className="step-sub">Warehouse Hub</span>
                  </div>
                  <div className="dispatch-connector active" />
                  <div className="dispatch-step in-progress">
                    <div className="step-circle"><Truck size={13} /></div>
                    <span className="step-label">Out for Delivery</span>
                    <span className="step-sub">Bengaluru East</span>
                  </div>
                  <div className="dispatch-connector" />
                  <div className="dispatch-step pending">
                    <div className="step-circle"><Package size={12} /></div>
                    <span className="step-label">Delivered</span>
                    <span className="step-sub">Doorstep</span>
                  </div>
                </div>

                <div className="dispatch-footer">
                  <div className="dispatch-item-summary">
                    <img src="/images/keyboard.jpg" alt="Keyboard" className="dispatch-item-thumb" />
                    <div>
                      <span className="dispatch-item-name">Custom Mechanical Keyboard (75% Gasket)</span>
                      <span className="dispatch-item-qty">Qty: 1 • Courier Tracking: DL772910</span>
                    </div>
                  </div>
                  <div className="dispatch-actions">
                    <button 
                      className="btn-outline-sm"
                      onClick={() => showToast('Delhivery Real-Time Tracking: Package arrived at Bengaluru North sorting facility.')}
                    >
                      <Truck size={14} />
                      <span>Track Delhivery</span>
                    </button>
                    <button 
                      className="btn-primary-sm"
                      onClick={() => setActiveSection('orders')}
                    >
                      <span>View Full Details</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 KPI Metrics Quick Summary */}
              <div className="profile-metrics-quad">
                <div className="metric-box">
                  <div className="metric-box-icon"><ShoppingBag size={18} /></div>
                  <div className="metric-box-info">
                    <span className="metric-box-label">Completed Orders</span>
                    <strong className="metric-box-num">2 Orders</strong>
                    <span className="metric-box-sub">₹8,257 Total Spend</span>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-box-icon" style={{ background: '#E8F5E9', color: '#2E7D32' }}><ShieldCheck size={18} /></div>
                  <div className="metric-box-info">
                    <span className="metric-box-label">Active Warranties</span>
                    <strong className="metric-box-num">3 Devices</strong>
                    <span className="metric-box-sub">100% Covered</span>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-box-icon" style={{ background: '#FEF3C7', color: '#D97706' }}><Award size={18} /></div>
                  <div className="metric-box-info">
                    <span className="metric-box-label">Club Tier</span>
                    <strong className="metric-box-num">Platinum</strong>
                    <span className="metric-box-sub">2,450 Reward Points</span>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-box-icon" style={{ background: '#F3E8FF', color: '#7E22CE' }}><Heart size={18} /></div>
                  <div className="metric-box-info">
                    <span className="metric-box-label">Saved Gear</span>
                    <strong className="metric-box-num">{wishlist.length} Items</strong>
                    <span className="metric-box-sub">In Tech Wishlist</span>
                  </div>
                </div>
              </div>

              {/* Registered Hardware Ecosystem */}
              <div className="profile-workspace-panel">
                <div className="panel-header-row">
                  <div>
                    <h3 className="panel-title">My Registered Hardware Fleet</h3>
                    <p className="panel-subtitle">Instant access to serial numbers, coverage timeline, and warranty certificates.</p>
                  </div>
                  <button 
                    className="btn-outline-sm"
                    onClick={() => setActiveSection('warranties')}
                  >
                    <span>Manage Warranties</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="hardware-cards-grid">
                  {registeredHardware.map(hw => (
                    <div key={hw.id} className="hardware-device-card">
                      <div className="device-card-media">
                        <img src={hw.image} alt={hw.title} className="device-card-img" />
                        <span className="device-status-badge">
                          <CheckCircle2 size={12} />
                          <span>Active</span>
                        </span>
                      </div>
                      <div className="device-card-content">
                        <h4 className="device-title">{hw.title}</h4>
                        <p className="device-specs">{hw.specs}</p>
                        
                        <div className="device-serial-row">
                          <span className="serial-label">Serial:</span>
                          <code className="serial-code">{hw.serial}</code>
                          <button 
                            className="serial-copy-btn"
                            title="Copy Serial Number"
                            onClick={() => handleCopySerial(hw.serial)}
                          >
                            {copiedSerial === hw.serial ? <Check size={12} style={{ color: '#2E7D32' }} /> : <Copy size={12} />}
                          </button>
                        </div>

                        <div className="device-warranty-status">
                          <div className="warranty-progress-bar">
                            <div className="warranty-progress-fill" style={{ width: '92%' }} />
                          </div>
                          <div className="warranty-expiry-text">
                            <span>Valid until {hw.warrantyExpiry}</span>
                            <span className="days-left">360+ Days</span>
                          </div>
                        </div>

                        <div className="device-actions-row">
                          <button 
                            className="device-action-btn"
                            onClick={() => showToast(`Generating official warranty certificate for ${hw.title}...`)}
                          >
                            <DownloadCloud size={13} />
                            <span>Certificate</span>
                          </button>
                          <button 
                            className="device-action-btn"
                            onClick={() => {
                              setActiveSection('support');
                              setChatInput(`I would like to claim warranty service for ${hw.title} (Serial: ${hw.serial})`);
                            }}
                          >
                            <ShieldCheck size={13} />
                            <span>Claim Service</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Tech Setup Recommendations */}
              <div className="profile-workspace-panel">
                <div className="panel-header-row">
                  <div>
                    <h3 className="panel-title">Recommended Upgrades for Your Setup</h3>
                    <p className="panel-subtitle">Engineered to pair seamlessly with your custom mechanical keyboard and mouse.</p>
                  </div>
                  <button 
                    className="btn-outline-sm"
                    onClick={() => setActiveTab('categories')}
                  >
                    <span>Browse All Tech</span>
                  </button>
                </div>

                <div className="recommendations-grid">
                  {products.slice(6, 9).map(prod => (
                    <div key={prod.id} className="rec-product-card">
                      <img src={prod.imageUrl} alt={prod.title} className="rec-img" />
                      <div className="rec-info">
                        <span className="rec-category">{prod.category}</span>
                        <h4 className="rec-title">{prod.title}</h4>
                        <div className="rec-price-row">
                          <span className="rec-price">₹{prod.price.toLocaleString('en-IN')}</span>
                          {prod.compareAtPrice && (
                            <span className="rec-compare">₹{prod.compareAtPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        <div className="rec-actions">
                          <button 
                            className="btn-add-rec"
                            onClick={() => {
                              addToCart(prod, 1);
                              showToast(`Added ${prod.title} to cart!`);
                            }}
                          >
                            <ShoppingBag size={13} />
                            <span>Add to Cart</span>
                          </button>
                          <button 
                            className="btn-view-rec"
                            onClick={() => {
                              setSelectedProduct(prod);
                              setActiveTab('product-detail');
                            }}
                          >
                            <span>Specs</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. ORDERS & SHIPMENTS SECTION */}
          {activeSection === 'orders' && (
            <div className="lounge-section-fade">
              <div className="panel-header-row" style={{ marginBottom: '20px' }}>
                <div>
                  <h2 className="panel-title-lg">Order History & Courier Tracking</h2>
                  <p className="panel-subtitle">Review real-time package statuses, carrier details, and official tax invoices.</p>
                </div>
                <button 
                  className="btn-primary-sm"
                  onClick={() => setActiveTab('home')}
                >
                  <ShoppingBag size={14} />
                  <span>Shop Hardware</span>
                </button>
              </div>

              <div className="orders-cards-stack">
                {customerOrders.map(order => (
                  <div key={order.id} className="lounge-order-card">
                    <div className="order-card-top">
                      <div className="order-id-group">
                        <span className="order-number-tag">#{order.orderNumber}</span>
                        <span className="order-date-text">
                          {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="order-badges-group">
                        <span className={`order-status-pill ${order.status.toLowerCase()}`}>
                          {order.status === 'Completed' && <CheckCircle2 size={12} />}
                          {order.status === 'Processing' && <Clock size={12} />}
                          <span>{order.status}</span>
                        </span>
                        <span className="order-payment-pill">
                          {order.paymentMethod.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Delivery & Carrier Info */}
                    <div className="order-tracking-strip">
                      <Truck size={16} style={{ color: '#4A5B4F' }} />
                      <div className="tracking-strip-text">
                        <strong>Dispatch Status:</strong> {order.deliveryDate}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="order-items-table">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item-row">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.title} 
                            className="order-item-img"
                          />
                          <div className="order-item-info">
                            <h4 className="order-item-name">{item.product.title}</h4>
                            <p className="order-item-cat">{item.product.category} • {item.product.warranty || '1 Year Official Warranty'}</p>
                          </div>
                          <div className="order-item-pricing">
                            <span className="order-item-qty">Qty: {item.quantity}</span>
                            <span className="order-item-price">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Total & Actions */}
                    <div className="order-card-bottom">
                      <div className="order-total-block">
                        <span className="total-label">Total Paid (incl. GST)</span>
                        <strong className="total-amount">₹{order.total.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="order-actions-cluster">
                        <button 
                          className="btn-outline-sm"
                          onClick={() => handleDownloadInvoice(order.orderNumber)}
                        >
                          <FileText size={14} />
                          <span>Tax Invoice & Warranty</span>
                        </button>
                        <button 
                          className="btn-primary-sm"
                          onClick={() => {
                            order.items.forEach(i => addToCart(i.product, i.quantity));
                            showToast('Items added to cart for quick re-order!');
                            setActiveTab('cart');
                          }}
                        >
                          <ShoppingBag size={14} />
                          <span>Re-Order Gear</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. HARDWARE WARRANTIES SECTION */}
          {activeSection === 'warranties' && (
            <div className="lounge-section-fade">
              <div className="panel-header-row" style={{ marginBottom: '20px' }}>
                <div>
                  <h2 className="panel-title-lg">1-Year Hardware Protection Guarantee</h2>
                  <p className="panel-subtitle">Official replacement warranty certificates, device registration, and technician booking.</p>
                </div>
                <button 
                  className="btn-outline-sm"
                  onClick={() => showToast('Enter your retail invoice number to link additional hardware.')}
                >
                  <Plus size={14} />
                  <span>Register Another Device</span>
                </button>
              </div>

              {/* Warranty Coverage Highlight Card */}
              <div className="warranty-highlight-banner">
                <div className="banner-icon-circle"><ShieldCheck size={28} /></div>
                <div className="banner-text-block">
                  <h3 className="banner-title">Pan-India Doorstep Hardware Replacement</h3>
                  <p className="banner-desc">
                    If any key switch, optical sensor, or internal GaN capacitor exhibits abnormal behavior within 12 months, our courier arranges complimentary doorstep collection and 48-hour replacement.
                  </p>
                </div>
              </div>

              <div className="warranty-cards-grid">
                {registeredHardware.map(hw => (
                  <div key={hw.id} className="warranty-full-card">
                    <div className="wcard-header">
                      <img src={hw.image} alt={hw.title} className="wcard-img" />
                      <div className="wcard-head-info">
                        <span className="wcard-cat">{hw.category}</span>
                        <h4 className="wcard-title">{hw.title}</h4>
                        <span className="wcard-serial">Serial: <code>{hw.serial}</code></span>
                      </div>
                      <span className="wcard-status-pill">
                        <CheckCircle2 size={13} />
                        <span>Protected</span>
                      </span>
                    </div>

                    <div className="wcard-body">
                      <div className="wcard-metrics">
                        <div>
                          <span className="wmetric-label">Purchased On</span>
                          <strong className="wmetric-val">{hw.purchaseDate}</strong>
                        </div>
                        <div>
                          <span className="wmetric-label">Expires On</span>
                          <strong className="wmetric-val">{hw.warrantyExpiry}</strong>
                        </div>
                        <div>
                          <span className="wmetric-label">Coverage Type</span>
                          <strong className="wmetric-val">100% Replacement</strong>
                        </div>
                      </div>

                      <div className="wcard-actions">
                        <button 
                          className="btn-outline-sm"
                          onClick={() => showToast(`Downloaded warranty slip for ${hw.serial}`)}
                        >
                          <DownloadCloud size={14} />
                          <span>Warranty Slip PDF</span>
                        </button>
                        <button 
                          className="btn-primary-sm"
                          onClick={() => {
                            setActiveSection('support');
                            setChatInput(`Claiming technician service for ${hw.title} (${hw.serial})`);
                          }}
                        >
                          <ShieldCheck size={14} />
                          <span>Request Replacement</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. WISHLIST SECTION */}
          {activeSection === 'wishlist' && (
            <div className="lounge-section-fade">
              <div className="panel-header-row" style={{ marginBottom: '20px' }}>
                <div>
                  <h2 className="panel-title-lg">Saved Hardware Gear ({wishlist.length})</h2>
                  <p className="panel-subtitle">Items you are eyeing for your upcoming desk aesthetic and performance upgrades.</p>
                </div>
                <button 
                  className="btn-outline-sm"
                  onClick={() => setActiveTab('categories')}
                >
                  <span>Explore Hardware</span>
                </button>
              </div>

              {wishlistedProducts.length === 0 ? (
                <div className="empty-lounge-box">
                  <Heart size={36} style={{ color: '#A39D95', marginBottom: '12px' }} />
                  <h3>Your wishlist is waiting for dream tech</h3>
                  <p>Explore our premium keyboards, curved monitors, and fast GaN chargers to save items here.</p>
                  <button 
                    className="btn-primary-sm" 
                    style={{ marginTop: '16px' }}
                    onClick={() => setActiveTab('home')}
                  >
                    <span>Browse Catalog</span>
                  </button>
                </div>
              ) : (
                <div className="wishlist-lounge-grid">
                  {wishlistedProducts.map(prod => (
                    <div key={prod.id} className="wishlist-gear-card">
                      <div className="wishlist-img-wrapper">
                        <img src={prod.imageUrl} alt={prod.title} className="wishlist-gear-img" />
                        <span className="wishlist-rating-tag">★ {prod.rating}</span>
                      </div>
                      <div className="wishlist-gear-details">
                        <span className="wishlist-gear-cat">{prod.category}</span>
                        <h4 className="wishlist-gear-title">{prod.title}</h4>
                        <div className="wishlist-gear-price-row">
                          <strong className="wishlist-price">₹{prod.price.toLocaleString('en-IN')}</strong>
                          {prod.compareAtPrice && (
                            <span className="wishlist-compare">₹{prod.compareAtPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        <div className="wishlist-gear-actions">
                          <button 
                            className="btn-primary-sm"
                            onClick={() => {
                              addToCart(prod, 1);
                              showToast(`Added ${prod.title} to cart!`);
                            }}
                          >
                            <ShoppingBag size={14} />
                            <span>Add to Cart</span>
                          </button>
                          <button 
                            className="btn-outline-sm"
                            onClick={() => {
                              setSelectedProduct(prod);
                              setActiveTab('product-detail');
                            }}
                          >
                            <span>Inspect</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. ADDRESSES SECTION */}
          {activeSection === 'addresses' && (
            <div className="lounge-section-fade">
              <div className="panel-header-row" style={{ marginBottom: '20px' }}>
                <div>
                  <h2 className="panel-title-lg">Saved Delivery Addresses</h2>
                  <p className="panel-subtitle">Manage multiple shipping destinations for instant 1-click hardware checkout.</p>
                </div>
                <button 
                  className="btn-primary-sm"
                  onClick={() => setIsAddAddressOpen(true)}
                >
                  <Plus size={14} />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="addresses-cards-grid">
                {addresses.map(addr => (
                  <div key={addr.id} className={`address-lounge-card ${addr.isDefault ? 'is-default' : ''}`}>
                    <div className="addr-card-top">
                      <div className="addr-type-tag">
                        <MapPin size={14} />
                        <span>{addr.type}</span>
                      </div>
                      {addr.isDefault ? (
                        <span className="addr-default-pill">Default Shipping</span>
                      ) : (
                        <button 
                          className="btn-set-default"
                          onClick={() => handleSetDefaultAddress(addr.id)}
                        >
                          Make Default
                        </button>
                      )}
                    </div>

                    <div className="addr-card-body">
                      <strong className="addr-recipient-name">{addr.name}</strong>
                      <p className="addr-street">{addr.street}</p>
                      <p className="addr-city-state">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="addr-phone">Phone: {addr.phone}</p>
                    </div>

                    <div className="addr-card-bottom">
                      <button 
                        className="addr-btn-edit"
                        onClick={() => showToast('Address editor ready.')}
                      >
                        Edit
                      </button>
                      {!addr.isDefault && (
                        <button 
                          className="addr-btn-delete"
                          onClick={() => handleDeleteAddress(addr.id)}
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {isAddAddressOpen && (
                <div className="modal-overlay" onClick={() => setIsAddAddressOpen(false)}>
                  <div className="modal-card address-modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                      <h3>Add New Delivery Location</h3>
                      <button className="btn-close" onClick={() => setIsAddAddressOpen(false)}>×</button>
                    </div>
                    <form onSubmit={handleAddAddress} className="address-form">
                      <div className="form-group">
                        <label>Location Label (e.g. Home, Creative Studio, Warehouse)</label>
                        <input 
                          type="text" 
                          value={newAddr.type} 
                          onChange={e => setNewAddr({ ...newAddr, type: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="form-row-2">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input 
                            type="text" 
                            value={newAddr.name} 
                            onChange={e => setNewAddr({ ...newAddr, name: e.target.value })}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input 
                            type="text" 
                            value={newAddr.phone} 
                            onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                            required 
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Street Address / Flat / Building</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 104, Sunrise Heights, MG Road"
                          value={newAddr.street} 
                          onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="form-row-3">
                        <div className="form-group">
                          <label>City</label>
                          <input 
                            type="text" 
                            value={newAddr.city} 
                            onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>State</label>
                          <input 
                            type="text" 
                            value={newAddr.state} 
                            onChange={e => setNewAddr({ ...newAddr, state: e.target.value })}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>Pincode</label>
                          <input 
                            type="text" 
                            placeholder="560001"
                            value={newAddr.pincode} 
                            onChange={e => setNewAddr({ ...newAddr, pincode: e.target.value })}
                            required 
                          />
                        </div>
                      </div>
                      <div className="modal-actions" style={{ marginTop: '20px' }}>
                        <button type="button" className="btn-outline-sm" onClick={() => setIsAddAddressOpen(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary-sm">
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. PAYMENTS SECTION */}
          {activeSection === 'payments' && (
            <div className="lounge-section-fade">
              <div className="panel-header-row" style={{ marginBottom: '20px' }}>
                <div>
                  <h2 className="panel-title-lg">Saved Payment Methods & Invoices</h2>
                  <p className="panel-subtitle">Secure PCI-DSS compliant vault for fast express checkout.</p>
                </div>
                <button 
                  className="btn-outline-sm"
                  onClick={() => showToast('Secure payment gateway vault ready.')}
                >
                  <Plus size={14} />
                  <span>Add New Card / UPI</span>
                </button>
              </div>

              <div className="payment-cards-grid">
                <div className="payment-method-card active-card">
                  <div className="pm-header">
                    <div className="pm-brand">
                      <Zap size={18} style={{ color: '#2E7D32' }} />
                      <strong>UPI Instant Autopay</strong>
                    </div>
                    <span className="pm-default-badge">Primary</span>
                  </div>
                  <div className="pm-details">
                    <code className="pm-vpa">aestheticgirl@okaxis</code>
                    <p className="pm-sub">Verified via National Payments Corporation of India</p>
                  </div>
                  <div className="pm-footer">
                    <span className="pm-secure-text">✓ Zero Convenience Fee</span>
                    <button className="btn-outline-sm" onClick={() => showToast('UPI VPA re-verified')}>Verify</button>
                  </div>
                </div>

                <div className="payment-method-card">
                  <div className="pm-header">
                    <div className="pm-brand">
                      <CreditCard size={18} style={{ color: '#1E40AF' }} />
                      <strong>HDFC Millennia Credit Card</strong>
                    </div>
                  </div>
                  <div className="pm-details">
                    <code className="pm-vpa">•••• •••• •••• 4242</code>
                    <p className="pm-sub">Expires 08/29 • Visa Platinum</p>
                  </div>
                  <div className="pm-footer">
                    <span className="pm-secure-text">256-Bit SSL Protected</span>
                    <button className="btn-outline-sm" onClick={() => showToast('Card details active')}>Manage</button>
                  </div>
                </div>
              </div>

              {/* Tax Invoice Vault */}
              <div className="profile-workspace-panel" style={{ marginTop: '24px' }}>
                <div className="panel-header-row">
                  <div>
                    <h3 className="panel-title">Downloadable GST Tax Invoices</h3>
                    <p className="panel-subtitle">Official invoices with valid GST input credit breakdown for business expenses.</p>
                  </div>
                </div>

                <div className="invoices-list">
                  {customerOrders.map(ord => (
                    <div key={ord.id} className="invoice-download-row">
                      <div className="inv-left">
                        <FileText size={18} style={{ color: '#4A5B4F' }} />
                        <div>
                          <strong>Tax Invoice #{ord.orderNumber}</strong>
                          <span className="inv-date">{new Date(ord.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • ₹{ord.total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <button 
                        className="btn-outline-sm"
                        onClick={() => handleDownloadInvoice(ord.orderNumber)}
                      >
                        <DownloadCloud size={14} />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. SUPPORT & CONCIERGE SECTION */}
          {activeSection === 'support' && (
            <div className="lounge-section-fade">
              <div className="panel-header-row" style={{ marginBottom: '20px' }}>
                <div>
                  <h2 className="panel-title-lg">VIP Hardware Concierge Desk</h2>
                  <p className="panel-subtitle">24/7 dedicated support engineers for troubleshooting, firmware updates, and doorstep warranty.</p>
                </div>
              </div>

              <div className="support-workspace-grid">
                {/* Live Chat Widget */}
                <div className="concierge-chat-panel">
                  <div className="chat-panel-header">
                    <div className="agent-status-row">
                      <div className="agent-avatar">PN</div>
                      <div>
                        <strong>PixelNest Priority Support</strong>
                        <span className="agent-online-sub">● Online • Average Reply: 2 mins</span>
                      </div>
                    </div>
                    <span className="vip-desk-badge">VIP Lounge Priority</span>
                  </div>

                  <div className="chat-conversation-scroll">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`chat-bubble-row ${msg.sender}`}>
                        <div className="chat-bubble">
                          <p>{msg.text}</p>
                          <span className="chat-time">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendChat} className="chat-input-bar">
                    <input 
                      type="text" 
                      placeholder="Ask anything about your hardware, warranty, or delivery..."
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                    />
                    <button type="submit" className="btn-chat-send">
                      <MessageSquare size={15} />
                      <span>Send</span>
                    </button>
                  </form>
                </div>

                {/* FAQs Accordion */}
                <div className="concierge-faq-panel">
                  <h3 className="faq-panel-title">Frequently Asked Questions</h3>
                  
                  {[
                    {
                      q: 'How does the 1-Year Doorstep Replacement Warranty work?',
                      a: 'If any key switch, optical sensor, or internal GaN capacitor stops working, book a service ticket in your warranties tab. Our courier picks up the defective unit and delivers a brand-new replacement within 48-72 hours.'
                    },
                    {
                      q: 'Can I change my courier delivery address while in-transit?',
                      a: 'Yes, if your order is handled by BlueDart or Delhivery, submit your updated address within 4 hours of dispatch via our concierge chat.'
                    },
                    {
                      q: 'How do I redeem my 2,450 PixelPoints?',
                      a: 'Your points automatically apply as a ₹245.00 discount on your next checkout when you click "Apply Loyalty Reward" in the cart drawer.'
                    },
                    {
                      q: 'Where do I find my hardware serial numbers?',
                      a: 'Your serial numbers are laser-engraved on the underside of your hardware and automatically archived in the "Hardware Warranties" tab of this lounge.'
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className={`faq-accordion-item ${activeFaq === idx ? 'open' : ''}`}>
                      <button 
                        className="faq-question-btn"
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      >
                        <span>{faq.q}</span>
                        <ChevronRight size={14} className="faq-chevron" />
                      </button>
                      {activeFaq === idx && (
                        <div className="faq-answer-body">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Direct Contact Channels */}
                  <div className="direct-channels-card">
                    <strong>Direct Emergency Hardware Line</strong>
                    <p>WhatsApp Hotline: <code>+91 80 4920 1888</code></p>
                    <p>VIP Support Email: <code>concierge@pixelnest.store</code></p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
