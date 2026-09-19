import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShieldCheck, Truck, RefreshCw, Mail, HelpCircle, FileText, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { TrustPolicyType } from '../../types';

export const TrustPolicyModal: React.FC = () => {
  const { activeTrustPolicy, setActiveTrustPolicy, orders } = useStore();
  
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  if (!activeTrustPolicy) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    const found = orders.find(o => o.orderNumber.toLowerCase() === trackInput.trim().toLowerCase());
    if (found) {
      setTrackResult(`Order ${found.orderNumber} Status: ${found.status}. ${found.deliveryDate} via ${found.trackingCarrier || 'Tracked Global Courier'}`);
    } else {
      setTrackResult(`No order matching "${trackInput.trim()}". If you just placed your order via Shopify, confirmation and tracking are emailed immediately.`);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setActiveTrustPolicy(null);
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveTrustPolicy(null)}>
      <div 
        className="modal-card trust-policy-modal" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '640px', maxHeight: '88vh', overflowY: 'auto', padding: '28px 26px', borderRadius: 'var(--radius-md)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeTrustPolicy === 'shipping' && <Truck size={22} style={{ color: 'var(--color-primary)' }} />}
            {activeTrustPolicy === 'returns' && <RefreshCw size={22} style={{ color: 'var(--color-primary)' }} />}
            {activeTrustPolicy === 'about' && <ShieldCheck size={22} style={{ color: 'var(--color-primary)' }} />}
            {activeTrustPolicy === 'contact' && <Mail size={22} style={{ color: 'var(--color-primary)' }} />}
            {activeTrustPolicy === 'faq' && <HelpCircle size={22} style={{ color: 'var(--color-primary)' }} />}
            {activeTrustPolicy === 'tracking' && <Search size={22} style={{ color: 'var(--color-primary)' }} />}
            {(activeTrustPolicy === 'privacy' || activeTrustPolicy === 'terms') && <FileText size={22} style={{ color: 'var(--color-primary)' }} />}
            
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', margin: 0 }}>
              {activeTrustPolicy === 'about' && 'About PixelNest'}
              {activeTrustPolicy === 'contact' && 'Contact Customer Support'}
              {activeTrustPolicy === 'shipping' && 'International Shipping Policy'}
              {activeTrustPolicy === 'returns' && '30-Day Returns & Refund Policy'}
              {activeTrustPolicy === 'privacy' && 'Privacy Policy & Data Security'}
              {activeTrustPolicy === 'terms' && 'Terms of Service'}
              {activeTrustPolicy === 'faq' && 'Frequently Asked Questions (FAQ)'}
              {activeTrustPolicy === 'tracking' && 'Track Your Shipment'}
            </h2>
          </div>

          <button 
            type="button" 
            className="icon-btn-pill" 
            onClick={() => setActiveTrustPolicy(null)}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {activeTrustPolicy === 'about' && (
            <div>
              <p>
                <strong>PixelNest</strong> was founded with a singular purpose: to curate smart, high-utility products and ergonomic essentials that elevate modern everyday life.
              </p>
              <p>
                We bridge high-performance hardware engineering with refined aesthetics. From whisper-quiet mechanical keyboards and ergonomic peripherals to next-generation GaN fast charging and calming ambient workspace lighting, each piece in our catalog is rigorously tested for longevity, ergonomics, and daily reliability.
              </p>
              <div style={{ background: 'var(--bg-surface-soft)', padding: '16px', borderRadius: 'var(--radius-sm)', margin: '16px 0', border: '1px solid var(--border-light)' }}>
                <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-main)', fontSize: '14px' }}>Our Core Pillars</h4>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li><strong>Functional Ergonomics:</strong> Thoughtful tools that reduce physical fatigue and maximize comfort.</li>
                  <li><strong>Sustainable Value:</strong> Honest pricing backed by verifiable specifications rather than inflated claims.</li>
                  <li><strong>Transparent Commerce:</strong> Direct Shopify headless infrastructure with global order tracking and clear warranty boundaries.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTrustPolicy === 'shipping' && (
            <div>
              <p>
                We deliver worldwide via fully tracked express and standard parcel services (including DHL Express, FedEx, and national postal services).
              </p>
              <h4 style={{ color: 'var(--text-main)', margin: '14px 0 6px 0', fontSize: '14px' }}>Estimated Delivery Times</h4>
              <ul style={{ paddingLeft: '20px', margin: '0 0 14px 0' }}>
                <li><strong>North America (US & Canada):</strong> 5–9 business days</li>
                <li><strong>Europe & UK:</strong> 5–8 business days</li>
                <li><strong>Australia & New Zealand:</strong> 7–10 business days</li>
                <li><strong>Asia & Rest of World:</strong> 7–14 business days</li>
              </ul>
              <div style={{ background: 'var(--bg-surface-soft)', padding: '14px', borderRadius: 'var(--radius-sm)', margin: '14px 0' }}>
                <strong style={{ color: 'var(--text-main)' }}>Customs, Duties & Taxes:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                  Orders are dispatched with commercial invoices and tracking numbers. For standard parcel items, import duties are typically minimal or included at checkout. Bulky freight items (such as 34" monitors) may be subject to regional VAT/customs upon arrival according to your country's regulations.
                </p>
              </div>
            </div>
          )}

          {activeTrustPolicy === 'returns' && (
            <div>
              <p>
                We stand behind the quality of every product. If you are not completely satisfied with your purchase, you may initiate a return within <strong>30 days</strong> of delivery.
              </p>
              <h4 style={{ color: 'var(--text-main)', margin: '14px 0 6px 0', fontSize: '14px' }}>Return Conditions</h4>
              <ul style={{ paddingLeft: '20px', margin: '0 0 14px 0' }}>
                <li>Items must be in original condition with all original packaging, cables, and manuals included.</li>
                <li>Hardware defective upon arrival will be replaced immediately with prepaid courier shipping.</li>
                <li>Refunds are processed to your original payment method within 3–5 business days following return inspection.</li>
              </ul>
              <p>
                To initiate an authorized return, please contact our support team at <a href="mailto:support@pixelnest.io" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>support@pixelnest.io</a> with your order number.
              </p>
            </div>
          )}

          {activeTrustPolicy === 'contact' && (
            <div>
              <p>
                Have a question regarding your order, product specifications, or international shipping? Our dedicated hardware support team is available Monday through Saturday.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '14px 0' }}>
                <div style={{ background: 'var(--bg-surface-soft)', padding: '12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Inquiries</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>support@pixelnest.io</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Typical response: under 4 hours</div>
                </div>
                <div style={{ background: 'var(--bg-surface-soft)', padding: '12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Headquarters</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>PixelNest Commerce</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Global Headless Fulfillment</div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <input 
                  type="text" 
                  required 
                  placeholder="Your Name" 
                  style={{ padding: '9px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }} 
                />
                <input 
                  type="email" 
                  required 
                  placeholder="Your Email" 
                  style={{ padding: '9px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }} 
                />
                <textarea 
                  rows={3} 
                  required 
                  placeholder="How can we assist you?" 
                  style={{ padding: '9px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }} 
                />
                <button type="submit" className="primary-pill-btn" style={{ padding: '10px', fontSize: '12px' }}>
                  {contactSubmitted ? 'Message Sent Successfully!' : 'Send Message to Support'}
                </button>
              </form>
            </div>
          )}

          {activeTrustPolicy === 'tracking' && (
            <div>
              <p>
                Enter your PixelNest order number (e.g., <code>PN-24876</code>) to view live dispatch status and tracking credentials.
              </p>
              <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '8px', margin: '14px 0' }}>
                <input 
                  type="text" 
                  required
                  placeholder="Order Number (e.g. PN-24876)"
                  value={trackInput}
                  onChange={e => setTrackInput(e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '13px' }}
                />
                <button type="submit" className="primary-pill-btn" style={{ padding: '10px 18px', fontSize: '13px' }}>
                  Track
                </button>
              </form>

              {trackResult && (
                <div style={{ padding: '14px', background: 'var(--bg-surface-soft)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', display: 'flex', gap: '10px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>Tracking Information</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{trackResult}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTrustPolicy === 'faq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Q: How does checkout work?</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  A: Our storefront connects directly to Shopify's secure PCI-compliant checkout. Your payment details are processed with bank-grade 256-bit encryption through Shopify Payments, Apple Pay, Google Pay, or PayPal.
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Q: What warranty applies to my hardware?</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  A: Peripherals and fast chargers carry a 1-year limited manufacturer warranty. Monitors carry a 2-year limited panel warranty. Accessories carry a standard 30-day quality guarantee.
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Q: Can I change or cancel my order?</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  A: Because we dispatch orders swiftly, please contact support@pixelnest.io within 2 hours of purchase if you need to modify your shipping address or items.
                </p>
              </div>
            </div>
          )}

          {(activeTrustPolicy === 'privacy' || activeTrustPolicy === 'terms') && (
            <div>
              <p>
                At PixelNest, we respect your privacy and data integrity. We adhere to international GDPR and CCPA privacy standards. We only collect essential customer information (name, shipping address, contact details) required to process orders, fulfill shipments, and provide customer service.
              </p>
              <p>
                We never sell or distribute your personal details to third-party marketing networks. All payment card numbers are tokenized directly by certified PCI-DSS Level 1 payment processors.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
