import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, ChevronRight, Lock, CheckCircle2, CreditCard, Smartphone, Globe, ShoppingBag } from 'lucide-react';
import { PaymentMethod } from '../../types';

export const CheckoutView: React.FC = () => {
  const { cart, discountAmount, createOrder, setActiveTab, shopifyConfig } = useStore();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [customerEmail, setCustomerEmail] = useState<string>('aestheticgirl@gmail.com');
  const [customerName, setCustomerName] = useState<string>('Aesthetic Girl');
  const [address, setAddress] = useState<string>('742 Evergreen Terrace, Studio 4B');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      createOrder({
        customerName,
        customerEmail,
        shippingAddress: address,
        paymentMethod: selectedMethod
      });
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setActiveTab('orders');
      }, 1000);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="checkout-view" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <CheckCircle2 size={56} style={{ color: '#2F7A4C', margin: '0 auto 16px auto' }} />
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: '8px' }}>Payment Successful!</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Your digital planner and files are ready for instant download.
        </p>
        <p style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
          Redirecting to My Orders...
        </p>
      </div>
    );
  }

  return (
    <div className="checkout-view">
      <div className="storefront-header" style={{ margin: '-16px -20px 16px -20px' }}>
        <button 
          className="icon-btn-pill"
          onClick={() => setActiveTab('cart')}
          title="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700 }}>
          Checkout
        </span>
        <div style={{ width: 40 }} />
      </div>

      {/* Shipping / Delivery Info */}
      <div className="checkout-section-box">
        <div className="checkout-label">Digital Delivery & Address</div>
        <div className="shipping-address-pill">
          <div>
            <div style={{ fontWeight: 600 }}>{customerName} • {customerEmail}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{address}</div>
          </div>
          <ChevronRight size={16} style={{ color: '#A39D95' }} />
        </div>
      </div>

      {/* Payment Method */}
      <div className="checkout-section-box">
        <div className="checkout-label">Payment Method</div>

        {/* UPI */}
        <div 
          className={`payment-method-card ${selectedMethod === 'upi' ? 'active' : ''}`}
          onClick={() => setSelectedMethod('upi')}
        >
          <div className="payment-method-label">
            <Smartphone size={18} style={{ color: '#4A5B4F' }} />
            <span>UPI / Google Pay</span>
          </div>
          <div className="payment-radio-circle" />
        </div>

        {/* Card */}
        <div 
          className={`payment-method-card ${selectedMethod === 'card' ? 'active' : ''}`}
          onClick={() => setSelectedMethod('card')}
        >
          <div className="payment-method-label">
            <CreditCard size={18} style={{ color: '#4A5B4F' }} />
            <span>Credit / Debit Card</span>
          </div>
          <div className="payment-radio-circle" />
        </div>

        {/* PayPal */}
        <div 
          className={`payment-method-card ${selectedMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => setSelectedMethod('paypal')}
        >
          <div className="payment-method-label">
            <Globe size={18} style={{ color: '#4A5B4F' }} />
            <span>PayPal</span>
          </div>
          <div className="payment-radio-circle" />
        </div>

        {/* Shopify Headless Checkout */}
        <div 
          className={`payment-method-card ${selectedMethod === 'shopify' ? 'active' : ''}`}
          onClick={() => setSelectedMethod('shopify')}
        >
          <div className="payment-method-label">
            <ShoppingBag size={18} style={{ color: '#4A5B4F' }} />
            <span>Shopify Official Checkout</span>
          </div>
          <div className="payment-radio-circle" />
        </div>
      </div>

      {/* Order Summary */}
      <div className="checkout-section-box" style={{ background: '#F9F6F1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
          <span>Order Summary</span>
          <span>{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, marginTop: '8px', color: 'var(--color-primary)' }}>
          <span>Amount to Pay</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Pay Now Button */}
      <button 
        className="primary-pill-btn"
        style={{ marginTop: '12px' }}
        onClick={handlePayNow}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span>Processing secure payment...</span>
        ) : (
          <>
            <Lock size={16} /> Pay Now • ₹{total}
          </>
        )}
      </button>
    </div>
  );
};
