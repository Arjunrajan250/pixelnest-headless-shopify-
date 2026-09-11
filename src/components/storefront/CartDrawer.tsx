import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, Trash2, Plus, Minus, Tag, Check, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC<{ isModal?: boolean; onClose?: () => void }> = ({ isModal, onClose }) => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    discountAmount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    setActiveTab,
    setIsCartOpen 
  } = useStore();

  const [couponCode, setCouponCode] = useState<string>('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const ok = applyCoupon(couponCode);
    if (ok) {
      setCouponMessage('Coupon applied successfully!');
      setCouponCode('');
    } else {
      setCouponMessage('Invalid code. Try "FIRST10"');
    }
  };

  const handleCheckout = () => {
    if (isModal && onClose) {
      onClose();
    }
    setIsCartOpen(false);
    setActiveTab('checkout');
  };

  const handleBack = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      setActiveTab('home');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-view-wrapper" style={{ padding: '24px 20px', textAlign: 'center' }}>
        <div className="cart-header-bar">
          <button className="icon-btn-pill" onClick={handleBack} title="Back">
            <ArrowLeft size={18} />
          </button>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700 }}>
            Your Cart
          </span>
          <div style={{ width: 40 }} />
        </div>

        <div style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '8px' }}>Your cart is empty</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Discover our collection of digital planners and creative templates.
          </p>
          <button 
            className="primary-pill-btn"
            style={{ maxWidth: '240px', margin: '0 auto' }}
            onClick={() => {
              if (onClose) onClose();
              setActiveTab('planners');
            }}
          >
            Explore Planners
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-view-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="cart-header-bar">
        <button className="icon-btn-pill" onClick={handleBack} title="Back">
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700 }}>
          Your Cart
        </span>
        <button 
          className="icon-btn-pill" 
          onClick={clearCart} 
          title="Clear Cart"
          style={{ color: '#A39D95' }}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="cart-items-list custom-scrollbar">
        {cart.map(item => (
          <div key={item.product.id} className="cart-item-card">
            <div className="cart-item-thumb">
              <img src={item.product.imageUrl} alt={item.product.title} />
            </div>

            <div className="cart-item-info">
              <h4 className="cart-item-title">{item.product.title}</h4>
              <div className="cart-item-price">₹{item.product.price}</div>
            </div>

            <div className="cart-stepper">
              <button 
                className="stepper-btn"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                title="Decrease"
              >
                <Minus size={12} />
              </button>
              <span className="stepper-qty">{item.quantity}</span>
              <button 
                className="stepper-btn"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                title="Increase"
              >
                <Plus size={12} />
              </button>
            </div>

            <button 
              className="cart-item-delete"
              onClick={() => removeFromCart(item.product.id)}
              title="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary-box">
        {/* Coupon Section */}
        <form onSubmit={handleApplyCoupon} className="coupon-row">
          <input 
            type="text" 
            placeholder="Promo code (e.g. FIRST10)" 
            className="coupon-input"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
          />
          <button type="submit" className="coupon-btn">
            Apply
          </button>
        </form>

        {appliedCoupon && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#2F7A4C', marginBottom: '10px' }}>
            <span><Tag size={12} style={{ display: 'inline', marginRight: '4px' }} /> Coupon <strong>{appliedCoupon}</strong> active</span>
            <button type="button" onClick={removeCoupon} style={{ textDecoration: 'underline', color: '#C24134' }}>Remove</button>
          </div>
        )}

        {couponMessage && (
          <div style={{ fontSize: '11px', color: couponMessage.includes('applied') ? '#2F7A4C' : '#C24134', marginBottom: '8px' }}>
            {couponMessage}
          </div>
        )}

        {/* Breakdown */}
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        {discountAmount > 0 && (
          <div className="summary-row discount">
            <span>Discount ({appliedCoupon || 'Special'})</span>
            <span>- ₹{discountAmount}</span>
          </div>
        )}

        <div className="summary-row total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button 
          className="primary-pill-btn"
          onClick={handleCheckout}
        >
          Proceed to Checkout <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
