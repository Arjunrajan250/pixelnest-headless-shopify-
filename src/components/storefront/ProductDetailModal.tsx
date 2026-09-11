import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Star, 
  Truck, 
  ShieldCheck, 
  PackageCheck, 
  CheckCircle2, 
  ShoppingBag,
  Check
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    setActiveTab, 
    setIsCartOpen 
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Reset active image index when selected product changes
  useEffect(() => {
    setActiveImageIndex(0);
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
    addToCart(selectedProduct, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setIsCartOpen(true);
    }, 600);
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

  return (
    <div className="product-detail-view">
      {/* Top Navigation */}
      <div className="detail-nav-bar">
        <button 
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
            className="icon-btn-pill"
            onClick={handleShare}
            title="Share"
          >
            <Share2 size={18} />
          </button>
          <button 
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
        <div className="detail-media-column">
          {/* Gallery Main */}
          <div className="detail-gallery-main">
            <img 
              src={images[activeImageIndex] || selectedProduct.imageUrl} 
              alt={selectedProduct.title}
              className="detail-main-img"
            />
            {selectedProduct.category && (
              <span className="detail-category-badge">{selectedProduct.category}</span>
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

        <div className="detail-info-column">
          {/* Info Content */}
          <div className="detail-info-content">
            <h1 className="detail-title">{selectedProduct.title}</h1>
        {selectedProduct.subtitle && (
          <p className="detail-subtitle">{selectedProduct.subtitle}</p>
        )}

        <div className="detail-rating-row">
          <Star size={14} className="rating-star" />
          <span>
            <strong>{selectedProduct.rating}</strong> ({selectedProduct.reviewsCount > 999 ? `${(selectedProduct.reviewsCount / 1000).toFixed(1)}k` : selectedProduct.reviewsCount} reviews)
          </span>
        </div>

        <div className="detail-price-row">
          <span className="detail-price-main">₹{selectedProduct.price}</span>
          {selectedProduct.compareAtPrice && (
            <span className="detail-price-struck">₹{selectedProduct.compareAtPrice}</span>
          )}
          {discountPercent && (
            <span className="detail-discount-badge">{discountPercent}% OFF</span>
          )}
        </div>

        <div className="detail-features-list">
          {selectedProduct.features && selectedProduct.features.length > 0 ? (
            selectedProduct.features.map((feat, i) => (
              <div key={i} className="detail-feature-item">
                {i === 0 ? <Truck size={16} className="detail-feature-icon" /> :
                 i === 1 ? <ShieldCheck size={16} className="detail-feature-icon" /> :
                 i === 2 ? <PackageCheck size={16} className="detail-feature-icon" /> :
                 <CheckCircle2 size={16} className="detail-feature-icon" />}
                <span>{feat}</span>
              </div>
            ))
          ) : (
            <>
              <div className="detail-feature-item">
                <Truck size={16} className="detail-feature-icon" />
                <span>Free Insured Express Shipping</span>
              </div>
              <div className="detail-feature-item">
                <ShieldCheck size={16} className="detail-feature-icon" />
                <span>1-Year Official Replacement Warranty</span>
              </div>
              <div className="detail-feature-item">
                <PackageCheck size={16} className="detail-feature-icon" />
                <span>Tested & Certified Build Quality</span>
              </div>
            </>
          )}
        </div>

        {selectedProduct.specs && (
          <div style={{ margin: '18px 0' }}>
            <h3 className="detail-section-title">Specifications</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '8px', 
              marginTop: '8px' 
            }}>
              {Object.entries(selectedProduct.specs).map(([key, val]) => (
                <div key={key} style={{ 
                  background: 'var(--bg-surface)', 
                  padding: '8px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border-light)',
                  fontSize: '12px'
                }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{key}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="detail-section-title">About this product</h3>
        <p className="detail-desc-text">{selectedProduct.description}</p>
      </div>
    </div>
  </div>

  <div className="detail-sticky-cta">
    <button 
      className="primary-pill-btn"
      onClick={handleAddToCart}
      disabled={addedAnimation}
    >
      {addedAnimation ? (
        <>
          <Check size={18} /> Added to Cart!
        </>
      ) : (
        <>
          <ShoppingBag size={18} /> Add to Cart • ₹{selectedProduct.price}
        </>
      )}
    </button>
  </div>
</div>
  );
};
