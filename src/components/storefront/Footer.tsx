import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CurrencySelector } from './CurrencySelector';
import { Sparkles, ShieldCheck, Truck, Lock, ArrowRight, Check, Heart } from 'lucide-react';
import { TrustPolicyType } from '../../types';

export const Footer: React.FC = () => {
  const { setActiveTab, setActiveTrustPolicy, setAppMode } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
  };

  const openPolicy = (policy: TrustPolicyType) => {
    setActiveTrustPolicy(policy);
  };

  return (
    <footer className="storefront-footer" style={{ background: '#24201D', color: '#FAF7F2', marginTop: '48px', paddingTop: '48px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Top Trust Pillars Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          borderBottom: '1px solid #3A3530',
          paddingBottom: '36px',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck size={22} style={{ color: '#82A189', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#FAF7F2' }}>Tracked International Delivery</div>
              <div style={{ fontSize: '11px', color: '#A39D95' }}>Doorstep delivery with real-time tracking</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Lock size={22} style={{ color: '#82A189', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#FAF7F2' }}>256-Bit SSL Secure Checkout</div>
              <div style={{ fontSize: '11px', color: '#A39D95' }}>Shopify PCI-compliant payment gateway</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={22} style={{ color: '#82A189', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#FAF7F2' }}>30-Day Return Guarantee</div>
              <div style={{ fontSize: '11px', color: '#A39D95' }}>Hassle-free satisfaction policy</div>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={18} style={{ color: '#82A189' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.5px' }}>
                PixelNest
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#A39D95', lineHeight: 1.6, marginBottom: '16px' }}>
              Smart products for everyday life. Curated ergonomic tech, precision workspace tools, and modern lifestyle essentials.
            </p>
            <div style={{ marginTop: '12px' }}>
              <CurrencySelector />
            </div>
          </div>

          {/* Col 2: Shop & Categories */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#F4EFEA', marginBottom: '14px', fontWeight: 700 }}>
              Shop Essentials
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <li>
                <button type="button" onClick={() => setActiveTab('planners')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  All Hardware & Gear
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab('categories')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  Peripherals & Keyboards
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab('categories')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  Power & Fast Charging
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab('categories')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  Desk Setup & Lighting
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  Order Status & History
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#F4EFEA', marginBottom: '14px', fontWeight: 700 }}>
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <li>
                <button type="button" onClick={() => openPolicy('shipping')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  International Shipping Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openPolicy('returns')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  30-Day Returns & Refunds
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openPolicy('tracking')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  Track Your Shipment
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openPolicy('faq')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openPolicy('contact')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  Contact Support
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openPolicy('privacy')} style={{ background: 'none', border: 'none', color: '#A39D95', cursor: 'pointer', padding: 0 }}>
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Promotion */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#F4EFEA', marginBottom: '14px', fontWeight: 700 }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: '12px', color: '#A39D95', lineHeight: 1.5, marginBottom: '12px' }}>
              Subscribe for new product drops, ergonomic workspace tips, and 10% off your first order.
            </p>

            {newsletterSuccess ? (
              <div style={{ background: 'rgba(74, 91, 79, 0.4)', padding: '10px 12px', borderRadius: 'var(--radius-xs)', fontSize: '12px', color: '#82A189', border: '1px solid #4A5B4F' }}>
                <Check size={14} style={{ display: 'inline', marginRight: '6px' }} />
                <span>Subscribed! Use promo code <strong>FIRST10</strong> for 10% off at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '6px' }}>
                <input 
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid #3A3530',
                    background: '#1A1816',
                    color: '#FAF7F2',
                    fontSize: '12px'
                  }}
                />
                <button 
                  type="submit"
                  style={{
                    background: '#82A189',
                    color: '#1A1816',
                    border: 'none',
                    borderRadius: 'var(--radius-xs)',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip: Copyright, Merchant Admin & Payment Badges */}
        <div style={{
          borderTop: '1px solid #3A3530',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '11px',
          color: '#746D66'
        }}>
          <div>
            © {new Date().getFullYear()} PixelNest Commerce. Powered by Shopify Headless Storefront API. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#A39D95' }}>Protected Payments: Visa • Mastercard • Amex • Apple Pay • PayPal</span>
            <button 
              type="button" 
              onClick={() => setAppMode('admin')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#554F48',
                cursor: 'pointer',
                fontSize: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Merchant Administration Access"
            >
              <Lock size={10} /> Merchant Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
