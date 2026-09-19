import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { CURRENCIES } from '../../utils/currency';
import { Currency } from '../../types';
import { ChevronDown, Globe } from 'lucide-react';

export const CurrencySelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currency, setCurrency } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentConfig = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div className="currency-selector-container" ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        type="button"
        className="currency-pill-btn"
        onClick={() => setIsOpen(!isOpen)}
        title={`Market currency: ${currentConfig.name}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          padding: compact ? '4px 8px' : '6px 12px',
          borderRadius: 'var(--radius-full)',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--text-main)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
      >
        <span style={{ fontSize: '14px' }}>{currentConfig.flag}</span>
        <span>{currentConfig.code}</span>
        <ChevronDown size={12} style={{ color: 'var(--text-secondary)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div 
          className="currency-dropdown-menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            zIndex: 1100,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-md)',
            padding: '6px',
            minWidth: '170px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
          }}
        >
          <div style={{ padding: '6px 8px', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
            Select Store Currency
          </div>
          {(Object.keys(CURRENCIES) as Currency[]).map(code => {
            const item = CURRENCIES[code];
            const isSelected = item.code === currency;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setCurrency(item.code);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-xs)',
                  background: isSelected ? 'var(--bg-surface-soft)' : 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? 'var(--color-primary)' : 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface-soft)')}
                onMouseLeave={e => (e.currentTarget.style.background = isSelected ? 'var(--bg-surface-soft)' : 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>{item.flag}</span>
                  <span>{item.code}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>({item.symbol})</span>
                </div>
                {isSelected && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
