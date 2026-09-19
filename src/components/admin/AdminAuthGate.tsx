import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, ArrowLeft, ShieldAlert, KeyRound, Sparkles } from 'lucide-react';

export const AdminAuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminAuthenticated, loginAdmin, setAppMode } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (adminAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError('Invalid administrative credentials. Access restricted to authorized personnel.');
    } else {
      setError(null);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1A1816',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: '#24201D',
        border: '1px solid #3A3530',
        borderRadius: 'var(--radius-md)',
        padding: '32px 28px',
        color: '#F4EFEA',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={18} style={{ color: '#82A189' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#A39D95' }}>
            PixelNest Security
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', margin: '0 0 8px 0' }}>
          Merchant Control Panel
        </h2>
        <p style={{ fontSize: '13px', color: '#A39D95', marginBottom: '24px', lineHeight: 1.5 }}>
          This area is restricted to store administrators. Customer orders, inventory, and Shopify keys are protected.
        </p>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-xs)',
            padding: '10px 12px',
            color: '#FCA5A5',
            fontSize: '12px',
            marginBottom: '16px'
          }}>
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#A39D95', fontWeight: 600, marginBottom: '6px' }}>
              Administrator Passkey
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#746D66' }} />
              <input 
                type="password"
                required
                placeholder="Enter passkey (e.g. pixelnest2026)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  background: '#1A1816',
                  border: '1px solid #3A3530',
                  borderRadius: 'var(--radius-xs)',
                  color: '#FAF7F2',
                  fontSize: '13px'
                }}
              />
            </div>
            <div style={{ fontSize: '11px', color: '#746D66', marginTop: '6px' }}>
              Default admin passkey: <code style={{ color: '#82A189' }}>pixelnest2026</code>
            </div>
          </div>

          <button 
            type="submit"
            className="primary-pill-btn"
            style={{
              background: '#4A5B4F',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px',
              fontWeight: 600,
              fontSize: '13px',
              marginTop: '8px'
            }}
          >
            Unlock Merchant Admin
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #3A3530', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => setAppMode('storefront')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A39D95',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={14} /> Return to Storefront
          </button>
        </div>
      </div>
    </div>
  );
};
