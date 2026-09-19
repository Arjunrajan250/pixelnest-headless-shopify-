import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, Trash2, Plus, Minus, Tag, Check, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/currency';

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
    setIsCartOpen,
    currency
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
      setCouponMessage('Coupon applied successfully (10% off)!');
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
          <button type="button" className="icon-btn-pill" onClick={handleBack} title="Back">
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
            Explore our curated collection of smart everyday tools and ergonomic gear.
          </p>
          <button 
            type="button"
            className="primary-pill-btn"
            style={{ maxWidth: '240px', margin: '0 auto' }}
            onClick={() => {
              if (onClose) onClose();
              setActiveTab('planners');
            }}
          >
            Explore Everyday Gear
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-view-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="cart-header-bar">
        <button type="button" className="icon-btn-pill" onClick={handleBack} title="Back">
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700 }}>
          Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
        </span>
        <button 
          type="button"
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
          <div key={`${item.product.id}-${item.selectedVariant?.id || 'default'}`} className="cart-item-card">
            <div className="cart-item-thumb">
              <img src={item.product.imageUrl} alt={item.product.title} />
            </div>

            <div className="cart-item-info">
              <h4 className="cart-item-title">{item.product.title}</h4>
              {item.selectedVariant && (
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Option: {item.selectedVariant.title}
                </div>
              )}
              <div className="cart-item-price">{formatPrice(item.product.price, currency)}</div>
            </div>

            <div className="cart-stepper">
              <button 
                type="button"
                className="stepper-btn"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                title="Decrease"
              >
                <Minus size={12} />
              </button>
              <span className="stepper-val">{item.quantity}</span>
              <button 
                type="button"
                className="stepper-btn"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                title="Increase"
              >
                <Plus size={12} />
              </button>
            </div>

            <button 
              type="button"
              className="cart-item-delete"
              onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
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
            <button type="button" onClick={removeCoupon} style={{ textDecoration: 'underline', color: '#C24134', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
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
          <span>{formatPrice(subtotal, currency)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="summary-row discount">
            <span>Discount ({appliedCoupon || 'Special'})</span>
            <span>- {formatPrice(discountAmount, currency)}</span>
          </div>
        )}

        <div className="summary-row total">
          <span>Total</span>
          <span>{formatPrice(total, currency)}</span>
        </div>

        <button 
          type="button"
          className="primary-pill-btn"
          onClick={handleCheckout}
        >
          Proceed to Checkout <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
