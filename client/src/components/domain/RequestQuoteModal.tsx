import React, { useState } from 'react';
import { Modal } from '../common/Modal.js';
import { Input } from '../common/Input.js';
import { Select } from '../common/Select.js';
import { Button } from '../common/Button.js';
import { useToast } from '../../context/ToastContext.js';
import { api } from '../../services/api.js';

export interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
  defaultQuantity?: number;
}

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  isOpen,
  onClose,
  defaultProduct = '',
  defaultQuantity,
}) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    product: defaultProduct,
    quantity: defaultQuantity || 25,
    unit: defaultQuantity ? 'Kilograms (kg)' : 'Metric Tons (FCL)',
    packaging: 'Standard Export Packing (50kg)',
    destinationPort: '',
    message: '',
  });

  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        product: defaultProduct || prev.product,
        quantity: defaultQuantity !== undefined ? defaultQuantity : (prev.quantity || 25),
        unit: defaultQuantity ? 'Kilograms (kg)' : prev.unit,
      }));
    }
  }, [isOpen, defaultProduct, defaultQuantity]);

  const unitOptions = [
    { value: 'Metric Tons (FCL)', label: 'Metric Tons (FCL)' },
    { value: 'Metric Tons (LCL)', label: 'Metric Tons (LCL)' },
    { value: '20ft Containers', label: '20ft Containers' },
    { value: '40ft HC Containers', label: '40ft HC Containers' },
    { value: 'Kilograms (kg)', label: 'Kilograms (kg)' },
  ];

  const packagingOptions = [
    { value: 'Standard Export Packing (50kg)', label: 'Standard Export Packing (50kg)' },
    { value: '25kg PP / Jute Bags', label: '25kg PP / Jute Bags' },
    { value: 'Custom Private Label Packaging', label: 'Custom Private Label Packaging' },
    { value: 'Bulk in Container Liner', label: 'Bulk in Container Liner' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fullMessage = `${formData.message ? formData.message + '\n' : ''}Requested Packaging: ${formData.packaging}. Destination Port: ${formData.destinationPort || 'Not specified'}`;

    const res = await api.post('/enquiries', {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      product: formData.product || defaultProduct || 'Bulk Commodity Export',
      country: formData.country,
      quantity: Number(formData.quantity) || 25,
      unit: formData.unit,
      packaging: formData.packaging,
      message: fullMessage,
      type: 'Quote Request',
    });

    setLoading(false);

    if (res.success) {
      showToast(res.message || 'RFQ successfully submitted to ION INDUSTRIES!', 'success');
      onClose();
      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        product: '',
        quantity: 25,
        unit: 'Metric Tons (FCL)',
        packaging: 'Standard Export Packing (50kg)',
        destinationPort: '',
        message: '',
      });
    } else {
      showToast(res.error || 'Failed to submit quote request. Please try again.', 'error');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Commercial Export Quote"
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Input
            label="Full Name"
            required
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Company Name"
            required
            placeholder="e.g. Global Foods Ltd"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Input
            label="Business Email"
            type="email"
            required
            placeholder="procurement@company.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Phone / WhatsApp"
            placeholder="+1 (555) 012-3456"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Input
            label="Destination Country"
            required
            placeholder="e.g. United Arab Emirates"
            value={formData.country}
            onChange={e => setFormData({ ...formData, country: e.target.value })}
          />
          <Input
            label="Discharge Port (Optional)"
            placeholder="e.g. Jebel Ali / Rotterdam"
            value={formData.destinationPort}
            onChange={e => setFormData({ ...formData, destinationPort: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
          <Input
            label="Product / Commodity"
            placeholder="e.g. Basmati Rice 1121"
            value={formData.product || defaultProduct}
            onChange={e => setFormData({ ...formData, product: e.target.value })}
          />
          <Input
            label="Volume Quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Select
            label="Trading Unit"
            options={unitOptions}
            value={formData.unit}
            onChange={e => setFormData({ ...formData, unit: e.target.value })}
          />
          <Select
            label="Packaging Requirements"
            options={packagingOptions}
            value={formData.packaging}
            onChange={e => setFormData({ ...formData, packaging: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Additional Trade Requirements / Specifications</label>
          <textarea
            className="form-textarea"
            placeholder="Specify required moisture, crop year, inspection requirements, or private label branding details..."
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 18 }}>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Submit RFQ to Trade Desk
          </Button>
        </div>
      </form>
    </Modal>
  );
};
