import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory } from '../../types';
import { Plus, Search, Edit2, Trash2, ExternalLink, X, Check, Image as ImageIcon } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, setSelectedProduct, setActiveTab, setAppMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Peripherals');
  const [subCategory, setSubCategory] = useState('Keyboards');
  const [price, setPrice] = useState('2999');
  const [comparePrice, setComparePrice] = useState('4499');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/keyboard.jpg');
  const [features, setFeatures] = useState('Free 2-Day Express Courier Delivery\n1-Year Official Brand Replacement Warranty\nTested & Certified Factory Build Quality\n7-Day Risk-Free Replacement Guarantee');
  const [warranty, setWarranty] = useState('1-Year Official Brand Replacement Warranty');
  const [shippingInfo, setShippingInfo] = useState('Free Insured Express Delivery (2-4 Business Days)');
  const [specsText, setSpecsText] = useState('Connectivity: Tri-Mode (BT 5.3 / 2.4GHz / USB-C)\nBuild: CNC Anodized Aluminum Top Plate\nBattery: 4,000mAh Rechargeable Lithium-Ion');
  const [inStock, setInStock] = useState(true);
  const [downloadFileName, setDownloadFileName] = useState('Hardware_User_Manual_and_Warranty.pdf');
  const [status, setStatus] = useState<'active' | 'draft'>('active');

  const presetImages = [
    { label: 'Keyboard (Main)', category: 'Peripherals', url: '/images/keyboard.jpg' },
    { label: 'Keyboard (Switches)', category: 'Peripherals', url: '/images/keyboard_detail.jpg' },
    { label: 'Keyboard (Desk)', category: 'Peripherals', url: '/images/keyboard_overhead.jpg' },
    { label: 'Mouse (Ergo)', category: 'Peripherals', url: '/images/mouse.jpg' },
    { label: 'Mouse (Side)', category: 'Peripherals', url: '/images/mouse_side.jpg' },
    { label: 'Mouse (Desk)', category: 'Peripherals', url: '/images/mouse_desk.jpg' },
    { label: '4K Monitor', category: 'Displays', url: '/images/monitor.jpg' },
    { label: 'GaN Charger', category: 'Power & Charging', url: '/images/charger.jpg' },
    { label: 'Lava Lamp', category: 'Home & Living', url: '/images/lava_lamp.jpg' },
    { label: 'Magnetic Hooks', category: 'Home & Living', url: '/images/kitchen_hooks.jpg' },
    { label: 'Monitor Arm', category: 'Desk Setup', url: '/images/monitor_arm.jpg' },
    { label: 'Light Bar', category: 'Desk Setup', url: '/images/lightbar.jpg' },
    { label: 'Cable Tray', category: 'Desk Setup', url: '/images/cable_organizer.jpg' },
    { label: 'Desk Setup', category: 'Desk Setup', url: '/images/hardware_hero.jpg' }
  ];

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setCategory('Peripherals');
    setSubCategory('Keyboards');
    setPrice('2999');
    setComparePrice('4499');
    setDescription('');
    setImageUrl('/images/keyboard.jpg');
    setFeatures('Free 2-Day Express Courier Delivery\n1-Year Official Brand Replacement Warranty\nTested & Certified Factory Build Quality\n7-Day Risk-Free Replacement Guarantee');
    setWarranty('1-Year Official Brand Replacement Warranty');
    setShippingInfo('Free Insured Express Delivery (2-4 Business Days)');
    setSpecsText('Connectivity: Tri-Mode (BT 5.3 / 2.4GHz / USB-C)\nBuild: CNC Anodized Aluminum Top Plate\nBattery: 4,000mAh Rechargeable Lithium-Ion');
    setInStock(true);
    setDownloadFileName('Hardware_User_Manual_and_Warranty.pdf');
    setStatus('active');
    setEditingProduct(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setTitle(prod.title);
    setSubtitle(prod.subtitle || '');
    setCategory(prod.category);
    setSubCategory(prod.subCategory || 'Keyboards');
    setPrice(prod.price.toString());
    setComparePrice(prod.compareAtPrice ? prod.compareAtPrice.toString() : '');
    setDescription(prod.description);
    setImageUrl(prod.imageUrl);
    setFeatures(prod.features ? prod.features.join('\n') : '');
    setWarranty(prod.warranty || '1-Year Official Brand Replacement Warranty');
    setShippingInfo(prod.shippingInfo || 'Free Insured Express Delivery (2-4 Business Days)');
    setSpecsText(prod.specs ? Object.entries(prod.specs).map(([k, v]) => `${k}: ${v}`).join('\n') : '');
    setInStock(prod.inStock !== false);
    setDownloadFileName(prod.downloadFileName || `${prod.title.replace(/\s+/g, '_')}_Manual.pdf`);
    setStatus(prod.status);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const featureList = features
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const specEntries: Record<string, string> = {};
    if (specsText.trim()) {
      specsText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const k = line.substring(0, colonIndex).trim();
          const v = line.substring(colonIndex + 1).trim();
          if (k && v) {
            specEntries[k] = v;
          }
        }
      });
    }

    const parsedPrice = parseFloat(price) || 1499;
    const parsedCompare = comparePrice ? parseFloat(comparePrice) : undefined;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title,
        subtitle,
        category,
        subCategory,
        price: parsedPrice,
        compareAtPrice: parsedCompare,
        description,
        imageUrl,
        gallery: [imageUrl, ...(editingProduct.gallery ? editingProduct.gallery.filter(g => g !== imageUrl) : [])],
        features: featureList,
        specs: Object.keys(specEntries).length > 0 ? specEntries : editingProduct.specs,
        warranty,
        shippingInfo,
        inStock,
        downloadFileName,
        status
      });
    } else {
      const categoryGallery = presetImages
        .filter(p => p.url !== imageUrl && (
          (category === 'Peripherals' && (p.url.includes('keyboard') || p.url.includes('mouse'))) ||
          (category === 'Displays' && p.url.includes('monitor')) ||
          (category === 'Power & Charging' && p.url.includes('charger')) ||
          (category === 'Desk Setup' && (p.url.includes('lightbar') || p.url.includes('monitor_arm') || p.url.includes('cable')))
        ))
        .map(p => p.url)
        .slice(0, 2);

      addProduct({
        title,
        handle: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        subtitle,
        category,
        subCategory,
        price: parsedPrice,
        compareAtPrice: parsedCompare,
        rating: 4.9,
        reviewsCount: 1,
        description,
        imageUrl,
        gallery: [imageUrl, ...categoryGallery],
        features: featureList,
        specs: Object.keys(specEntries).length > 0 ? specEntries : undefined,
        warranty,
        shippingInfo,
        inStock,
        downloadFileName,
        fileSize: '3.5 MB (User Manual)',
        isTrending: true,
        status
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="admin-products-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700 }}>Product Catalog</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Add, update, or remove hardware products and desk essentials from your store.</p>
        </div>

        <button className="btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="admin-table-container">
        <div className="table-toolbar-row">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search products..."
              className="table-search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />

            <select 
              className="form-control"
              style={{ width: 'auto', padding: '7px 12px' }}
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Peripherals">Peripherals</option>
              <option value="Displays">Displays</option>
              <option value="Power & Charging">Power & Charging</option>
              <option value="Desk Setup">Desk Setup</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Desktop Table View (>= 768px) */}
        <div className="admin-table-scroll-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Compare</th>
                <th>Status</th>
                <th>Rating</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(prod => (
                <tr key={prod.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={prod.imageUrl} 
                        alt={prod.title} 
                        style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-light)' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>{prod.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          {prod.subCategory || 'Hardware Tech'} • 1-Yr Warranty
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', background: '#F1ECE4', padding: '3px 8px', borderRadius: '4px', fontWeight: 500 }}>
                      {prod.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>₹{prod.price}</td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {prod.compareAtPrice ? `₹${prod.compareAtPrice}` : '—'}
                  </td>
                  <td>
                    <span className={`status-badge ${prod.status}`}>
                      {prod.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px' }}>
                    ★ {prod.rating} ({prod.reviewsCount})
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button 
                        className="icon-btn-pill" 
                        style={{ width: '32px', height: '32px' }}
                        title="Preview in Storefront"
                        onClick={() => {
                          setSelectedProduct(prod);
                          setAppMode('storefront');
                          setActiveTab('product-detail');
                        }}
                      >
                        <ExternalLink size={14} />
                      </button>
                      <button 
                        className="icon-btn-pill" 
                        style={{ width: '32px', height: '32px' }}
                        title="Edit Product"
                        onClick={() => handleOpenEdit(prod)}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="icon-btn-pill" 
                        style={{ width: '32px', height: '32px', color: '#B42318' }}
                        title="Delete Product"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Product Cards View (< 768px) */}
        <div className="admin-mobile-products-cards">
          {filteredProducts.length === 0 ? (
            <div className="mobile-orders-empty">
              No products found matching your search.
            </div>
          ) : (
            filteredProducts.map(prod => (
              <div key={prod.id} className="mobile-product-card">
                <div className="mobile-product-card-top">
                  <img src={prod.imageUrl} alt={prod.title} className="mobile-product-thumb" />
                  <div className="mobile-product-meta">
                    <div className="mobile-product-title">{prod.title}</div>
                    <div className="mobile-product-sub">
                      <span>{prod.category}</span> • <span>★ {prod.rating}</span>
                    </div>
                  </div>
                  <span className={`status-badge ${prod.status}`}>
                    {prod.status === 'active' ? 'Active' : 'Draft'}
                  </span>
                </div>

                <div className="mobile-product-card-mid">
                  <div className="mobile-product-price-block">
                    <span className="mobile-product-price">₹{prod.price}</span>
                    {prod.compareAtPrice && (
                      <span className="mobile-product-compare">₹{prod.compareAtPrice}</span>
                    )}
                  </div>
                  <div className="mobile-product-actions">
                    <button 
                      className="icon-btn-pill" 
                      style={{ width: '32px', height: '32px' }}
                      title="Preview in Storefront"
                      onClick={() => {
                        setSelectedProduct(prod);
                        setAppMode('storefront');
                        setActiveTab('product-detail');
                      }}
                    >
                      <ExternalLink size={14} />
                    </button>
                    <button 
                      className="icon-btn-pill" 
                      style={{ width: '32px', height: '32px' }}
                      title="Edit Product"
                      onClick={() => handleOpenEdit(prod)}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      className="icon-btn-pill" 
                      style={{ width: '32px', height: '32px', color: '#B42318' }}
                      title="Delete Product"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  {editingProduct ? 'Edit Hardware Product' : 'Add New Hardware Product'}
                </h2>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  {editingProduct ? 'Update specifications, pricing, and inventory for this item.' : 'Create and publish a new hardware piece or desk accessory to your live storefront.'}
                </p>
              </div>
              <button className="icon-btn-pill" onClick={() => setIsAddModalOpen(false)} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. 75% Custom Mechanical Keyboard (Gasket Mount)" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subtitle / Key Highlight</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Hot-swappable tactile switches with sound-dampening acoustic foams & warm RGB" 
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-control"
                    value={category}
                    onChange={e => {
                      const newCat = e.target.value as ProductCategory;
                      setCategory(newCat);
                      if (newCat === 'Peripherals') setSubCategory('Keyboards');
                      else if (newCat === 'Displays') setSubCategory('Monitors');
                      else if (newCat === 'Power & Charging') setSubCategory('GaN Chargers');
                      else if (newCat === 'Desk Setup') setSubCategory('Lighting');
                      else if (newCat === 'Home & Living') setSubCategory('Hooks & Storage');
                    }}
                  >
                    <option value="Peripherals">Peripherals</option>
                    <option value="Displays">Displays</option>
                    <option value="Power & Charging">Power & Charging</option>
                    <option value="Desk Setup">Desk Setup</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Sub-Category</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Keyboards, Mice, Monitors, GaN Chargers" 
                    value={subCategory}
                    onChange={e => setSubCategory(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="e.g. 2999"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Compare-at Price / Original MRP (₹)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 4499 (shows discount badge)" 
                    value={comparePrice}
                    onChange={e => setComparePrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Cover Image & Presets */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Cover Image *</label>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Preview updates automatically</span>
                </div>
                
                <div className="admin-cover-picker-layout">
                  <div className="admin-active-cover-preview">
                    <img 
                      src={imageUrl} 
                      alt="Active cover preview" 
                      className="admin-active-cover-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/keyboard.jpg';
                      }}
                    />
                    <div className="admin-active-cover-tag">Active Cover</div>
                  </div>

                  <div className="admin-cover-controls">
                    <input 
                      type="text" 
                      className="form-control" 
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      placeholder="Image URL or pick a hardware preset below"
                      required
                    />

                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        Curated Hardware Preset Covers:
                      </div>
                      <div className="admin-preset-grid">
                        {presetImages.map(preset => {
                          const isSelected = imageUrl === preset.url;
                          return (
                            <button
                              key={preset.url}
                              type="button"
                              className={`admin-preset-card ${isSelected ? 'active' : ''}`}
                              onClick={() => setImageUrl(preset.url)}
                              title={`${preset.label} (${preset.category})`}
                            >
                              <img src={preset.url} alt={preset.label} className="admin-preset-thumb" />
                              <span className="admin-preset-name">{preset.label}</span>
                              {isSelected && (
                                <span className="admin-preset-badge">
                                  <Check size={10} strokeWidth={3} />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Product Description</label>
                <textarea 
                  className="form-control" 
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe build quality, materials (e.g. CNC aluminum chassis, PBT keycaps), ergonomic comfort, connectivity options, and desk setup synergy..."
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Key Features (One per line)</label>
                  <textarea 
                    className="form-control" 
                    rows={3}
                    value={features}
                    onChange={e => setFeatures(e.target.value)}
                    placeholder="Tri-Mode Wireless (Bluetooth 5.3 + 2.4GHz + USB-C)&#10;Hot-Swappable 5-Pin Switch Sockets&#10;Precision CNC Anodized Aluminum Enclosure&#10;Factory Pre-Lubed Mechanical Switches"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Technical Specs (Key: Value per line)</label>
                  <textarea 
                    className="form-control" 
                    rows={3}
                    value={specsText}
                    onChange={e => setSpecsText(e.target.value)}
                    placeholder="Connectivity: Tri-Mode (BT / 2.4G / Type-C)&#10;Battery Life: 70 Hours (RGB Off)&#10;Build Material: CNC Aluminum & PBT"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Warranty Period</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={warranty}
                    onChange={e => setWarranty(e.target.value)}
                    placeholder="e.g. 1-Year Official Brand Replacement Warranty"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Shipping & Delivery Info</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={shippingInfo}
                    onChange={e => setShippingInfo(e.target.value)}
                    placeholder="e.g. Free Insured Courier Delivery (2-4 Business Days)"
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">User Manual & Warranty Slip (PDF)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={downloadFileName}
                    onChange={e => setDownloadFileName(e.target.value)}
                    placeholder="e.g. Keyboard_User_Manual.pdf"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inventory Status</label>
                  <select 
                    className="form-control"
                    value={inStock ? 'in-stock' : 'out-of-stock'}
                    onChange={e => setInStock(e.target.value === 'in-stock')}
                  >
                    <option value="in-stock">In Stock (Ready to Ship)</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Storefront Visibility</label>
                  <select 
                    className="form-control"
                    value={status}
                    onChange={e => setStatus(e.target.value as 'active' | 'draft')}
                  >
                    <option value="active">Active (Visible in Store)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={16} /> {editingProduct ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
