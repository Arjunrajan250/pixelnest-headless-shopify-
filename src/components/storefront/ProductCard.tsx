import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { formatPrice } from '../../utils/currency';

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct, setActiveTab, currency } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleCardClick = () => {
    setSelectedProduct(product);
    if (onOpenDetail) {
      onOpenDetail(product);
    } else {
      setActiveTab('product-detail');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="card-image-box">
        <img src={product.imageUrl} alt={product.title} loading="lazy" />
        
        {discountPercent && (
          <span className="discount-tag-badge">Save {discountPercent}%</span>
        )}

        <button 
          type="button"
          className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} fill={isWishlisted ? '#C24134' : 'none'} />
        </button>
      </div>

      <div className="card-details-box">
        <h3 className="card-title">{product.title}</h3>
        
        <div className="card-rating-row">
          <Star size={12} className="rating-star" />
          <span>{product.rating} ({product.reviewsCount})</span>
        </div>

        <div className="card-pricing-row">
          <div>
            <span className="card-price-current">{formatPrice(product.price, currency)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="card-price-compare">{formatPrice(product.compareAtPrice, currency)}</span>
            )}
          </div>

          <button 
            type="button"
            className="card-cart-btn" 
            title="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

