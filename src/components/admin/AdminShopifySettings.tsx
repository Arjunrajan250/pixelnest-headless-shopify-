import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { testShopifyConnection } from '../../services/shopify';
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw, Globe, Key, ShieldCheck, ExternalLink } from 'lucide-react';

export const AdminShopifySettings: React.FC = () => {
  const { shopifyConfig, updateShopifyConfig, syncShopifyProducts } = useStore();

  const [domain, setDomain] = useState(shopifyConfig.shopDomain);
  const [storefrontToken, setStorefrontToken] = useState(shopifyConfig.storefrontAccessToken);
  const [adminToken, setAdminToken] = useState(shopifyConfig.adminAccessToken || '');
  const [apiVersion, setApiVersion] = useState(shopifyConfig.apiVersion);
  const [liveMode, setLiveMode] = useState(shopifyConfig.liveMode);

  const [testStatus, setTestStatus] = useState<{ loading: boolean; message?: string; success?: boolean } | null>(null);
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; message?: string; success?: boolean } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateShopifyConfig({
      shopDomain: domain,
      storefrontAccessToken: storefrontToken,
      adminAccessToken: adminToken,
      apiVersion,
      liveMode
    });
    setTestStatus({ loading: false, success: true, message: 'Settings saved to browser memory!' });
    setTimeout(() => setTestStatus(null), 3000);
  };

  const handleTestConnection = async () => {
    setTestStatus({ loading: true });
    const result = await testShopifyConnection({
      shopDomain: domain,
      storefrontAccessToken: storefrontToken,
      apiVersion,
      isConnected: false,
      liveMode
    });
    setTestStatus({
      loading: false,
      success: result.success,
      message: result.message
    });
    if (result.success) {
      updateShopifyConfig({ isConnected: true });
    }
  };

  const handleSync = async () => {
    setSyncStatus({ loading: true });
    const res = await syncShopifyProducts();
    setSyncStatus({
      loading: false,
      success: res.success,
      message: res.message
    });
  };

  return (
    <div className="admin-shopify-settings" style={{ maxWidth: '780px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700 }}>Shopify Headless Configuration</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Connect your custom PixelNest frontend directly to your live Shopify store using GraphQL Storefront API.
        </p>
      </div>

      {/* Mode Switch Card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        border: '1px solid var(--border-light)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>
            Headless Data Source Mode
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {liveMode 
              ? '🟢 Live Shopify Mode: Querying live products & collections from your Shopify GraphQL endpoint.'
              : '⚪ Local / Demo Mode: Using ultra-fast built-in catalog with instant offline editing.'}
          </div>
        </div>
        <button
          className={liveMode ? 'btn-primary' : 'btn-secondary'}
          onClick={() => {
            const nextMode = !liveMode;
            setLiveMode(nextMode);
            updateShopifyConfig({ liveMode: nextMode });
          }}
        >
          {liveMode ? 'Live Shopify Active' : 'Switch to Live Shopify'}
        </button>
      </div>

      <form onSubmit={handleSave} style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-light)' }}>
        <div className="form-group">
          <label className="form-label">
            <Globe size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Shopify Store Domain (.myshopify.com)
          </label>
          <input 
            type="text" 
            className="form-control"
            placeholder="e.g. your-store-name.myshopify.com" 
            value={domain}
            onChange={e => setDomain(e.target.value)}
            required
          />
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Do not include https:// or trailing slashes.
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Key size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Storefront API Access Token
          </label>
          <input 
            type="password" 
            className="form-control"
            placeholder="shpat_xxxxxxxxxxxxxxxx or Storefront token" 
            value={storefrontToken}
            onChange={e => setStorefrontToken(e.target.value)}
            required
          />
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Generated from Shopify Admin &gt; Apps &gt; Develop apps &gt; Storefront API credentials.
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Shopify Admin API Access Token (Optional)
          </label>
          <input 
            type="password" 
            className="form-control"
            placeholder="shpat_xxxxxxxx (for writing new products directly into Shopify)" 
            value={adminToken}
            onChange={e => setAdminToken(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Storefront API Version</label>
          <select 
            className="form-control"
            value={apiVersion}
            onChange={e => setApiVersion(e.target.value)}
          >
            <option value="2024-01">2024-01 (Stable)</option>
            <option value="2024-04">2024-04</option>
            <option value="2024-07">2024-07</option>
            <option value="2024-10">2024-10</option>
          </select>
        </div>

        {testStatus && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            marginBottom: '16px',
            background: testStatus.success ? '#E5F3EB' : '#FEECEB',
            color: testStatus.success ? '#266A42' : '#B42318',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {testStatus.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{testStatus.loading ? 'Testing connection to Shopify...' : testStatus.message}</span>
          </div>
        )}

        {syncStatus && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            marginBottom: '16px',
            background: syncStatus.success ? '#E5F3EB' : '#FEECEB',
            color: syncStatus.success ? '#266A42' : '#B42318',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {syncStatus.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{syncStatus.loading ? 'Syncing catalog...' : syncStatus.message}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleTestConnection}
              disabled={testStatus?.loading}
            >
              Test Connection
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleSync}
              disabled={syncStatus?.loading}
            >
              <RefreshCw size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Sync Products
            </button>
          </div>

          <button type="submit" className="btn-primary">
            Save Configuration
          </button>
        </div>
      </form>

      {/* Guide Box */}
      <div style={{
        marginTop: '20px',
        padding: '18px 20px',
        background: '#FAF7F2',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        fontSize: '12px',
        lineHeight: 1.6
      }}>
        <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>
          How to connect your Shopify store:
        </div>
        <ol style={{ paddingLeft: '18px', color: 'var(--text-secondary)' }}>
          <li>Log into your Shopify Admin dashboard.</li>
          <li>Go to <strong>Settings &gt; Apps and sales channels &gt; Develop apps</strong>.</li>
          <li>Click <strong>Create an app</strong> and name it "PixelNest Headless Frontend".</li>
          <li>Under <strong>Configuration</strong>, configure <strong>Storefront API integration</strong> and enable `read_products`, `read_product_listings`, and `unauthenticated_write_checkouts`.</li>
          <li>Install the app, copy your <strong>Storefront API Access Token</strong> and paste it above!</li>
        </ol>
      </div>
    </div>
  );
};
