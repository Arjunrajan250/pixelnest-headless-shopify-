import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Star, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ShoppingBag,
  Check,
  Zap,
  Box,
  ChevronDown
} from 'lucide-react';
import { ProductVariant } from '../../types';
import { formatPrice } from '../../utils/currency';
import { ProductReviewsSection } from './ProductReviewsSection';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    buyNow,
    wishlist, 
    toggleWishlist, 
    setActiveTab, 
    setIsCartOpen,
    currency,
    setActiveTrustPolicy
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('specs');

  useEffect(() => {
    setActiveImageIndex(0);
    if (selectedProduct?.variants && selectedProduct.variants.length > 0) {
      setSelectedVariant(selectedProduct.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
  }, [selectedProduct?.id]);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const images = selectedProduct.gallery && selectedProduct.gallery.length > 0
    ? selectedProduct.gallery
    : [selectedProduct.imageUrl];

  const discountPercent = selectedProduct.compareAtPrice && selectedProduct.compareAtPrice > selectedProduct.price
    ? Math.round(((selectedProduct.compareAtPrice - selectedProduct.price) / selectedProduct.compareAtPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, 1, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setIsCartOpen(true);
    }, 500);
  };

  const handleBuyNow = () => {
    buyNow(selectedProduct, selectedVariant);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.title,
        text: selectedProduct.subtitle,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  // Compute estimated delivery window
  const deliveryStart = new Date();
  deliveryStart.setDate(deliveryStart.getDate() + 5);
  const deliveryEnd = new Date();
  deliveryEnd.setDate(deliveryEnd.getDate() + 9);
  const deliveryWindow = `${deliveryStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${deliveryEnd.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;

  return (
    <div className="product-detail-view" style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 20px 80px 20px' }}>
      {/* Top Navigation */}
      <div className="detail-nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          type="button"
          className="icon-btn-pill" 
          onClick={() => {
            setSelectedProduct(null);
            setActiveTab('home');
          }}
          title="Back to Storefront"
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            type="button"
            className="icon-btn-pill"
            onClick={handleShare}
            title="Share"
          >
            <Share2 size={18} />
          </button>
          <button 
            type="button"
            className="icon-btn-pill"
            onClick={() => toggleWishlist(selectedProduct.id)}
            title="Wishlist"
          >
            <Heart 
              size={18} 
              style={{ 
                fill: isWishlisted ? '#C84B4B' : 'transparent', 
                color: isWishlisted ? '#C84B4B' : 'var(--text-main)' 
              }} 
            />
          </button>
        </div>
      </div>

      {/* Main Responsive Grid: Media Column & Info Column */}
      <div className="detail-main-grid">
        
        {/* Media Column */}
        <div className="detail-media-column">
          <div className="detail-gallery-main">
            <img 
              src={images[activeImageIndex] || selectedProduct.imageUrl} 
              alt={selectedProduct.title}
              className="detail-main-img"
            />
            {selectedProduct.category && (
              <span className="detail-category-badge">{selectedProduct.category}</span>
            )}
            {selectedProduct.shippingSuitability && (
              <span style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(36, 32, 29, 0.75)',
                backdropFilter: 'blur(4px)',
                color: '#FAF7F2',
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600
              }}>
                {selectedProduct.shippingSuitability}
              </span>
            )}
            {images.length > 1 && (
              <span className="detail-gallery-counter">
                {activeImageIndex + 1} / {images.length}
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="detail-thumbnails-row">
              {images.map((imgUrl, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`detail-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  title={`View image ${idx + 1}`}
                >
                  <img src={imgUrl} alt={`${selectedProduct.title} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="detail-info-column">
          <div className="detail-info-content">
            <h1 className="detail-title">{selectedProduct.title}</h1>
            {selectedProduct.subtitle && (
              <p className="detail-subtitle">{selectedProduct.subtitle}</p>
            )}

            {/* Rating */}
            <div className="detail-rating-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '10px 0' }}>
              <div style={{ display: 'flex', color: '#D97706' }}>
                <Star size={14} fill="#D97706" />
              </div>
              <span style={{ fontSize: '13px' }}>
                <strong>{selectedProduct.rating}</strong> ({selectedProduct.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price */}
            <div className="detail-price-row" style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '14px 0' }}>
              <span className="detail-price-main" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)' }}>
                {formatPrice(selectedProduct.price, currency)}
              </span>
              {selectedProduct.compareAtPrice && selectedProduct.compareAtPrice > selectedProduct.price && (
                <span className="detail-price-struck" style={{ fontSize: '16px', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                  {formatPrice(selectedProduct.compareAtPrice, currency)}
                </span>
              )}
              {discountPercent && (
                <span className="detail-discount-badge" style={{ background: '#F2DCD6', color: '#964736', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Variants Selector */}
            {selectedProduct.variants && selectedProduct.variants.length > 0 && (
              <div style={{ margin: '18px 0', padding: '14px', background: 'var(--bg-surface-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Option: <span style={{ color: 'var(--text-main)' }}>{selectedVariant?.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedProduct.variants.map(variant => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        type="button"
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 12px',
                          borderRadius: 'var(--radius-xs)',
                          border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                          background: isSelected ? 'var(--bg-surface)' : 'transparent',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '12px',
                          color: 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        {variant.colorHex && (
                          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: variant.colorHex, border: '1px solid rgba(0,0,0,0.1)' }} />
                        )}
                        <span>{variant.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delivery Estimate Box */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px 14px',
              background: 'var(--bg-surface-soft)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              margin: '16px 0'
            }}>
              <Truck size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '12px' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  Estimated Arrival: <span style={{ color: 'var(--color-primary)' }}>{deliveryWindow}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {selectedProduct.shippingInfo || 'Tracked International Express Delivery with DHL / FedEx'}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '20px 0' }}>
              <button 
                type="button"
                className="primary-pill-btn"
                onClick={handleAddToCart}
                disabled={addedAnimation}
                style={{ padding: '12px', fontSize: '13px' }}
              >
                {addedAnimation ? (
                  <><Check size={16} /> Added!</>
                ) : (
                  <><ShoppingBag size={16} /> Add to Cart</>
                )}
              </button>

              <button 
                type="button"
                onClick={handleBuyNow}
                style={{
                  background: 'var(--text-main)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '12px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Zap size={15} fill="#FFFFFF" /> Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="detail-features-list">
              {selectedProduct.features.map((feat, i) => (
                <div key={i} className="detail-feature-item">
                  <CheckCircle2 size={16} className="detail-feature-icon" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* What's in the Box */}
            {selectedProduct.whatsInTheBox && selectedProduct.whatsInTheBox.length > 0 && (
              <div style={{ margin: '20px 0', padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                  <Box size={16} style={{ color: 'var(--color-primary)' }} />
                  <span>What's In The Box</span>
                </div>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {selectedProduct.whatsInTheBox.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accordions: Specs, Shipping, Returns, Warranty */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Specs Accordion */}
              {selectedProduct.specs && (
                <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
                  <button 
                    type="button"
                    onClick={() => setActiveAccordion(activeAccordion === 'specs' ? null : 'specs')}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-surface-soft)', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                  >
                    <span>Technical Specifications</span>
                    <ChevronDown size={16} style={{ transform: activeAccordion === 'specs' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {activeAccordion === 'specs' && (
                    <div style={{ padding: '12px 14px', background: 'var(--bg-surface)', fontSize: '12px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          {Object.entries(selectedProduct.specs).map(([k, v]) => (
                            <tr key={k} style={{ borderBottom: '1px solid var(--border-light)' }}>
                              <td style={{ padding: '6px 0', color: 'var(--text-secondary)', width: '40%' }}>{k}</td>
                              <td style={{ padding: '6px 0', fontWeight: 600, color: 'var(--text-main)' }}>{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Shipping & Return Accordion */}
              <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
                <button 
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-surface-soft)', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                >
                  <span>Tracked Shipping & 30-Day Returns</span>
                  <ChevronDown size={16} style={{ transform: activeAccordion === 'shipping' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {activeAccordion === 'shipping' && (
                  <div style={{ padding: '12px 14px', background: 'var(--bg-surface)', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                      Dispatched with live tracking within 24-48 hours. Eligible for 30-day return window from delivery date.
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setActiveTrustPolicy('shipping')}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: '12px', padding: 0, cursor: 'pointer' }}
                    >
                      Read full international shipping terms →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: '24px' }}>
              <h3 className="detail-section-title">About this product</h3>
              <p className="detail-desc-text" style={{ lineHeight: 1.7 }}>{selectedProduct.description}</p>
            </div>

            {/* Reviews Section */}
            <ProductReviewsSection product={selectedProduct} />

          </div>
        </div>
      </div>
    </div>
  );
};
