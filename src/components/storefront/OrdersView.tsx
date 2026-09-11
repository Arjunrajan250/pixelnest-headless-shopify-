import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, Download, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrdersView: React.FC = () => {
  const { orders, setActiveTab, triggerDownload } = useStore();
  const [activeFilter, setActiveFilter] = useState<'All' | OrderStatus>('All');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'All') return true;
    return order.status === activeFilter;
  });

  const handleDownload = (orderNumber: string, productTitle: string, item: any) => {
    triggerDownload(item.product);
    setDownloadToast(`Downloading "${productTitle}" (${orderNumber})...`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  return (
    <div className="orders-screen">
      <div className="storefront-header">
        <button 
          className="icon-btn-pill"
          onClick={() => setActiveTab('home')}
          title="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700 }}>
          My Orders
        </span>
        <div style={{ width: 40 }} />
      </div>

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
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
            No orders found in this category.
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
                    <div className="order-card-price">₹{item.product.price}</div>
                    <div className="order-meta-info">Order #{order.orderNumber}</div>
                    <div className="order-meta-info" style={{ color: '#8C857D' }}>
                      {order.deliveryDate || `Delivered on ${new Date(order.date).toLocaleDateString()}`}
                    </div>
                  </div>

                  {order.status === 'Completed' ? (
                    <button 
                      className="order-download-pill-btn"
                      onClick={() => handleDownload(order.orderNumber, item.product.title, item)}
                      title="Download digital file"
                    >
                      <Download size={12} />
                      Download
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
              ))}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};
