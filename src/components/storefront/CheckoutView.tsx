import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  Globe, 
  ShoppingBag, 
  ShieldCheck 
} from 'lucide-react';
import { PaymentMethod } from '../../types';
import { formatPrice } from '../../utils/currency';
import { createShopifyCheckout } from '../../services/shopify';

export const CheckoutView: React.FC = () => {
  const { cart, discountAmount, createOrder, setActiveTab, shopifyConfig, customer, currency } = useStore();
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [customerEmail, setCustomerEmail] = useState<string>(customer?.email || '');
  const [customerName, setCustomerName] = useState<string>(
    customer ? `${customer.firstName} ${customer.lastName}` : ''
  );
  
  const defaultAddr = customer?.addresses.find(a => a.isDefault) || customer?.addresses[0];
  const [address, setAddress] = useState<string>(
    defaultAddr ? `${defaultAddr.street}, ${defaultAddr.city}, ${defaultAddr.state} ${defaultAddr.postalCode}, ${defaultAddr.country}` : ''
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string>('');
  const [shopifyRedirecting, setShopifyRedirecting] = useState<boolean>(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayNow = async () => {
    if (!customerEmail.trim() || !customerName.trim() || !address.trim()) {
      alert('Please fill in your recipient name, email, and shipping address.');
      return;
    }

    setIsProcessing(true);

    // If Shopify checkout is selected and configured
    if (selectedMethod === 'shopify' && shopifyConfig.isConnected) {
      setShopifyRedirecting(true);
      const items = cart.map(it => ({
        variantId: it.product.shopifyId || it.product.id,
        quantity: it.quantity
      }));
      const checkoutRes = await createShopifyCheckout(shopifyConfig, items);
      if (checkoutRes.success && checkoutRes.webUrl) {
        window.location.href = checkoutRes.webUrl;
        return;
      }
    }

    // Process order
    setTimeout(() => {
      const order = createOrder({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        shippingAddress: address.trim(),
        paymentMethod: selectedMethod
      });
      setCreatedOrderNumber(order.orderNumber);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="checkout-view" style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '520px', margin: '0 auto' }}>
        <CheckCircle2 size={56} style={{ color: '#2F7A4C', margin: '0 auto 16px auto' }} />
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', marginBottom: '8px' }}>
          Order Confirmed!
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Thank you, <strong>{customerName}</strong>. Your order <strong>#{createdOrderNumber}</strong> has been received.
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
          A confirmation receipt with your live tracking link has been sent to <strong>{customerEmail}</strong>.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            type="button" 
            className="primary-pill-btn"
            onClick={() => setActiveTab('orders')}
            style={{ padding: '10px 24px', fontSize: '13px' }}
          >
            View My Orders & Tracking
          </button>
          <button 
            type="button" 
            className="btn-admin-secondary"
            onClick={() => setActiveTab('home')}
            style={{ padding: '10px 20px', fontSize: '13px' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-view" style={{ maxWidth: '680px', margin: '0 auto', padding: '16px 20px 80px 20px' }}>
      <div className="storefront-header" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          type="button"
          className="icon-btn-pill"
          onClick={() => setActiveTab('cart')}
          title="Back to cart"
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700 }}>
          Secure Checkout
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#2F7A4C', fontWeight: 600 }}>
          <Lock size={12} /> 256-Bit SSL
        </div>
      </div>

      {/* Recipient & Shipping Section */}
      <div className="checkout-section-box" style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
        <div className="checkout-label" style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Shipping Address & Contact
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Recipient Name *</label>
              <input 
                type="text" 
                required 
                placeholder="Full Name"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Email Address *</label>
              <input 
                type="email" 
                required 
                placeholder="name@example.com"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Delivery Address *</label>
            <input 
              type="text" 
              required 
              placeholder="Street, Suite/Apartment, City, State/Province, Postal Code, Country"
              value={address}
              onChange={e => setAddress(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="checkout-section-box" style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
        <div className="checkout-label" style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Payment Method
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Card */}
          <div 
            className={`payment-method-card ${selectedMethod === 'card' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('card')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: selectedMethod === 'card' ? '2px solid var(--color-primary)' : '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', cursor: 'pointer', background: selectedMethod === 'card' ? 'var(--bg-surface-soft)' : 'transparent' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CreditCard size={18} style={{ color: 'var(--color-primary)' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Credit / Debit Card</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Visa, Mastercard, American Express, Discover</div>
              </div>
            </div>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: selectedMethod === 'card' ? 'var(--color-primary)' : 'transparent' }} />
          </div>

          {/* PayPal */}
          <div 
            className={`payment-method-card ${selectedMethod === 'paypal' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('paypal')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: selectedMethod === 'paypal' ? '2px solid var(--color-primary)' : '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', cursor: 'pointer', background: selectedMethod === 'paypal' ? 'var(--bg-surface-soft)' : 'transparent' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={18} style={{ color: 'var(--color-primary)' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>PayPal Express</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>International Buyer Protection</div>
              </div>
            </div>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: selectedMethod === 'paypal' ? 'var(--color-primary)' : 'transparent' }} />
          </div>

          {/* Shopify Headless Checkout */}
          <div 
            className={`payment-method-card ${selectedMethod === 'shopify' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('shopify')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: selectedMethod === 'shopify' ? '2px solid var(--color-primary)' : '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', cursor: 'pointer', background: selectedMethod === 'shopify' ? 'var(--bg-surface-soft)' : 'transparent' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={18} style={{ color: 'var(--color-primary)' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Shopify Hosted Checkout</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Shop Pay, Apple Pay, Google Pay via Storefront API</div>
              </div>
            </div>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: selectedMethod === 'shopify' ? 'var(--color-primary)' : 'transparent' }} />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="checkout-section-box" style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginBottom: '20px' }}>
        <div className="checkout-label" style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Order Items ({totalItemsCount})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {cart.map(item => (
            <div key={`${item.product.id}-${item.selectedVariant?.id || 'default'}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span>{item.quantity}x {item.product.title} {item.selectedVariant ? `(${item.selectedVariant.title})` : ''}</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(item.product.price * item.quantity, currency)}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
          {discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2F7A4C' }}>
              <span>Promo Discount</span>
              <span>- {formatPrice(discountAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tracked Shipping</span>
            <span style={{ color: '#2F7A4C', fontWeight: 600 }}>Free Included</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700, marginTop: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
            <span>Total</span>
            <span>{formatPrice(total, currency)}</span>
          </div>
        </div>
      </div>

      <button 
        type="button"
        className="primary-pill-btn"
        onClick={handlePayNow}
        disabled={isProcessing}
        style={{ width: '100%', padding: '14px', fontSize: '14px' }}
      >
        {shopifyRedirecting ? 'Redirecting to Shopify Checkout...' : isProcessing ? 'Processing Secure Payment...' : `Complete Order • ${formatPrice(total, currency)}`}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px', fontSize: '11px', color: 'var(--text-muted)' }}>
        <ShieldCheck size={14} style={{ color: '#2F7A4C' }} />
        <span>30-Day Money-Back Satisfaction Guarantee • 256-Bit SSL Encrypted</span>
      </div>
    </div>
  );
};
