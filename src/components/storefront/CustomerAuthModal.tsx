import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Mail, Lock, ArrowRight, ShieldCheck, Search, CheckCircle2 } from 'lucide-react';

export const CustomerAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginCustomer, registerCustomer, orders } = useStore();
  
  const [tab, setTab] = useState<'login' | 'register' | 'track'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [trackOrderNum, setTrackOrderNum] = useState('');
  const [trackEmail, setTrackEmail] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please fill in your email address and password.');
      return;
    }
    setError(null);
    loginCustomer(email.trim());
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !firstName.trim()) {
      setError('Please provide your name and a valid email address.');
      return;
    }
    setError(null);
    registerCustomer({
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim()
    });
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderNum.trim()) {
      setError('Please enter your order number.');
      return;
    }
    const found = orders.find(
      o => o.orderNumber.toLowerCase() === trackOrderNum.trim().toLowerCase() &&
           (!trackEmail.trim() || !o.customerEmail || o.customerEmail.toLowerCase() === trackEmail.trim().toLowerCase())
    );
    if (found) {
      setTrackResult(`Order ${found.orderNumber} is currently: ${found.status}. ${found.deliveryDate}`);
      setError(null);
    } else {
      setTrackResult(null);
      setError(`No matching order found for "${trackOrderNum}". Please check the order number or email.`);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div 
        className="modal-card auth-modal-card" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '28px 24px', borderRadius: 'var(--radius-md)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', margin: 0 }}>
              {tab === 'login' ? 'Customer Sign In' : tab === 'register' ? 'Create Account' : 'Guest Order Lookup'}
            </h3>
          </div>
          <button 
            type="button" 
            className="icon-btn-pill" 
            onClick={() => setIsAuthModalOpen(false)}
            style={{ width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', background: 'var(--bg-surface-soft)', padding: '4px', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
          <button 
            type="button"
            onClick={() => { setTab('login'); setError(null); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-xs)',
              background: tab === 'login' ? 'var(--bg-surface)' : 'transparent',
              fontWeight: tab === 'login' ? 700 : 500,
              fontSize: '12px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              boxShadow: tab === 'login' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => { setTab('register'); setError(null); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-xs)',
              background: tab === 'register' ? 'var(--bg-surface)' : 'transparent',
              fontWeight: tab === 'register' ? 700 : 500,
              fontSize: '12px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              boxShadow: tab === 'register' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Create Account
          </button>
          <button 
            type="button"
            onClick={() => { setTab('track'); setError(null); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-xs)',
              background: tab === 'track' ? 'var(--bg-surface)' : 'transparent',
              fontWeight: tab === 'track' ? 700 : 500,
              fontSize: '12px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              boxShadow: tab === 'track' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Track Order
          </button>
        </div>

        {error && (
          <div style={{ padding: '10px 12px', background: '#FEE2E2', color: '#991B1B', borderRadius: 'var(--radius-xs)', fontSize: '12px', marginBottom: '14px' }}>
            {error}
          </div>
        )}

        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input 
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '13px', background: 'var(--bg-surface)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '13px', background: 'var(--bg-surface)' }}
                />
              </div>
            </div>

            <button type="submit" className="primary-pill-btn" style={{ marginTop: '8px', padding: '12px' }}>
              Sign In to Account <ArrowRight size={14} />
            </button>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', margin: '4px 0 0 0' }}>
              Protected with Shopify Customer Accounts & 256-Bit SSL.
            </p>
          </form>
        )}

        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>First Name</label>
                <input 
                  type="text"
                  required
                  placeholder="John"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>Last Name</label>
                <input 
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input 
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '13px' }}
                />
              </div>
            </div>

            <button type="submit" className="primary-pill-btn" style={{ marginTop: '8px', padding: '12px' }}>
              Create Account <ArrowRight size={14} />
            </button>
          </form>
        )}

        {tab === 'track' && (
          <form onSubmit={handleTrackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              Quickly look up fulfillment and live courier updates without logging into an account.
            </p>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>Order Number</label>
              <div style={{ position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  required
                  placeholder="e.g. PN-24876"
                  value={trackOrderNum}
                  onChange={e => setTrackOrderNum(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>Billing Email (Optional)</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input 
                  type="email"
                  placeholder="name@domain.com"
                  value={trackEmail}
                  onChange={e => setTrackEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '13px' }}
                />
              </div>
            </div>

            <button type="submit" className="primary-pill-btn" style={{ padding: '12px' }}>
              Search Order Tracking
            </button>

            {trackResult && (
              <div style={{ padding: '12px', background: '#EBF0EC', border: '1px solid #BFE3CD', borderRadius: 'var(--radius-xs)', color: 'var(--color-primary)', fontSize: '12px', display: 'flex', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                <span>{trackResult}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
