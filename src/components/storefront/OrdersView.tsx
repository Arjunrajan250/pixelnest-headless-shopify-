import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, CheckCircle2, Clock, XCircle, Truck, FileText, ShoppingBag, LogIn } from 'lucide-react';
import { OrderStatus } from '../../types';
import { formatPrice } from '../../utils/currency';

export const OrdersView: React.FC = () => {
  const { 
    orders, 
    customer, 
    currency, 
    setActiveTab, 
    setIsAuthModalOpen, 
    setActiveTrustPolicy, 
    triggerDownload 
  } = useStore();
  const [activeFilter, setActiveFilter] = useState<'All' | OrderStatus>('All');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Filter orders for authenticated customer or guest orders
  const customerOrders = customer
    ? orders.filter(o => !o.customerEmail || o.customerEmail.toLowerCase() === customer.email.toLowerCase())
    : orders;

  const filteredOrders = customerOrders.filter(order => {
    if (activeFilter === 'All') return true;
    return order.status === activeFilter;
  });

  const handleDownload = (orderNumber: string, productTitle: string, item: any) => {
    triggerDownload(item.product);
    setDownloadToast(`Downloading invoice & warranty certificate for "${productTitle}" (${orderNumber})...`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  return (
    <div className="orders-screen">
      <div className="storefront-header">
        <button 
          className="icon-btn-pill"
          onClick={() => setActiveTab('home')}
          title="Back to home"
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700 }}>
          Order History
        </span>
        <div style={{ width: 40 }} />
      </div>

      {!customer && (
        <div style={{
          margin: '12px 20px',
          padding: '12px 16px',
          background: 'var(--color-sand)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '13px'
        }}>
          <div>
            <strong>Have an account?</strong> Sign in to sync your verified orders and real-time package tracking.
          </div>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="btn-primary"
            style={{ padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LogIn size={13} /> Sign In
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="orders-tabs-row">
        {(['All', 'Completed', 'Processing', 'Cancelled'] as const).map(tab => (
          <button
            key={tab}
            className={`orders-tab-pill ${activeFilter === tab ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {downloadToast && (
        <div style={{
          margin: '10px 20px',
          padding: '10px 14px',
          background: '#E5F3EB',
          color: '#266A42',
          borderRadius: 'var(--radius-sm)',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #BFE3CD'
        }}>
          <CheckCircle2 size={16} />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Order Cards List */}
      <div className="order-cards-list">
        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'var(--color-sand)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 16px auto',
              color: 'var(--color-primary)'
            }}>
              <ShoppingBag size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)' }}>
              No Orders Found
            </h3>
            <p style={{ fontSize: '13px', maxWidth: '340px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
              You don't have any orders {activeFilter !== 'All' ? `with status "${activeFilter}"` : 'yet'}. Check out our collection of smart, minimal desk and lifestyle products.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button 
                className="btn-primary" 
                onClick={() => setActiveTab('planners')}
                style={{ padding: '8px 20px', fontSize: '13px' }}
              >
                Browse All Products
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => setActiveTrustPolicy('tracking')}
                style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Truck size={14} /> Track Package
              </button>
            </div>
          </div>
        ) : (
          filteredOrders.map(order => (
            <React.Fragment key={order.id}>
              {order.items.map((item, idx) => (
                <div key={`${order.id}-${idx}`} className="order-card-aesthetic">
                  <div className="order-card-thumb">
                    <img src={item.product.imageUrl} alt={item.product.title} />
                  </div>

                  <div className="order-card-details">
                    <h4 className="order-card-title">{item.product.title}</h4>
                    {item.selectedVariant && (
                      <div style={{ fontSize: '11px', color: 'var(--color-terracotta)', marginBottom: '2px' }}>
                        Option: {item.selectedVariant.title}
                      </div>
                    )}
                    <div className="order-card-price">
                      {formatPrice(item.product.price * item.quantity, currency)}
                      {item.quantity > 1 && (
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '4px', fontWeight: 'normal' }}>
                          ({item.quantity} × {formatPrice(item.product.price, currency)})
                        </span>
                      )}
                    </div>
                    <div className="order-meta-info">Order #{order.orderNumber}</div>
                    <div className="order-meta-info" style={{ color: '#8C857D' }}>
                      {order.deliveryDate || `Ordered on ${new Date(order.date).toLocaleDateString()}`}
                    </div>
                    {order.trackingNumber && (
                      <button 
                        onClick={() => setActiveTrustPolicy('tracking')}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: 'var(--color-primary)',
                          fontSize: '11px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          marginTop: '4px',
                          textDecoration: 'underline'
                        }}
                      >
                        <Truck size={12} /> {order.trackingCarrier || 'Track'}: {order.trackingNumber}
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    {order.status === 'Completed' ? (
                      <button 
                        className="order-download-pill-btn"
                        onClick={() => handleDownload(order.orderNumber, item.product.title, item)}
                        title="Download Invoice and Warranty Registration"
                      >
                        <FileText size={12} />
                        Invoice & Warranty
                      </button>
                    ) : order.status === 'Processing' ? (
                      <span className="status-badge processing">
                        <Clock size={10} /> Processing
                      </span>
                    ) : (
                      <span className="status-badge cancelled">
                        <XCircle size={10} /> Cancelled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};
