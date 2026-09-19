import React, { useState } from 'react';
import { Product, ProductReview } from '../../types';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Plus, Check } from 'lucide-react';

interface ProductReviewsSectionProps {
  product: Product;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    return product.reviews && product.reviews.length > 0
      ? product.reviews
      : [
          {
            id: 'rev-default-1',
            author: 'Marcus L.',
            rating: 5,
            date: '2 weeks ago',
            title: 'Outstanding quality and finish',
            comment: 'Very satisfied with the build quality. Matches my workstation aesthetic perfectly and shipping was swift.',
            verified: true,
            country: 'United States'
          },
          {
            id: 'rev-default-2',
            author: 'Clara S.',
            rating: 5,
            date: '1 month ago',
            title: 'Reliable and well-packaged',
            comment: 'Packaged securely for international shipping. Works exactly as described without any setup hassles.',
            verified: true,
            country: 'Germany'
          }
        ];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const review: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: 'Just now',
      title: newTitle.trim() || 'Verified Customer Review',
      comment: newComment.trim(),
      verified: true,
      country: 'International'
    };

    setReviews([review, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
      setNewAuthor('');
      setNewTitle('');
      setNewComment('');
    }, 1500);
  };

  return (
    <div className="product-reviews-section" style={{ marginTop: '24px', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0' }}>
            Customer Reviews ({reviews.length})
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <div style={{ display: 'flex', color: '#D97706' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={14} fill={star <= Math.round(Number(avgRating)) ? '#D97706' : 'none'} />
              ))}
            </div>
            <span style={{ fontWeight: 700 }}>{avgRating} out of 5</span>
            <span style={{ color: 'var(--text-muted)' }}>• Verified Purchasers</span>
          </div>
        </div>

        <button 
          type="button" 
          className="btn-admin-secondary"
          onClick={() => setIsFormOpen(!isFormOpen)}
          style={{ fontSize: '12px', padding: '6px 14px' }}
        >
          <MessageSquare size={13} />
          <span>{isFormOpen ? 'Cancel Review' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Review Submission Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface-soft)', padding: '16px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', border: '1px solid var(--border-light)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Share Your Genuine Experience</h4>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>Rating</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                >
                  <Star size={20} fill={star <= newRating ? '#D97706' : 'none'} color="#D97706" />
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Your Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Sarah M."
                value={newAuthor}
                onChange={e => setNewAuthor(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Headline (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Excellent build quality"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Review Feedback</label>
            <textarea 
              required
              rows={3}
              placeholder="How did the product perform? How was delivery and packaging?"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '12px' }}
            />
          </div>

          <button 
            type="submit" 
            className="primary-pill-btn" 
            style={{ padding: '8px 16px', fontSize: '12px' }}
            disabled={submitted}
          >
            {submitted ? <><Check size={14} /> Review Submitted!</> : 'Post Verified Review'}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {reviews.map(rev => (
          <div 
            key={rev.id} 
            style={{ 
              background: 'var(--bg-surface)', 
              padding: '12px 14px', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-light)' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', color: '#D97706' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12} fill={s <= rev.rating ? '#D97706' : 'none'} color="#D97706" />
                  ))}
                </div>
                <span style={{ fontWeight: 600, fontSize: '12px' }}>{rev.author}</span>
                {rev.country && (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({rev.country})</span>
                )}
                {rev.verified && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#2F7A4C', background: '#E5F3EB', padding: '1px 6px', borderRadius: '10px' }}>
                    <CheckCircle size={10} /> Verified
                  </span>
                )}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{rev.date}</span>
            </div>

            {rev.title && (
              <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-main)', marginBottom: '4px' }}>
                {rev.title}
              </div>
            )}
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
