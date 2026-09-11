import React from 'react';
import { useStore } from '../../context/StoreContext';
import { DollarSign, ShoppingBag, Package, TrendingUp, ArrowUpRight, Plus, RefreshCw } from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { products, orders, setAdminTab, syncShopifyProducts } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="admin-overview-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700 }}>Merchant Overview</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Performance summary for your headless Shopify digital goods store.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary"
            onClick={() => syncShopifyProducts()}
          >
            <RefreshCw size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Sync Catalog
          </button>
          <button 
            className="btn-primary"
            onClick={() => setAdminTab('products')}
          >
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="admin-metrics-grid">
        <div className="metric-card">
          <div className="metric-card-title">
            <span>TOTAL REVENUE</span>
            <DollarSign size={16} color="#4A5B4F" />
          </div>
          <div className="metric-card-value">₹{totalRevenue.toLocaleString()}</div>
          <div className="metric-card-subtitle">
            <TrendingUp size={12} style={{ display: 'inline', marginRight: '4px' }} />
            +18.4% from last month
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-title">
            <span>TOTAL ORDERS</span>
            <ShoppingBag size={16} color="#4A5B4F" />
          </div>
          <div className="metric-card-value">{totalOrders}</div>
          <div className="metric-card-subtitle">
            <TrendingUp size={12} style={{ display: 'inline', marginRight: '4px' }} />
            100% digital fulfillment
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-title">
            <span>ACTIVE PRODUCTS</span>
            <Package size={16} color="#4A5B4F" />
          </div>
          <div className="metric-card-value">{activeProducts}</div>
          <div className="metric-card-subtitle">
            Across 6 categories
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-title">
            <span>AVG ORDER VALUE</span>
            <ArrowUpRight size={16} color="#4A5B4F" />
          </div>
          <div className="metric-card-value">₹{avgOrderValue}</div>
          <div className="metric-card-subtitle">
            Top promo: FIRST10
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="admin-table-container">
        <div className="table-toolbar-row">
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Recent Customer Orders</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Instant order tracking and delivery status</p>
          </div>
          <button 
            className="btn-secondary"
            onClick={() => setAdminTab('orders')}
          >
            View All Orders →
          </button>
        </div>

        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600 }}>#{order.orderNumber}</td>
                <td>
                  <div>{order.customerName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{order.customerEmail}</div>
                </td>
                <td>
                  {order.items.map(it => it.product.title).join(', ')}
                </td>
                <td style={{ fontWeight: 700 }}>₹{order.total}</td>
                <td>
                  <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: 600, background: '#ECE7E0', padding: '2px 6px', borderRadius: '4px' }}>
                    {order.paymentMethod}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {new Date(order.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
