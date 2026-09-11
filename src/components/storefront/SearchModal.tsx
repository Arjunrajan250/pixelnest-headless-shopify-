import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, Star, ShoppingBag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setSelectedProduct, setActiveTab, addToCart } = useStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div className="modal-card" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8C857D' }} />
            <input 
              type="text" 
              placeholder="Search planners, templates, ebooks..." 
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              className="form-control"
              style={{ paddingLeft: '38px', borderRadius: 'var(--radius-full)' }}
            />
          </div>
          <button className="icon-btn-pill" onClick={() => setIsSearchOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {query.trim() === '' ? (
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              POPULAR SEARCHES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Daily Planner', 'Canva Templates', 'Wellness', 'Budget', 'Lightroom'].map(tag => (
                <button
                  key={tag}
                  className="filter-pill"
                  onClick={() => setQuery(tag)}
                  style={{ fontSize: '12px', padding: '4px 12px' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>
            No products found matching "{query}"
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
            {filtered.map(prod => (
              <div 
                key={prod.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  border: '1px solid var(--border-light)'
                }}
                onClick={() => {
                  setSelectedProduct(prod);
                  setIsSearchOpen(false);
                  setActiveTab('product-detail');
                }}
              >
                <img 
                  src={prod.imageUrl} 
                  alt={prod.title} 
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{prod.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {prod.category} • ₹{prod.price}
                  </div>
                </div>
                <button 
                  className="icon-btn-pill"
                  style={{ width: '32px', height: '32px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(prod, 1);
                    setIsSearchOpen(false);
                  }}
                  title="Add to Cart"
                >
                  <ShoppingBag size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
