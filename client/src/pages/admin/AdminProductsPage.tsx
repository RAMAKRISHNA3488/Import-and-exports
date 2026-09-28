import React, { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import type { Product } from '../../types/index.js';
import { Button } from '../../components/common/Button.js';
import { Badge } from '../../components/common/Badge.js';
import { Trash2, Plus, RefreshCw } from 'lucide-react';
import { useToast } from '../../context/ToastContext.js';
import { Modal } from '../../components/common/Modal.js';
import { Input } from '../../components/common/Input.js';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { showToast } = useToast();

  const [newProd, setNewProd] = useState({
    name: '',
    categoryId: 'cat-rice-grains',
    origin: 'India',
    subtitle: 'Export Grade',
    shortDesc: '',
    availability: 'In Stock',
  });

  const loadProducts = async () => {
    setLoading(true);
    const res = await api.get<Product[]>('/products');
    if (res.success && res.data) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete product "${name}" from temporary database?`)) return;
    const res = await api.delete(`/products/${id}`);
    if (res.success) {
      showToast(`Product "${name}" deleted`, 'success');
      loadProducts();
    } else {
      showToast(res.error || 'Failed to delete product', 'error');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await api.post('/products', newProd);
    setCreating(false);

    if (res.success) {
      showToast('Product added to temporary database successfully', 'success');
      setAddModalOpen(false);
      setNewProd({
        name: '',
        categoryId: 'cat-rice-grains',
        origin: 'India',
        subtitle: 'Export Grade',
        shortDesc: '',
        availability: 'In Stock',
      });
      loadProducts();
    } else {
      showToast(res.error || 'Failed to create product', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy-primary)' }}>
            Product Catalog Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
            Live temporary database storage: {products.length} registered export commodities
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="outline" size="sm" onClick={loadProducts} icon={<RefreshCw size={14} />}>
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={() => setAddModalOpen(true)} icon={<Plus size={14} />}>
            Add Commodity
          </Button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="trade-table">
            <thead>
              <tr>
                <th>Commodity Name</th>
                <th>Category</th>
                <th>Origin</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>
                    Loading database products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>
                    No products in store.
                  </td>
                </tr>
              ) : (
                products.map(p => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{p.subtitle}</div>
                    </td>
                    <td>{p.categoryName}</td>
                    <td>{p.origin}</td>
                    <td>
                      <Badge variant={p.availability === 'In Stock' ? 'success' : 'progress'}>
                        {p.availability}
                      </Badge>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        style={{ color: '#DC2626', padding: 4 }}
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Export Commodity"
        footer={
          <>
            <Button variant="outline" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" loading={creating} onClick={handleCreate}>
              Save to Temporary DB
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreate}>
          <Input
            label="Product Name"
            required
            placeholder="e.g. Organic Chia Seeds"
            value={newProd.name}
            onChange={e => setNewProd({ ...newProd, name: e.target.value })}
          />
          <Input
            label="Origin Country"
            required
            placeholder="e.g. India / Peru"
            value={newProd.origin}
            onChange={e => setNewProd({ ...newProd, origin: e.target.value })}
          />
          <Input
            label="Subtitle"
            placeholder="e.g. High Purity | Export Quality"
            value={newProd.subtitle}
            onChange={e => setNewProd({ ...newProd, subtitle: e.target.value })}
          />
          <div className="form-group">
            <label className="form-label">Short Description</label>
            <textarea
              className="form-textarea"
              placeholder="Product overview for international buyers..."
              value={newProd.shortDesc}
              onChange={e => setNewProd({ ...newProd, shortDesc: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
