import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Star, 
  Download, 
  Printer, 
  FileText, 
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
      <div className="detail-nav-bar">
        <button 
          className="icon-btn-pill"
          onClick={() => {
            setSelectedProduct(null);
            setActiveTab('home');
          }}
          title="Back"
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
            className={`icon-btn-pill ${isWishlisted ? 'active' : ''}`}
            onClick={() => toggleWishlist(selectedProduct.id)}
            title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={18} fill={isWishlisted ? '#C24134' : 'none'} color={isWishlisted ? '#C24134' : 'currentColor'} />
          </button>
        </div>
      </div>

      <div className="detail-gallery-main">
        <img 
          src={images[activeImageIndex] || selectedProduct.imageUrl} 
          alt={selectedProduct.title} 
        />
      </div>

      {images.length > 1 && (
        <div className="detail-thumbnails-row">
          {images.map((img, idx) => (
            <div 
              key={idx}
              className={`detail-thumbnail-item ${activeImageIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveImageIndex(idx)}
            >
              <img src={img} alt={`Preview ${idx + 1}`} />
            </div>
          ))}
        </div>
      )}

      <div className="detail-content-body">
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
                {i === 0 ? <Download size={16} className="detail-feature-icon" /> :
                 i === 1 ? <Printer size={16} className="detail-feature-icon" /> :
                 i === 2 ? <FileText size={16} className="detail-feature-icon" /> :
                 <CheckCircle2 size={16} className="detail-feature-icon" />}
                <span>{feat}</span>
              </div>
            ))
          ) : (
            <>
              <div className="detail-feature-item">
                <Download size={16} className="detail-feature-icon" />
                <span>Instant Download (PDF)</span>
              </div>
              <div className="detail-feature-item">
                <Printer size={16} className="detail-feature-icon" />
                <span>Printable & Digital Use</span>
              </div>
              <div className="detail-feature-item">
                <FileText size={16} className="detail-feature-icon" />
                <span>A4, A5, US Letter Sizes</span>
              </div>
            </>
          )}
        </div>

        <h3 className="detail-section-title">About this product</h3>
        <p className="detail-desc-text">{selectedProduct.description}</p>
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
