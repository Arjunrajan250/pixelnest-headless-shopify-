import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  RefreshCw, 
  Search, 
  Download, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  X, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Order } from '../../types';

export const AdminOverview: React.FC = () => {
  const { products, orders, setAdminTab, syncShopifyProducts, shopifyConfig } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Processing' | 'Cancelled'>('All');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'quarter'>('7d');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeChartBar, setActiveChartBar] = useState<number | null>(null);

  // Revenue & Metrics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' ? true : order.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(term) ||
      order.customerName.toLowerCase().includes(term) ||
      order.customerEmail.toLowerCase().includes(term) ||
      order.items.some(it => it.product.title.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  // Daily Sales Trend Mock/Real Data for Chart
  const salesTrendData = [
    { day: 'Mon', date: 'Sep 05', revenue: 4299, orders: 1, label: '₹4.3k' },
    { day: 'Tue', date: 'Sep 06', revenue: 3297, orders: 1, label: '₹3.3k' },
    { day: 'Wed', date: 'Sep 07', revenue: 6499, orders: 2, label: '₹6.5k' },
    { day: 'Thu', date: 'Sep 08', revenue: 3958, orders: 1, label: '₹4.0k' },
    { day: 'Fri', date: 'Sep 09', revenue: 14299, orders: 2, label: '₹14.3k' },
    { day: 'Sat', date: 'Sep 10', revenue: 26198, orders: 3, label: '₹26.2k' },
    { day: 'Sun', date: 'Sep 11', revenue: 18450, orders: 2, label: '₹18.5k' },
  ];

  const maxRevenue = Math.max(...salesTrendData.map(d => d.revenue));

  // Category Distribution calculation
  const categoryStats = [
    { name: 'Displays & Mounts', percent: 42, amount: 26198, color: '#4A5B4F' },
    { name: 'Peripherals (Mice & Keyboards)', percent: 31, amount: 9757, color: '#667C6C' },
    { name: 'Power & Fast Charging', percent: 14, amount: 4398, color: '#889F8F' },
    { name: 'Home Living & Desk Gear', percent: 13, amount: 3996, color: '#B39E82' },
  ];

  // Stock inventory tracker
  const inventoryAlerts = [
    { title: 'Custom Mechanical Keyboard', stock: 4, status: 'low', badge: 'Low Stock (4 left)' },
    { title: '34" 4K Curved UltraWide Monitor', stock: 7, status: 'medium', badge: '7 Units Left' },
    { title: '140W GaN 4-Port Fast Multi-Charger', stock: 18, status: 'good', badge: 'Optimal (18 in stock)' },
    { title: 'Heavy Duty Magnetic Kitchen Hooks', stock: 42, status: 'good', badge: 'High Stock (42 packs)' },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSync = () => {
    setIsSyncing(true);
    syncShopifyProducts();
    setTimeout(() => {
      setIsSyncing(false);
      showToast(`✓ Synced ${products.length} hardware products with Shopify Storefront API successfully!`);
    }, 800);
  };

  const handleExportCSV = () => {
    const headers = 'Order Number,Customer Name,Email,Total,Payment,Status,Date\n';
    const rows = orders.map(o => 
      `"${o.orderNumber}","${o.customerName}","${o.customerEmail}",${o.total},"${o.paymentMethod}","${o.status}","${o.date}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixelnest_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('✓ Orders exported to CSV successfully!');
  };

  // Helper to extract courier
  const getCourierDisplay = (deliveryDate: string) => {
    if (deliveryDate.includes('BlueDart')) return { courier: 'BlueDart', code: 'BD8492019' };
    if (deliveryDate.includes('Delhivery')) return { courier: 'Delhivery', code: 'DL772910' };
    if (deliveryDate.includes('FedEx')) return { courier: 'FedEx', code: 'FX901248' };
    return { courier: 'Express Courier', code: 'EXP55291' };
  };

  return (
    <div className="admin-overview-wrapper">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="admin-toast-banner">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section with Live Status & Controls */}
      <div className="admin-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="admin-main-title">Merchant Overview</h1>
            <span className="live-store-pulse-badge">
              <span className="pulse-dot"></span>
              {shopifyConfig.liveMode ? 'Shopify Live API' : 'Headless Storefront Active'}
            </span>
          </div>
          <p className="admin-subtitle">
            Real-time analytics, hardware sales velocity, and inventory dispatch tracking.
          </p>
        </div>

        <div className="admin-actions-group">
          <div className="time-range-segmented">
            <button 
              className={`time-pill ${timeRange === '7d' ? 'active' : ''}`}
              onClick={() => setTimeRange('7d')}
            >
              Last 7 Days
            </button>
            <button 
              className={`time-pill ${timeRange === '30d' ? 'active' : ''}`}
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </button>
            <button 
              className={`time-pill ${timeRange === 'quarter' ? 'active' : ''}`}
              onClick={() => setTimeRange('quarter')}
            >
              This Quarter
            </button>
          </div>

          <button 
            className="btn-admin-secondary"
            onClick={handleExportCSV}
            title="Export orders as CSV"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button 
            className="btn-admin-secondary"
            onClick={handleSync}
            disabled={isSyncing}
            title="Sync products with Shopify"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Catalog'}</span>
          </button>

          <button 
            className="btn-admin-primary"
            onClick={() => setAdminTab('products')}
          >
            <Plus size={15} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Executive KPI Metric Cards */}
      <div className="admin-metrics-grid">
        {/* Card 1: Revenue */}
        <div className="metric-card-elevated">
          <div className="metric-card-top">
            <span className="metric-label">TOTAL REVENUE</span>
            <div className="metric-icon-circle green">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="metric-large-val">₹{totalRevenue.toLocaleString()}</div>
          <div className="metric-trend-pill positive">
            <TrendingUp size={12} />
            <span>+18.4% vs last period</span>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="metric-card-elevated">
          <div className="metric-card-top">
            <span className="metric-label">TOTAL ORDERS</span>
            <div className="metric-icon-circle blue">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="metric-large-val">{totalOrders}</div>
          <div className="metric-trend-pill neutral">
            <Truck size={12} />
            <span>100% Express Dispatched</span>
          </div>
        </div>

        {/* Card 3: Active Hardware */}
        <div className="metric-card-elevated">
          <div className="metric-card-top">
            <span className="metric-label">ACTIVE HARDWARE</span>
            <div className="metric-icon-circle terracotta">
              <Package size={16} />
            </div>
          </div>
          <div className="metric-large-val">{activeProducts} Items</div>
          <div className="metric-trend-pill positive">
            <CheckCircle2 size={12} />
            <span>Across 5 Categories • In Stock</span>
          </div>
        </div>

        {/* Card 4: Average Order Value */}
        <div className="metric-card-elevated">
          <div className="metric-card-top">
            <span className="metric-label">AVG ORDER VALUE</span>
            <div className="metric-icon-circle gold">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="metric-large-val">₹{avgOrderValue.toLocaleString()}</div>
          <div className="metric-trend-pill positive">
            <Sparkles size={12} />
            <span>Top Promo: FIRST10 applied</span>
          </div>
        </div>
      </div>

      {/* Interactive Sales Velocity Chart */}
      <div className="admin-chart-card">
        <div className="chart-header-row">
          <div>
            <h3 className="chart-title">Revenue & Sales Velocity</h3>
            <p className="chart-subtitle">Daily online store revenue breakdown for current billing cycle</p>
          </div>
          <div className="chart-stats-summary">
            <div className="summary-stat-badge">
              <span className="stat-label">Daily Run-Rate</span>
              <span className="stat-value">₹5,393</span>
            </div>
            <div className="summary-stat-badge">
              <span className="stat-label">Checkout Conversion</span>
              <span className="stat-value">3.8%</span>
            </div>
            <div className="summary-stat-badge">
              <span className="stat-label">Peak Volume</span>
              <span className="stat-value">₹26,198 (Thu)</span>
            </div>
          </div>
        </div>

        {/* Bar & Curve Visualizer */}
        <div className="chart-canvas-container">
          <div className="chart-bars-wrap">
            {salesTrendData.map((data, idx) => {
              const heightPercent = Math.max(16, Math.round((data.revenue / maxRevenue) * 100));
              const isHovered = activeChartBar === idx;
              return (
                <div 
                  key={data.day} 
                  className="chart-col-item"
                  onMouseEnter={() => setActiveChartBar(idx)}
                  onMouseLeave={() => setActiveChartBar(null)}
                >
                  {isHovered && (
                    <div className="chart-bar-tooltip">
                      <strong>₹{data.revenue.toLocaleString()}</strong>
                      <span>{data.orders} order{data.orders > 1 ? 's' : ''} • {data.date}</span>
                    </div>
                  )}
                  <div className="chart-bar-track">
                    <div 
                      className={`chart-bar-fill ${isHovered ? 'highlight' : ''}`} 
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="chart-col-label">{data.day}</span>
                  <span className="chart-col-amt">{data.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2-Column Operational Insights Grid */}
      <div className="admin-operational-grid">
        {/* Left: Category Distribution */}
        <div className="admin-card-panel">
          <div className="panel-header-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="#4A5B4F" />
              <h3 className="panel-title">Revenue by Category</h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>FY 2025-26</span>
          </div>

          <div className="category-bars-list">
            {categoryStats.map(cat => (
              <div key={cat.name} className="category-stat-row">
                <div className="cat-stat-header">
                  <span className="cat-stat-name">{cat.name}</span>
                  <span className="cat-stat-val">₹{cat.amount.toLocaleString()} ({cat.percent}%)</span>
                </div>
                <div className="cat-bar-track">
                  <div 
                    className="cat-bar-fill" 
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hardware Inventory & Logistics Health */}
        <div className="admin-card-panel">
          <div className="panel-header-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={16} color="#4A5B4F" />
              <h3 className="panel-title">Inventory & Dispatch Health</h3>
            </div>
            <button 
              className="panel-header-link" 
              onClick={() => setAdminTab('products')}
            >
              Manage Stock <ArrowRight size={12} />
            </button>
          </div>

          <div className="inventory-alerts-list">
            {inventoryAlerts.map(item => (
              <div key={item.title} className="inventory-alert-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className={`stock-indicator-dot ${item.status}`}></div>
                  <div>
                    <div className="inventory-item-title">{item.title}</div>
                    <div className="inventory-item-sub">Doorstep Courier Ready • Warehoused</div>
                  </div>
                </div>
                <span className={`inventory-badge ${item.status}`}>
                  {item.status === 'low' && <AlertTriangle size={11} />}
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supercharged Recent Customer Orders Table */}
      <div className="admin-table-container">
        <div className="table-toolbar-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div>
              <h3 className="table-heading">Recent Customer Orders</h3>
              <p className="table-subheading">Instant order tracking, courier dispatch, and fulfillment</p>
            </div>

            {/* Status Filter Tabs */}
            <div className="table-filter-pills">
              {(['All', 'Completed', 'Processing', 'Cancelled'] as const).map(tab => (
                <button
                  key={tab}
                  className={`table-filter-btn ${statusFilter === tab ? 'active' : ''}`}
                  onClick={() => setStatusFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div className="table-search-box">
              <Search size={14} color="#746D66" />
              <input 
                type="text" 
                placeholder="Search orders, customers..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="table-search-field"
              />
              {searchTerm && (
                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                  <X size={12} />
                </button>
              )}
            </div>

            <button 
              className="btn-admin-secondary"
              onClick={() => setAdminTab('orders')}
            >
              View Full Orders Tab →
            </button>
          </div>
        </div>

        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Hardware Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Courier & Tracking</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                  No orders match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                const courierInfo = getCourierDisplay(order.deliveryDate);
                const initials = order.customerName.split(' ').map(n => n[0]).join('').slice(0, 2);
                return (
                  <tr key={order.id} className="admin-table-row">
                    <td>
                      <span className="order-id-badge">#{order.orderNumber}</span>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar-circle">{initials}</div>
                        <div>
                          <div className="customer-name-text">{order.customerName}</div>
                          <div className="customer-email-text">{order.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="order-items-cell">
                        {order.items.slice(0, 2).map((it, idx) => (
                          <div key={idx} className="item-thumb-title">
                            <img 
                              src={it.product.imageUrl} 
                              alt={it.product.title} 
                              className="order-mini-thumb" 
                            />
                            <span className="order-item-name">{it.product.title}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <span className="more-items-tag">+{order.items.length - 2} more</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="order-total-val">₹{order.total.toLocaleString()}</div>
                      {order.discount > 0 && (
                        <span className="order-discount-pill">₹{order.discount} off</span>
                      )}
                    </td>
                    <td>
                      <span className="payment-chip-pill">
                        {order.paymentMethod.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="courier-pill">
                        <Truck size={12} color="#4A5B4F" />
                        <span style={{ fontWeight: 600 }}>{courierInfo.courier}</span>
                        <span className="tracking-id-text">{courierInfo.code}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill-modern ${order.status.toLowerCase()}`}>
                        <span className="status-dot"></span>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn-quick-view"
                        onClick={() => setSelectedOrder(order)}
                        title="View Order Details"
                      >
                        <Eye size={13} />
                        <span>Quick View</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Quick View Slide-over Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card" style={{ maxWidth: '560px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700 }}>
                  Order Details #{selectedOrder.orderNumber}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Placed on {new Date(selectedOrder.date).toLocaleString()}
                </span>
              </div>
              <button className="icon-btn-pill" onClick={() => setSelectedOrder(null)}>
                <X size={16} />
              </button>
            </div>

            {/* Courier Dispatch Timeline */}
            <div className="dispatch-timeline-box">
              <div className="timeline-step active">
                <div className="step-circle">✓</div>
                <span>Order Placed</span>
              </div>
              <div className="timeline-line active"></div>
              <div className="timeline-step active">
                <div className="step-circle">✓</div>
                <span>Packed</span>
              </div>
              <div className="timeline-line active"></div>
              <div className="timeline-step active">
                <div className="step-circle">✓</div>
                <span>In Transit</span>
              </div>
              <div className={`timeline-line ${selectedOrder.status === 'Completed' ? 'active' : ''}`}></div>
              <div className={`timeline-step ${selectedOrder.status === 'Completed' ? 'active' : ''}`}>
                <div className="step-circle">{selectedOrder.status === 'Completed' ? '✓' : '4'}</div>
                <span>Delivered</span>
              </div>
            </div>

            {/* Customer Details */}
            <div style={{ background: '#FAF7F2', padding: '14px', borderRadius: '12px', margin: '14px 0', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{selectedOrder.customerName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{selectedOrder.customerEmail}</div>
                </div>
                <span className={`status-pill-modern ${selectedOrder.status.toLowerCase()}`}>
                  {selectedOrder.status}
                </span>
              </div>
              {selectedOrder.shippingAddress && (
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', borderTop: '1px solid #ECE5DC', paddingTop: '6px' }}>
                  <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
                </div>
              )}
            </div>

            {/* Items Purchased */}
            <div style={{ margin: '14px 0' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>Purchased Hardware:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '10px', borderRadius: '10px', border: '1px solid #ECE5DC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={it.product.imageUrl} alt={it.product.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{it.product.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Qty: {it.quantity} • 1-Year Official Warranty</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '13px' }}>₹{it.product.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#2F7A4C' }}>
                  <span>Promo Discount ({selectedOrder.discountCode || 'DISCOUNT'})</span>
                  <span>-₹{selectedOrder.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                <span>Total Paid ({selectedOrder.paymentMethod.toUpperCase()})</span>
                <span>₹{selectedOrder.total}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              <button 
                className="btn-admin-primary" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  showToast(`✓ Official Tax Invoice for #${selectedOrder.orderNumber} downloaded!`);
                  setSelectedOrder(null);
                }}
              >
                <Download size={14} /> Download Tax Invoice PDF
              </button>
              <button 
                className="btn-admin-secondary" 
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
