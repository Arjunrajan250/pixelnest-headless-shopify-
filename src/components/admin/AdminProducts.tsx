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
  const [subCategory, setSubCategory] = useState('Mice');
  const [price, setPrice] = useState('1499');
  const [comparePrice, setComparePrice] = useState('2499');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/mouse.jpg');
  const [features, setFeatures] = useState('Free 2-Day Express Shipping\n1-Year Official Warranty\nTested & Certified Build Quality\n7-Day Replacement Guarantee');
  const [downloadFileName, setDownloadFileName] = useState('Product_Warranty_Guide.pdf');
  const [status, setStatus] = useState<'active' | 'draft'>('active');

  const presetImages = [
    { label: 'Wireless Mouse', url: '/images/mouse.jpg' },
    { label: 'Mechanical Keyboard', url: '/images/keyboard.jpg' },
    { label: '4K Curved Monitor', url: '/images/monitor.jpg' },
    { label: 'GaN Multi-Charger', url: '/images/charger.jpg' },
    { label: 'Retro Lava Lamp', url: '/images/lava_lamp.jpg' },
    { label: 'Magnetic Hooks', url: '/images/kitchen_hooks.jpg' },
    { label: 'Monitor Arm', url: '/images/monitor_arm.jpg' },
    { label: 'Screen Light Bar', url: '/images/lightbar.jpg' },
    { label: 'Desk Setup Hero', url: '/images/hardware_hero.jpg' }
  ];

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setCategory('Peripherals');
    setSubCategory('Mice');
    setPrice('1499');
    setComparePrice('2499');
    setDescription('');
    setImageUrl('/images/mouse.jpg');
    setFeatures('Free 2-Day Express Shipping\n1-Year Official Warranty\nTested & Certified Build Quality\n7-Day Replacement Guarantee');
    setDownloadFileName('Product_Warranty_Guide.pdf');
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
    setSubCategory(prod.subCategory || 'Daily');
    setPrice(prod.price.toString());
    setComparePrice(prod.compareAtPrice ? prod.compareAtPrice.toString() : '');
    setDescription(prod.description);
    setImageUrl(prod.imageUrl);
    setFeatures(prod.features.join('\n'));
    setDownloadFileName(prod.downloadFileName || 'Digital_Product.pdf');
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

    const parsedPrice = parseFloat(price) || 299;
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
        gallery: [imageUrl, '/images/planner.jpg'],
        features: featureList,
        downloadFileName,
        status
      });
    } else {
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
        gallery: [imageUrl, '/images/planner.jpg'],
        features: featureList,
        downloadFileName,
        fileSize: '4.5 MB',
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
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Add, update, or remove digital products from your store.</p>
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
              <option value="Planners">Planners</option>
              <option value="Ebooks">Ebooks</option>
              <option value="Templates">Templates</option>
              <option value="Presets">Presets</option>
              <option value="Courses">Courses</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        <div className="admin-table-scroll-wrapper" style={{ display: 'block' }}>
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
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingProduct ? 'Edit Hardware Product' : 'Add New Hardware Product'}
              </h2>
              <button className="icon-btn-pill" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Minimal Daily Planner 2025" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subtitle / Hook</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Stay organized, focused and productive." 
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
                    onChange={e => setCategory(e.target.value as ProductCategory)}
                  >
                    <option value="Peripherals">Peripherals</option>
                    <option value="Displays">Displays</option>
                    <option value="Power & Charging">Power & Charging</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Desk Setup">Desk Setup</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Sub-Category</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Daily / Weekly" 
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
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Compare-at Price (₹)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 499 (for discount badge)" 
                    value={comparePrice}
                    onChange={e => setComparePrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="Image URL or pick preset below"
                />
                
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Or pick aesthetic preset cover:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {presetImages.map(preset => (
                      <div 
                        key={preset.url}
                        style={{
                          border: imageUrl === preset.url ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          padding: '2px',
                          background: '#FFFFFF',
                          flexShrink: 0
                        }}
                        onClick={() => setImageUrl(preset.url)}
                      >
                        <img src={preset.url} alt={preset.label} style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                        <div style={{ fontSize: '9px', textAlign: 'center', maxWidth: '48px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {preset.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Tell buyers why this digital product is essential..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Features (One per line)</label>
                <textarea 
                  className="form-control" 
                  rows={3}
                  value={features}
                  onChange={e => setFeatures(e.target.value)}
                  placeholder="Instant Download (PDF)&#10;Printable & Digital Use&#10;GoodNotes Compatible"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Download File Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={downloadFileName}
                    onChange={e => setDownloadFileName(e.target.value)}
                    placeholder="Product_Bundle.pdf"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
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
