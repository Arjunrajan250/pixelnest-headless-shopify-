import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { Search, Eye, Download, CheckCircle2, Clock, XCircle, X, Printer, Send } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, triggerDownload } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(i => i.product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    setActionNotice(`Order status updated to "${newStatus}"`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleResendDownload = (email: string) => {
    setActionNotice(`Digital download bundle link resent to ${email}`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="admin-orders-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700 }}>Order Tracking & Fulfillment</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Track customer orders, delivery states, and digital asset fulfillment.</p>
        </div>
      </div>

      {actionNotice && (
        <div style={{
          marginBottom: '16px',
          padding: '10px 16px',
          background: '#E5F3EB',
          color: '#266A42',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #BFE3CD'
        }}>
          <CheckCircle2 size={16} />
          <span>{actionNotice}</span>
        </div>
      )}

      <div className="admin-table-container">
        <div className="table-toolbar-row">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="text"
              placeholder="Search by order #, email, product..."
              className="table-search-input"
              style={{ width: '280px' }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />

            <select 
              className="form-control"
              style={{ width: 'auto', padding: '7px 12px' }}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>

        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items & Digital Assets</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status Action</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 700 }}>#{order.orderNumber}</td>
                <td>
                  <div>{order.customerName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{order.customerEmail}</div>
                </td>
                <td>
                  <div style={{ maxWidth: '240px' }}>
                    {order.items.map((it, i) => (
                      <div key={i} style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        • {it.product.title} (x{it.quantity})
                      </div>
                    ))}
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>
                  <div>₹{order.total}</div>
                  {order.discount > 0 && (
                    <div style={{ fontSize: '10px', color: '#2F7A4C' }}>
                      -{order.discount} ({order.discountCode || 'Promo'})
                    </div>
                  )}
                </td>
                <td>
                  <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: 600, background: '#ECE7E0', padding: '3px 8px', borderRadius: '4px' }}>
                    {order.paymentMethod}
                  </span>
                </td>
                <td>
                  <select
                    className="form-control"
                    style={{ padding: '4px 8px', fontSize: '12px', width: 'auto' }}
                    value={order.status}
                    onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="icon-btn-pill"
                    style={{ width: '32px', height: '32px' }}
                    title="View Full Order Details"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Order #{selectedOrder.orderNumber}</h2>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Placed on {new Date(selectedOrder.date).toLocaleString()}
                </span>
              </div>
              <button className="icon-btn-pill" onClick={() => setSelectedOrder(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="form-grid-2" style={{ marginBottom: '16px' }}>
              <div style={{ background: '#FAF7F2', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>CUSTOMER</div>
                <div style={{ fontWeight: 600 }}>{selectedOrder.customerName}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{selectedOrder.customerEmail}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {selectedOrder.shippingAddress || 'Digital Delivery (Email)'}
                </div>
              </div>

              <div style={{ background: '#FAF7F2', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>PAYMENT & STATUS</div>
                <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>
                  Method: {selectedOrder.paymentMethod}
                </div>
                <div style={{ marginTop: '6px' }}>
                  <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>PURCHASED DIGITAL ASSETS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#F8F5F0', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={it.product.imageUrl} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{it.product.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          Qty: {it.quantity} • File: {it.product.downloadFileName || 'Bundle.pdf'}
                        </div>
                      </div>
                    </div>
                    <button 
                      className="order-download-pill-btn"
                      onClick={() => triggerDownload(it.product)}
                      title="Test file download"
                    >
                      <Download size={12} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#FAF7F2', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#2F7A4C', marginBottom: '4px' }}>
                  <span>Discount ({selectedOrder.discountCode || 'Promo'})</span>
                  <span>- ₹{selectedOrder.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, borderTop: '1px solid var(--border-light)', paddingTop: '6px', marginTop: '4px' }}>
                <span>Total Paid</span>
                <span>₹{selectedOrder.total}</span>
              </div>
            </div>

            <div className="form-actions">
              <button 
                className="btn-secondary"
                onClick={() => handleResendDownload(selectedOrder.customerEmail)}
              >
                <Send size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Resend Download Link
              </button>
              <button 
                className="btn-primary"
                onClick={() => setSelectedOrder(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
