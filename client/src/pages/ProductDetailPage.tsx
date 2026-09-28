import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { api } from '../services/api.js';
import type { Product } from '../types/index.js';
import {
  Star,
  ShieldCheck,
  Truck,
  FileText,
  Minus,
  Plus,
  ArrowRight,
  Info,
  ZoomIn,
  X,
  Store,
  Building2,
  Tag,
  CheckCircle2,
  Award,
  Globe,
  Coins,
  Headphones,
  Check,
  Home,
  Boxes,
  ChevronRight
} from 'lucide-react';
import { useQuoteBasket } from '../context/QuoteBasketContext.js';
import { useToast } from '../context/ToastContext.js';
import '../styles/product-detail.css';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1000);
  const [activeTab, setActiveTab] = useState<
    'details' | 'specs' | 'packaging' | 'certs' | 'shipping' | 'supplier'
  >('details');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const { openQuoteModal } = useOutletContext<{
    openQuoteModal: (name?: string, quantity?: number) => void;
  }>();
  const { addItem } = useQuoteBasket();
  const { showToast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    setActiveImageIndex(0);

    // Fetch single product
    if (id) {
      api.get(`/products/${id}`).then(res => {
        if (res.success && res.data) {
          setProduct(res.data.product);
        }
        setLoading(false);
      });
    }

    // Fetch catalog for related products
    api.get('/products').then(res => {
      if (res.success && res.data && Array.isArray(res.data.products)) {
        setAllProducts(res.data.products);
      }
    });
  }, [id]);

  // Gallery resolution
  const galleryImages = useMemo(() => {
    if (!product) return [];

    const isRice =
      product.slug.includes('rice') ||
      product.name.toLowerCase().includes('rice');

    if (isRice) {
      return [
        product.image || '/assets/products/basmati-rice.jpg',
        '/assets/products/basmati-rice-grains.jpg',
        '/assets/products/basmati-crop.jpg',
        '/assets/products/basmati-bag.jpg',
        '/assets/products/shipping-container.jpg',
      ];
    }

    if (product.gallery && product.gallery.length >= 3) {
      return product.gallery;
    }

    // Fallback 5-image gallery for any commodity
    return [
      product.image,
      '/assets/products/basmati-rice-grains.jpg',
      '/assets/products/basmati-crop.jpg',
      '/assets/products/basmati-bag.jpg',
      '/assets/products/shipping-container.jpg',
    ];
  }, [product]);

  // Related products selection
  const relatedProducts = useMemo(() => {
    if (!product || allProducts.length === 0) return [];

    // Filter out current product
    const otherProducts = allProducts.filter(p => p.id !== product.id && p.slug !== product.slug);

    // If Basmati Rice, prioritize the exact 6 related commodities from the reference image
    const preferredSlugs = ['brown-rice', 'non-basmati-rice', 'quinoa', 'wheat', 'oats', 'barley'];
    const exactMatches: Product[] = [];

    for (const slug of preferredSlugs) {
      const match = otherProducts.find(p => p.slug === slug);
      if (match) exactMatches.push(match);
    }

    if (exactMatches.length >= 4) {
      return exactMatches.slice(0, 6);
    }

    // Same category match fallback
    const sameCat = otherProducts.filter(p => p.categoryId === product.categoryId);
    if (sameCat.length >= 6) {
      return sameCat.slice(0, 6);
    }

    // Combine sameCat + others up to 6
    const combined = [...sameCat, ...otherProducts.filter(p => p.categoryId !== product.categoryId)];
    return combined.slice(0, 6);
  }, [product, allProducts]);

  const handleQtyChange = (delta: number) => {
    setQuantity(prev => {
      const next = prev + delta;
      return next < 100 ? 100 : next;
    });
  };

  const handleRequestQuote = () => {
    if (!product) return;
    openQuoteModal(product.name, quantity);
  };

  const handleAddToBasket = () => {
    if (!product) return;
    addItem(product, quantity, 'Kilograms (kg)');
    showToast(`Added ${quantity.toLocaleString()} kg of ${product.name} to RFQ Basket!`, 'success');
  };

  if (loading) {
    return (
      <div className="pdetail-page" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={{ color: '#0F172A', fontSize: '1.2rem', fontWeight: 600 }}>
          Loading commodity specifications...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pdetail-page" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: 12 }}>Product Not Found</h2>
          <p style={{ color: '#64748B', marginBottom: 24 }}>
            The requested commodity could not be found or has been archived.
          </p>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              backgroundColor: '#B8860B',
              color: '#FFFFFF',
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Return to Products Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Active main image
  const activeMainImage = galleryImages[activeImageIndex] || product.image;

  // Features and ideal for
  const features =
    product.keyFeatures && product.keyFeatures.length > 0
      ? product.keyFeatures
      : [
          'Extra long grains',
          'Rich aroma',
          'Premium quality',
          'Ideal for global markets',
        ];

  const idealList =
    product.idealFor && product.idealFor.length > 0
      ? product.idealFor
      : [
          'Retail Chains',
          'Food Distributors',
          'HoReCa (Hotels, Restaurants, Catering)',
          'Private Label',
        ];

  return (
    <div className="pdetail-page">
      {/* 1. Interactive Breadcrumbs */}
      <nav className="pdetail-breadcrumbs-wrap" aria-label="Breadcrumb navigation">
        <div className="container">
          <ol className="pdetail-breadcrumbs">
            <li className="pdetail-crumb-item">
              <Link to="/" className="pdetail-crumb-link" title="Return to Homepage">
                <Home size={13} className="pdetail-crumb-icon" />
                <span>Home</span>
              </Link>
            </li>
            <li className="pdetail-crumb-sep-item" aria-hidden="true">
              <ChevronRight size={13} className="pdetail-crumb-sep" />
            </li>

            <li className="pdetail-crumb-item">
              <Link to="/products" className="pdetail-crumb-link" title="Browse Commodities Catalog">
                <Boxes size={13} className="pdetail-crumb-icon" />
                <span>Products</span>
              </Link>
            </li>
            <li className="pdetail-crumb-sep-item" aria-hidden="true">
              <ChevronRight size={13} className="pdetail-crumb-sep" />
            </li>

            <li className="pdetail-crumb-item">
              <Link
                to={`/products?category=${product.categoryId || 'cat-rice-grains'}`}
                className="pdetail-crumb-link"
                title={`Filter by ${product.categoryName || 'Category'}`}
              >
                <Tag size={13} className="pdetail-crumb-icon" />
                <span>{product.categoryName || 'Rice & Grains'}</span>
              </Link>
            </li>
            <li className="pdetail-crumb-sep-item" aria-hidden="true">
              <ChevronRight size={13} className="pdetail-crumb-sep" />
            </li>

            <li className="pdetail-crumb-item">
              <span className="pdetail-crumb-current" title={`Current product: ${product.name}`}>
                <span className="pdetail-crumb-current-dot"></span>
                <span>{product.name}</span>
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. Hero Section: Gallery + Product Info + RFQ Card */}
      <section className="pdetail-hero-section">
        <div className="container">
          <div className="pdetail-hero-grid">
            {/* Gallery Column */}
            <div className="pdetail-gallery-wrap">
              <div className="pdetail-thumbs-col">
                {galleryImages.slice(0, 5).map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdetail-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    title={`View image ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      onError={e => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/assets/categories/rice-grains.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>

              <div className="pdetail-main-img-wrap">
                <img
                  src={activeMainImage}
                  alt={product.name}
                  className="pdetail-main-img"
                  onError={e => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/assets/categories/rice-grains.jpg';
                  }}
                />
                <button
                  type="button"
                  className="pdetail-zoom-trigger"
                  onClick={() => setIsLightboxOpen(true)}
                  title="Expand image"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>

            {/* Info Column */}
            <div className="pdetail-info-col">
              {/* Badges */}
              <div className="pdetail-badges-row">
                <span className="pdetail-pill-badge pdetail-pill-gold">Best Seller</span>
                <span className="pdetail-pill-badge pdetail-pill-green">Export Quality</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="pdetail-title">{product.name}</h1>
              <div className="pdetail-subtitle">{product.subtitle || 'Long Grain | Premium Quality'}</div>

              {/* Rating */}
              <div className="pdetail-rating-row">
                <div className="pdetail-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <span className="pdetail-rating-score">4.8</span>
                <span className="pdetail-reviews-count">(120 reviews)</span>
              </div>

              {/* Description */}
              <p className="pdetail-desc-paragraph">
                {product.shortDesc ||
                  'Premium quality basmati rice sourced from trusted farmers, known for its long grains, rich aroma and excellent taste. Suitable for international markets.'}
              </p>

              {/* Colon-aligned Key Specifications */}
              <div className="pdetail-specs-list">
                <div className="pdetail-spec-row">
                  <span className="pdetail-spec-label">Origin</span>
                  <span className="pdetail-spec-sep">:</span>
                  <span className="pdetail-spec-val">
                    <span className="pdetail-flag-icon">{product.originFlag || '🇮🇳'}</span>
                    {product.origin || 'India'}
                  </span>
                </div>

                <div className="pdetail-spec-row">
                  <span className="pdetail-spec-label">Variety</span>
                  <span className="pdetail-spec-sep">:</span>
                  <span className="pdetail-spec-val">{product.variety || '1121 / Traditional'}</span>
                </div>

                <div className="pdetail-spec-row">
                  <span className="pdetail-spec-label">Grade</span>
                  <span className="pdetail-spec-sep">:</span>
                  <span className="pdetail-spec-val">{product.grade || 'Premium'}</span>
                </div>

                <div className="pdetail-spec-row">
                  <span className="pdetail-spec-label">Packaging</span>
                  <span className="pdetail-spec-sep">:</span>
                  <span className="pdetail-spec-val">{product.packaging || '5kg, 10kg, 25kg, 50kg (Custom)'}</span>
                </div>

                <div className="pdetail-spec-row">
                  <span className="pdetail-spec-label">Supply Capacity</span>
                  <span className="pdetail-spec-sep">:</span>
                  <span className="pdetail-spec-val">{product.supplyCapacity || 'Large volumes'}</span>
                </div>

                <div className="pdetail-spec-row">
                  <span className="pdetail-spec-label">MOQ</span>
                  <span className="pdetail-spec-sep">:</span>
                  <span className="pdetail-spec-val">{product.moq || 'As per requirement'}</span>
                </div>
              </div>
            </div>

            {/* Right RFQ Action Card */}
            <div className="pdetail-rfq-card-col">
              <div className="pdetail-rfq-card">
                <div className="pdetail-price-header">Price</div>
                <div className="pdetail-price-val-row">
                  <span className="pdetail-price-amount">
                    {product.priceDisplay === '₹90 / kg' || product.slug === 'basmati-rice'
                      ? '₹90 / kg'
                      : product.priceDisplay || '₹90 / kg'}
                  </span>
                </div>

                <div className="pdetail-fob-note">
                  <span>(FOB Price)</span>
                  <Info size={14} />
                  <div className="pdetail-fob-tooltip">
                    Free On Board (FOB) pricing includes packaging, inland transport, and loading onto shipping vessels at Indian gateway ports (Mundra / JNPT / Vizag).
                  </div>
                </div>

                <div className="pdetail-qty-label">Quantity (kg)</div>
                <div className="pdetail-action-row">
                  <div className="pdetail-stepper">
                    <button
                      type="button"
                      className="pdetail-stepper-btn"
                      onClick={() => handleQtyChange(-100)}
                      title="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      className="pdetail-stepper-input"
                      value={quantity}
                      onChange={e => {
                        const val = parseInt(e.target.value, 10);
                        setQuantity(isNaN(val) || val < 0 ? 0 : val);
                      }}
                      min={100}
                      step={100}
                    />
                    <button
                      type="button"
                      className="pdetail-stepper-btn"
                      onClick={() => handleQtyChange(100)}
                      title="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="pdetail-quote-btn"
                    onClick={handleRequestQuote}
                  >
                    <span>Request a Quote</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                <button
                  type="button"
                  className="pdetail-basket-subbtn"
                  onClick={handleAddToBasket}
                >
                  + Add to RFQ Order Basket
                </button>

                {/* Trust Highlights */}
                <div className="pdetail-trust-list">
                  <div className="pdetail-trust-item">
                    <ShieldCheck size={20} className="pdetail-trust-icon" />
                    <div>
                      <div className="pdetail-trust-title">Quality Assured</div>
                      <p className="pdetail-trust-desc">Strict quality control</p>
                    </div>
                  </div>

                  <div className="pdetail-trust-item">
                    <Truck size={20} className="pdetail-trust-icon" />
                    <div>
                      <div className="pdetail-trust-title">Global Shipping</div>
                      <p className="pdetail-trust-desc">Reliable logistics partners</p>
                    </div>
                  </div>

                  <div className="pdetail-trust-item">
                    <FileText size={20} className="pdetail-trust-icon" />
                    <div>
                      <div className="pdetail-trust-title">Custom Documentation</div>
                      <p className="pdetail-trust-desc">Complete export support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal Navigation Tabs Bar */}
      <section className="pdetail-tabs-section">
        <div className="container">
          <div className="pdetail-tabs-bar">
            <button
              type="button"
              className={`pdetail-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Product Details
            </button>
            <button
              type="button"
              className={`pdetail-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button
              type="button"
              className={`pdetail-tab-btn ${activeTab === 'packaging' ? 'active' : ''}`}
              onClick={() => setActiveTab('packaging')}
            >
              Packaging
            </button>
            <button
              type="button"
              className={`pdetail-tab-btn ${activeTab === 'certs' ? 'active' : ''}`}
              onClick={() => setActiveTab('certs')}
            >
              Certifications
            </button>
            <button
              type="button"
              className={`pdetail-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping &amp; Delivery
            </button>
            <button
              type="button"
              className={`pdetail-tab-btn ${activeTab === 'supplier' ? 'active' : ''}`}
              onClick={() => setActiveTab('supplier')}
            >
              Supplier Information
            </button>
          </div>

          {/* Tab 1: Product Details (3-Box Layout from reference image) */}
          {activeTab === 'details' && (
            <div className="pdetail-tab-pane pdetail-about-grid">
              {/* About Box */}
              <div className="pdetail-about-main">
                <h3 className="pdetail-about-heading">About {product.name}</h3>
                <p className="pdetail-about-text">
                  {product.fullDesc ||
                    'Our basmati rice is carefully sourced from trusted growers and processed under strict hygiene standards to ensure consistent quality, aroma and taste. It is widely preferred in global markets for its extra-long grains and natural fragrance.'}
                </p>
                <p className="pdetail-about-text">
                  Processed in modern Sortex grading plants, each consignment undergoes thorough laboratory analysis for moisture balance, purity, and grain elongation upon cooking.
                </p>
              </div>

              {/* Key Features Box */}
              <div className="pdetail-features-box">
                <h4 className="pdetail-features-heading">Key Features</h4>
                <ul className="pdetail-features-list">
                  {features.map((feat, idx) => (
                    <li key={idx} className="pdetail-feature-item">
                      <CheckCircle2 size={18} className="pdetail-feature-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For Box */}
              <div className="pdetail-ideal-box">
                <h4 className="pdetail-ideal-heading">Ideal For</h4>
                <ul className="pdetail-ideal-list">
                  {idealList.map((item, idx) => {
                    let IconComponent = Store;
                    if (idx === 1 || item.toLowerCase().includes('distributor')) IconComponent = Building2;
                    if (idx === 2 || item.toLowerCase().includes('horeca')) IconComponent = Store;
                    if (idx === 3 || item.toLowerCase().includes('label')) IconComponent = Tag;

                    return (
                      <li key={idx} className="pdetail-ideal-item">
                        <IconComponent size={18} className="pdetail-ideal-icon" />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Specifications Table */}
          {activeTab === 'specs' && (
            <div className="pdetail-tab-pane">
              <div className="pdetail-specs-table-wrap">
                <table className="pdetail-specs-table">
                  <thead>
                    <tr>
                      <th style={{ width: '35%' }}>Technical Parameter</th>
                      <th>Export Trade Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Origin Country</td>
                      <td>{product.origin || 'India'}</td>
                    </tr>
                    <tr>
                      <td>Grain Classification</td>
                      <td>{product.variety || '1121 Super Extra Long Grain'}</td>
                    </tr>
                    <tr>
                      <td>Average Grain Length (AGL)</td>
                      <td>8.35 mm – 8.40 mm (Pre-cooking)</td>
                    </tr>
                    <tr>
                      <td>Moisture Level</td>
                      <td>Max 12.0% (Controlled)</td>
                    </tr>
                    <tr>
                      <td>Broken Grains</td>
                      <td>Max 1.0% (Sortex Grade 1)</td>
                    </tr>
                    <tr>
                      <td>Purity Index</td>
                      <td>95% minimum guaranteed</td>
                    </tr>
                    <tr>
                      <td>Foreign Matter / Chalky Grains</td>
                      <td>Nil / Max 0.1%</td>
                    </tr>
                    <tr>
                      <td>Crop Harvest Year</td>
                      <td>Current Crop Year (Aged naturally for 12+ months)</td>
                    </tr>
                    <tr>
                      <td>Standard Shelf Life</td>
                      <td>24 Months under standard dry warehouse storage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Packaging Options */}
          {activeTab === 'packaging' && (
            <div className="pdetail-tab-pane">
              <div className="pdetail-pack-grid">
                <div className="pdetail-pack-card">
                  <h4>Custom Jute &amp; Burlap Bags</h4>
                  <p>Eco-friendly, breathable natural jute bags in 25kg and 50kg capacities with high-definition customized brand stencil printing.</p>
                </div>
                <div className="pdetail-pack-card">
                  <h4>Heavy-Duty PP Woven Sacks</h4>
                  <p>Moisture-resistant polypropylene woven bags with optional inner liner. Available in 10kg, 25kg, and 50kg capacities.</p>
                </div>
                <div className="pdetail-pack-card">
                  <h4>Consumer Vacuum Pouches &amp; BOPP</h4>
                  <p>Aesthetic consumer retail packaging in 1kg, 2kg, and 5kg sizes with ziplock handles, ideal for supermarket shelves.</p>
                </div>
                <div className="pdetail-pack-card">
                  <h4>Full Container Stuffing (FCL)</h4>
                  <p>Standard 20ft container fits up to 25–26 Metric Tons palletized or non-palletized with desiccant strips installed.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Certifications */}
          {activeTab === 'certs' && (
            <div className="pdetail-tab-pane">
              <div className="pdetail-certs-grid">
                <div className="pdetail-cert-card">
                  <div className="pdetail-cert-badge-icon">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.92rem', color: '#0F172A' }}>ISO 22000:2018</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Certified Food Safety Management</p>
                  </div>
                </div>

                <div className="pdetail-cert-card">
                  <div className="pdetail-cert-badge-icon">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.92rem', color: '#0F172A' }}>HACCP Compliance</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Hazard Analysis Critical Control Point</p>
                  </div>
                </div>

                <div className="pdetail-cert-card">
                  <div className="pdetail-cert-badge-icon">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.92rem', color: '#0F172A' }}>APEDA &amp; FSSAI</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Govt of India Registered Export Quality</p>
                  </div>
                </div>

                <div className="pdetail-cert-card">
                  <div className="pdetail-cert-badge-icon">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.92rem', color: '#0F172A' }}>Halal &amp; Kosher</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>Recognized international conformity</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Shipping & Delivery */}
          {activeTab === 'shipping' && (
            <div className="pdetail-tab-pane">
              <div className="pdetail-specs-table-wrap">
                <table className="pdetail-specs-table">
                  <tbody>
                    <tr>
                      <td style={{ width: '30%', fontWeight: 600 }}>Commercial Incoterms</td>
                      <td>FOB (Free On Board), CIF (Cost, Insurance, Freight), CFR (Cost and Freight)</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Gateway Ports of Loading</td>
                      <td>Mundra Port (INMUN1), JNPT Mumbai (INNSA1), Visakhapatnam (INVTZ1), Chennai (INMAA1)</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Dispatch Lead Time</td>
                      <td>7–14 business days upon LC establishment / TT advance confirmation</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Third-Party Inspection</td>
                      <td>SGS, Bureau Veritas, Cotecna, or Intertek pre-shipment inspection COA provided</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Export Documents Included</td>
                      <td>Commercial Invoice, Packing List, Bill of Lading (B/L), Certificate of Origin (COO), Phytosanitary Certificate, Fumigation Certificate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 6: Supplier Information */}
          {activeTab === 'supplier' && (
            <div className="pdetail-tab-pane">
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0F172A', marginBottom: 8, fontWeight: 700 }}>
                  ION INDUSTRIES Global Trade Corporation
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 16, maxWidth: 750 }}>
                  Authorized Premier Export House headquartered in Visakhapatnam Port City, India, with dedicated commodity sourcing networks and representative desks in Dubai, UAE. We specialize in bulk agricultural exports adhering to ISO 9001 and ISO 22000 benchmarks.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontSize: '0.84rem' }}>
                  <div>
                    <strong style={{ color: '#0F172A', display: 'block' }}>Port Operations:</strong>
                    <span style={{ color: '#64748B' }}>Visakhapatnam, Mundra &amp; Nhava Sheva</span>
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A', display: 'block' }}>Direct Export Desk:</strong>
                    <span style={{ color: '#64748B' }}>exports@ionindustries.com</span>
                  </div>
                  <div>
                    <strong style={{ color: '#0F172A', display: 'block' }}>Trade Hotline:</strong>
                    <span style={{ color: '#64748B' }}>+91 891 278 9000</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Related Products Section */}
      <section className="pdetail-related-section">
        <div className="container">
          <div className="pdetail-related-header">
            <h2 className="pdetail-related-title">Related Products</h2>
            <Link to="/products" className="pdetail-related-viewall">
              <span>View All Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="pdetail-related-grid">
            {relatedProducts.map(rel => (
              <Link
                key={rel.id}
                to={`/products/${rel.slug || rel.id}`}
                className="pdetail-related-card"
              >
                <div className="pdetail-related-img-wrap">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="pdetail-related-img"
                    onError={e => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = '/assets/categories/rice-grains.jpg';
                    }}
                  />
                </div>
                <h3 className="pdetail-related-name" title={rel.name}>
                  {rel.name}
                </h3>
                <div className="pdetail-related-sub" title={rel.subtitle}>
                  {rel.subtitle || 'Export Quality | Bulk Supply'}
                </div>
                <button type="button" className="pdetail-related-btn">
                  View Details
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Trust Value Strip */}
      <section className="pdetail-trust-strip">
        <div className="container">
          <div className="pdetail-trust-strip-grid">
            <div className="pdetail-trust-strip-item">
              <div className="pdetail-trust-strip-icon-wrap">
                <Award size={24} />
              </div>
              <div className="pdetail-trust-strip-info">
                <span className="pdetail-trust-strip-title">Premium Quality</span>
                <span className="pdetail-trust-strip-sub">Sourced from trusted regions</span>
              </div>
            </div>

            <div className="pdetail-trust-strip-item">
              <div className="pdetail-trust-strip-icon-wrap">
                <Globe size={24} />
              </div>
              <div className="pdetail-trust-strip-info">
                <span className="pdetail-trust-strip-title">Global Supply</span>
                <span className="pdetail-trust-strip-sub">Serving 50+ countries</span>
              </div>
            </div>

            <div className="pdetail-trust-strip-item">
              <div className="pdetail-trust-strip-icon-wrap">
                <Coins size={24} />
              </div>
              <div className="pdetail-trust-strip-info">
                <span className="pdetail-trust-strip-title">Competitive Pricing</span>
                <span className="pdetail-trust-strip-sub">Value for long-term partnerships</span>
              </div>
            </div>

            <div className="pdetail-trust-strip-item">
              <div className="pdetail-trust-strip-icon-wrap">
                <Headphones size={24} />
              </div>
              <div className="pdetail-trust-strip-info">
                <span className="pdetail-trust-strip-title">Dedicated Support</span>
                <span className="pdetail-trust-strip-sub">From inquiry to delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Lightbox Image Modal */}
      {isLightboxOpen && (
        <div className="pdetail-lightbox-backdrop" onClick={() => setIsLightboxOpen(false)}>
          <div className="pdetail-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={activeMainImage} alt={product.name} className="pdetail-lightbox-img" />
            <button
              type="button"
              className="pdetail-lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              title="Close preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
