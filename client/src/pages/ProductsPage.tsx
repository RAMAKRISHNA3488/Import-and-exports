import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams, useOutletContext } from 'react-router-dom';
import { api } from '../services/api.js';
import type { Product } from '../types/index.js';
import { useQuoteBasket } from '../context/QuoteBasketContext.js';
import { useToast } from '../context/ToastContext.js';
import '../styles/products.css';
import {
  Wheat,
  Boxes,
  Layers,
  Search,
  X,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Star,
  Heart,
  Globe,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Check,
  Cog,
  Filter,
  Shirt,
  Cpu,
  FlaskConical,
  HeartPulse,
  Home,
  Car,
  Grid,
  ArrowRight,
  LayoutGrid,
  List,
  ArrowUpDown,
} from 'lucide-react';

interface OutletContextType {
  openQuoteModal?: (productOrServiceName?: string) => void;
}

const ORIGIN_FLAGS: Record<string, string> = {
  India: '🇮🇳',
  Peru: '🇵🇪',
  Canada: '🇨🇦',
  Australia: '🇦🇺',
  'Sri Lanka': '🇱🇰',
  Indonesia: '🇮🇩',
  Thailand: '🇹🇭',
  Italy: '🇮🇹',
  Ukraine: '🇺🇦',
  Malaysia: '🇲🇾',
  Spain: '🇪🇸',
  USA: '🇺🇸',
  Brazil: '🇧🇷',
  Germany: '🇩🇪',
  Japan: '🇯🇵',
  Vietnam: '🇻🇳',
};

interface ReferenceCategory {
  id: string;
  name: string;
  colorClass: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const REFERENCE_CATEGORIES: ReferenceCategory[] = [
  { id: 'cat-agriculture-food', name: 'Agriculture & Food', colorClass: 'cat-agri-food', icon: Wheat },
  { id: 'cat-textiles-apparel', name: 'Textiles & Apparel', colorClass: 'cat-textiles', icon: Shirt },
  { id: 'cat-electronics-electricals', name: 'Electronics & Electricals', colorClass: 'cat-electronics', icon: Cpu },
  { id: 'cat-machinery-equipment', name: 'Machinery & Equipment', colorClass: 'cat-machinery', icon: Cog },
  { id: 'cat-chemicals-plastics', name: 'Chemicals & Plastics', colorClass: 'cat-chemicals', icon: FlaskConical },
  { id: 'cat-metals-minerals', name: 'Metals & Minerals', colorClass: 'cat-metals', icon: Boxes },
  { id: 'cat-health-pharma', name: 'Health & Pharma', colorClass: 'cat-health', icon: HeartPulse },
  { id: 'cat-home-lifestyle', name: 'Home & Lifestyle', colorClass: 'cat-home', icon: Home },
  { id: 'cat-automotive', name: 'Automotive', colorClass: 'cat-auto', icon: Car },
  { id: 'cat-others', name: 'Others', colorClass: 'cat-others', icon: Grid },
];

const REFERENCE_CERTIFICATIONS = [
  'ISO Certified',
  'Organic',
  'Fair Trade',
  'FSC Certified',
];

const mapParamToCategoryName = (param?: string | null): string | null => {
  if (!param || param === 'all') return null;
  const p = param.toLowerCase().trim();
  if (p.includes('agri') || p.includes('rice') || p.includes('grain') || p.includes('spice') || p.includes('pulse') || p.includes('food')) {
    return 'Agriculture & Food';
  }
  if (p.includes('textil') || p.includes('apparel')) return 'Textiles & Apparel';
  if (p.includes('electr')) return 'Electronics & Electricals';
  if (p.includes('machin') || p.includes('equip')) return 'Machinery & Equipment';
  if (p.includes('chemic') || p.includes('plastic') || p.includes('energy')) return 'Chemicals & Plastics';
  if (p.includes('metal') || p.includes('mineral') || p.includes('industr')) return 'Metals & Minerals';
  if (p.includes('health') || p.includes('pharm')) return 'Health & Pharma';
  if (p.includes('home') || p.includes('life')) return 'Home & Lifestyle';
  if (p.includes('auto')) return 'Automotive';
  return null;
};

const getProductGlobalCategory = (p: Product): string => {
  if (p.globalCategory) return p.globalCategory;
  const s = `${p.sectorId || ''} ${p.categoryId || ''} ${p.categoryName || ''}`.toLowerCase();
  if (s.includes('agri') || s.includes('food') || s.includes('spice') || s.includes('rice') || s.includes('grain') || s.includes('pulse')) return 'Agriculture & Food';
  if (s.includes('textil') || s.includes('apparel')) return 'Textiles & Apparel';
  if (s.includes('electr')) return 'Electronics & Electricals';
  if (s.includes('machin') || s.includes('equip')) return 'Machinery & Equipment';
  if (s.includes('chemic') || s.includes('plastic') || s.includes('energy')) return 'Chemicals & Plastics';
  if (s.includes('metal') || s.includes('mineral') || s.includes('industr')) return 'Metals & Minerals';
  if (s.includes('health') || s.includes('pharm')) return 'Health & Pharma';
  if (s.includes('home') || s.includes('life')) return 'Home & Lifestyle';
  if (s.includes('auto')) return 'Automotive';
  return 'Others';
};

const ITEMS_PER_PAGE = 8;

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useQuoteBasket();
  const { showToast } = useToast();
  const outletContext = useOutletContext<OutletContextType>();

  // Filter States
  const urlSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [searchWithin, setSearchWithin] = useState('');

  // URL category/sector parameter
  const rawParam = searchParams.get('category') || searchParams.get('sector');

  // Initialize categories - if explicitly specified in URL and not 'all', map it; otherwise default to []
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (rawParam && rawParam !== 'all') {
      const mapped = mapParamToCategoryName(rawParam);
      return mapped ? [mapped] : [];
    }
    return [];
  });

  // Sync with URL category param when navigated from external links
  useEffect(() => {
    if (rawParam && rawParam !== 'all') {
      const mapped = mapParamToCategoryName(rawParam);
      if (mapped) {
        setSelectedCategories(prev => (prev.includes(mapped) ? prev : [mapped]));
        setCurrentPage(1);
      }
    } else if (rawParam === 'all') {
      setSelectedCategories([]);
    }
  }, [rawParam]);

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState<boolean>(false);
  const [countrySearchText, setCountrySearchText] = useState<string>('');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(10000);
  const [availabilityFilter, setAvailabilityFilter] = useState<{ [key: string]: boolean }>({
    'In Stock': false,
    'Made to Order': false,
  });
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const countryDropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Controls top banner visibility for clean, full-page catalog view
  const [bannerVisible, setBannerVisible] = useState<boolean>(() => {
    const hasParam = searchParams.has('category') || searchParams.has('sector') || searchParams.has('search');
    return !hasParam;
  });

  // Single-Accordion State: all sections closed by default normally (null).
  // When a user opens any section, the previously open section closes automatically.
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  // Sync search param if URL updates
  useEffect(() => {
    if (urlSearch !== undefined) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  // Local Wishlist State
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('conceptexim_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    document.title = 'Commercial Products Catalog — ConceptExim Global Trade';
    api.get<Product[]>('/products').then(res => {
      if (res.success && res.data) {
        setProducts(res.data);
      }
      setLoading(false);
    });
  }, []);

  // Single category metadata when exactly 1 category is selected
  const activeSingleCat = useMemo(() => {
    if (selectedCategories.length === 1) {
      return REFERENCE_CATEGORIES.find(c => c.name === selectedCategories[0]) || null;
    }
    return null;
  }, [selectedCategories]);

  const handleToggleCategory = (catName: string) => {
    setSelectedCategories(prev => {
      const exists = prev.includes(catName);
      const updated = exists ? prev.filter(c => c !== catName) : [...prev, catName];
      if (updated.length === 0) {
        setSearchParams(p => {
          p.delete('category');
          p.delete('sector');
          return p;
        });
      }
      return updated;
    });
    setCurrentPage(1);
    setBannerVisible(false);
  };

  const handleToggleCertification = (cert: string) => {
    setSelectedCertifications(prev => {
      const exists = prev.includes(cert);
      if (exists) {
        return prev.filter(c => c !== cert);
      } else {
        return [...prev, cert];
      }
    });
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    if (mobileFilterOpen) {
      setMobileFilterOpen(false);
    }
    showToast(`Filters applied — ${filteredProducts.length} items found`, 'info');
    const catalogEl = document.querySelector('.products-main-content');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toggle Wishlist
  const toggleWishlist = (productId: string, productName: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast(`Removed ${productName} from wishlist`, 'info');
      } else {
        next.add(productId);
        showToast(`Added ${productName} to wishlist!`, 'success');
      }
      try {
        localStorage.setItem('conceptexim_wishlist', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSearchWithin('');
    setSearchQuery('');
    setPriceMin(0);
    setPriceMax(10000);
    setSelectedCountry('');
    setSelectedCertifications([]);
    setAvailabilityFilter({ 'In Stock': false, 'Made to Order': false });
    setSelectedOrigins([]);
    setSelectedTags([]);
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
    setBannerVisible(false);
    showToast('All filters reset to default view', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute Origin Facet Counts & List
  const originCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      if (p.origin) {
        counts[p.origin] = (counts[p.origin] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const topOrigins = useMemo(() => {
    return Object.keys(originCounts).sort((a, b) => originCounts[b] - originCounts[a]);
  }, [originCounts]);

  const displayedFilteredOrigins = useMemo(() => {
    let list = topOrigins;
    if (countrySearchText.trim()) {
      const q = countrySearchText.toLowerCase().trim();
      list = list.filter(c => c.toLowerCase().includes(q));
    }
    return list;
  }, [topOrigins, countrySearchText]);

  // Category facet counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    REFERENCE_CATEGORIES.forEach(c => {
      counts[c.name] = 0;
    });
    products.forEach(p => {
      const cat = getProductGlobalCategory(p);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Certification facet counts
  const certCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    REFERENCE_CERTIFICATIONS.forEach(cert => {
      counts[cert] = 0;
    });
    products.forEach(p => {
      (p.certifications || []).forEach(cert => {
        if (counts[cert] !== undefined) {
          counts[cert]++;
        }
      });
    });
    return counts;
  }, [products]);

  // Multi-facet Filtering
  const filteredProducts = useMemo(() => {
    return products.filter(prod => {
      const prodCat = getProductGlobalCategory(prod);

      // 1. Category filter - user driven, no default restriction
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(prodCat)) {
          return false;
        }
      }

      // 2. Search within filter (from inside filter card)
      if (searchWithin.trim()) {
        const q = searchWithin.toLowerCase().trim();
        const matchesSearchWithin =
          prod.name.toLowerCase().includes(q) ||
          prod.subtitle?.toLowerCase().includes(q) ||
          prod.origin?.toLowerCase().includes(q) ||
          prod.tag?.toLowerCase().includes(q) ||
          prod.categoryName?.toLowerCase().includes(q) ||
          prod.variety?.toLowerCase().includes(q) ||
          prodCat.toLowerCase().includes(q);
        if (!matchesSearchWithin) return false;
      }

      // 3. Search query filter (from topbar search)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          prod.name.toLowerCase().includes(q) ||
          prod.subtitle?.toLowerCase().includes(q) ||
          prod.origin?.toLowerCase().includes(q) ||
          prod.tag?.toLowerCase().includes(q) ||
          prod.categoryName?.toLowerCase().includes(q) ||
          prod.variety?.toLowerCase().includes(q) ||
          prodCat.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // 4. Origin country filter
      if (selectedCountry) {
        if (prod.origin?.toLowerCase() !== selectedCountry.toLowerCase()) {
          return false;
        }
      }

      // 5. Certifications filter
      if (selectedCertifications.length > 0) {
        const prodCerts = prod.certifications || [];
        const hasAllSelectedCerts = selectedCertifications.every(c => prodCerts.includes(c));
        if (!hasAllSelectedCerts) {
          return false;
        }
      }

      // 6. Price range filter (USD equivalent)
      const usdPrice = Math.round((prod.priceNumber || 0) / 80);
      if (usdPrice > 0) {
        if (priceMin > 0 && usdPrice < priceMin) return false;
        if (priceMax < 10000 && usdPrice > priceMax) return false;
      }

      // 7. Availability filter
      const hasAvailabilityFilter =
        availabilityFilter['In Stock'] || availabilityFilter['Made to Order'];
      if (hasAvailabilityFilter) {
        const isMatch =
          (availabilityFilter['In Stock'] && prod.availability === 'In Stock') ||
          (availabilityFilter['Made to Order'] && prod.availability === 'Made to Order');
        if (!isMatch) return false;
      }

      // 8. Quality Tag filter
      if (selectedTags.length > 0) {
        if (!prod.tag || !selectedTags.some(t => prod.tag?.toLowerCase().includes(t.toLowerCase()))) {
          return false;
        }
      }

      return true;
    });
  }, [
    products,
    selectedCategories,
    searchWithin,
    searchQuery,
    selectedCountry,
    selectedCertifications,
    priceMin,
    priceMax,
    availabilityFilter,
    selectedTags,
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.priceNumber || 0) - (b.priceNumber || 0));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.priceNumber || 0) - (a.priceNumber || 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const startIndex = sortedProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    const catalogEl = document.querySelector('.products-catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Active filter count
  const isPriceFiltered = priceMin > 0 || priceMax < 10000;
  const activeFiltersCount =
    selectedCategories.length +
    (selectedCountry ? 1 : 0) +
    selectedCertifications.length +
    (searchWithin ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (isPriceFiltered ? 1 : 0) +
    (availabilityFilter['In Stock'] ? 1 : 0) +
    (availabilityFilter['Made to Order'] ? 1 : 0) +
    selectedOrigins.length +
    selectedTags.length;

  // Badge class selector
  const getBadgeClass = (tag?: string) => {
    if (!tag) return 'products-badge-default';
    const t = tag.toLowerCase();
    if (t.includes('best') || t.includes('seller')) return 'products-badge-bestseller';
    if (t.includes('organic')) return 'products-badge-organic';
    if (t.includes('export')) return 'products-badge-export';
    if (t.includes('new')) return 'products-badge-new';
    if (t.includes('premium')) return 'products-badge-premium';
    return 'products-badge-default';
  };

  // Reusable Filter Card matching reference design (Desktop Sidebar & Mobile Drawer)
  const renderFilterCards = () => {
    const minPercent = (priceMin / 10000) * 100;
    const maxPercent = (priceMax / 10000) * 100;

    const formatPriceBadge = (min: number, max: number) => {
      const fmt = (v: number) => (v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`);
      return `${fmt(min)}–${max >= 10000 ? '$10k+' : fmt(max)}`;
    };

    const isCategoriesActive = selectedCategories.length > 0;
    const isPriceActive = isPriceFiltered;
    const isCountryActive = Boolean(selectedCountry);
    const isCertActive = selectedCertifications.length > 0;

    const handleClearCategories = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedCategories([]);
      setCurrentPage(1);
    };

    const handleClearPrice = (e: React.MouseEvent) => {
      e.stopPropagation();
      setPriceMin(0);
      setPriceMax(10000);
      setCurrentPage(1);
    };

    const handleClearCountry = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedCountry('');
      setCurrentPage(1);
    };

    const handleClearCertifications = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedCertifications([]);
      setCurrentPage(1);
    };

    return (
      <div className="filter-card-unified" role="region" aria-label="Filter Products">
        {/* 1. Header: Filter icon + Title + Reset All */}
        <div className="filter-card-header">
          <div className="filter-header-title">
            <div className="filter-header-icon-wrap">
              <Filter size={17} strokeWidth={2.3} />
            </div>
            <h2 className="filter-header-main-text">Filter Products</h2>
          </div>
          {activeFiltersCount > 0 ? (
            <button
              type="button"
              className="filter-reset-all-btn active-state"
              onClick={handleResetFilters}
              aria-label="Reset all filters"
              title="Clear all active filters"
            >
              <RotateCcw size={12} strokeWidth={2.5} />
              <span>Reset ({activeFiltersCount})</span>
            </button>
          ) : (
            <button
              type="button"
              className="filter-reset-all-btn"
              onClick={handleResetFilters}
              aria-label="Reset all filters"
            >
              Reset All
            </button>
          )}
        </div>

        {/* 2. Search Within Input */}
        <div className="filter-search-box">
          <Search size={15} className="filter-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search within products..."
            value={searchWithin}
            onChange={e => {
              setSearchWithin(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search within products"
          />
          {searchWithin && (
            <button
              type="button"
              className="filter-search-clear"
              onClick={() => {
                setSearchWithin('');
                setCurrentPage(1);
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* 3. Product Categories Accordion */}
        <div className={`filter-section ${openSection === 'categories' ? 'is-active' : ''} ${isCategoriesActive ? 'is-filtered' : ''}`}>
          <button
            type="button"
            className={`filter-section-header ${openSection === 'categories' ? 'is-open' : ''} ${isCategoriesActive ? 'is-filtered' : ''}`}
            onClick={() => toggleSection('categories')}
            aria-expanded={openSection === 'categories'}
          >
            <div className="filter-section-header-left">
              <div className={`filter-icon-tile tile-categories ${isCategoriesActive ? 'is-filtered' : ''}`}>
                <Grid size={16} strokeWidth={2.2} />
              </div>
              <div className="filter-title-stack">
                <span className="filter-section-title">Product Categories</span>
                <span className={`filter-section-subtitle ${isCategoriesActive ? 'is-active' : ''}`}>
                  {isCategoriesActive ? (
                    <>
                      <span className="filter-active-dot categories" />
                      <span>{selectedCategories.length} selected</span>
                    </>
                  ) : (
                    'Agriculture, Textiles, Tech...'
                  )}
                </span>
              </div>
            </div>
            <div className="filter-section-header-right">
              {isCategoriesActive && (
                <button
                  type="button"
                  className="filter-notification-interactive-badge categories"
                  onClick={handleClearCategories}
                  title={`Active: ${selectedCategories.length} categories selected. Click to clear`}
                  aria-label="Clear selected categories"
                >
                  <span className="badge-normal-val">{selectedCategories.length}</span>
                  <span className="badge-hover-clear" aria-hidden="true">
                    <X size={12} strokeWidth={2.8} />
                  </span>
                </button>
              )}
              <div className={`filter-chevron-circle ${openSection === 'categories' ? 'open' : ''}`}>
                <ChevronRight
                  size={14}
                  strokeWidth={2.5}
                  className={`filter-chevron ${openSection === 'categories' ? 'open' : 'closed'}`}
                />
              </div>
            </div>
          </button>

          {openSection === 'categories' && (
            <div className="filter-section-body">
              <div className="filter-categories-list" role="group" aria-label="Product Categories">
                {REFERENCE_CATEGORIES.map(cat => {
                  const IconComponent = cat.icon;
                  const isChecked = selectedCategories.includes(cat.name);
                  const count = categoryCounts[cat.name] || 0;

                  return (
                    <div
                      key={cat.id}
                      className={`filter-category-row ${isChecked ? 'checked' : ''}`}
                      onClick={() => handleToggleCategory(cat.name)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          handleToggleCategory(cat.name);
                        }
                      }}
                    >
                      <div className="filter-category-left">
                        <div className="filter-custom-checkbox">
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <div className={`filter-category-icon-badge ${cat.colorClass}`}>
                          <IconComponent size={14} strokeWidth={2.2} />
                        </div>
                        <span className="filter-category-name">{cat.name}</span>
                      </div>
                      <span className="filter-category-count">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. Price Range Accordion */}
        <div className={`filter-section ${openSection === 'price' ? 'is-active' : ''} ${isPriceActive ? 'is-filtered' : ''}`}>
          <button
            type="button"
            className={`filter-section-header ${openSection === 'price' ? 'is-open' : ''} ${isPriceActive ? 'is-filtered' : ''}`}
            onClick={() => toggleSection('price')}
            aria-expanded={openSection === 'price'}
          >
            <div className="filter-section-header-left">
              <div className={`filter-icon-tile tile-price ${isPriceActive ? 'is-filtered' : ''}`}>
                <SlidersHorizontal size={16} strokeWidth={2.2} />
              </div>
              <div className="filter-title-stack">
                <span className="filter-section-title">Price Range</span>
                <span className={`filter-section-subtitle ${isPriceActive ? 'is-active' : ''}`}>
                  {isPriceActive ? (
                    <>
                      <span className="filter-active-dot price" />
                      <span>{formatPriceBadge(priceMin, priceMax)}</span>
                    </>
                  ) : (
                    'FOB / CIF Trade Rates ($)'
                  )}
                </span>
              </div>
            </div>
            <div className="filter-section-header-right">
              {isPriceActive && (
                <button
                  type="button"
                  className="filter-notification-interactive-badge price"
                  onClick={handleClearPrice}
                  title={`Active: ${formatPriceBadge(priceMin, priceMax)}. Click to reset`}
                  aria-label="Reset price range"
                >
                  <span className="badge-normal-val">$</span>
                  <span className="badge-hover-clear" aria-hidden="true">
                    <X size={12} strokeWidth={2.8} />
                  </span>
                </button>
              )}
              <div className={`filter-chevron-circle ${openSection === 'price' ? 'open' : ''}`}>
                <ChevronRight
                  size={14}
                  strokeWidth={2.5}
                  className={`filter-chevron ${openSection === 'price' ? 'open' : 'closed'}`}
                />
              </div>
            </div>
          </button>

          {openSection === 'price' && (
            <div className="filter-section-body">
              <div className="filter-slider-container">
                <div className="filter-dual-slider-wrap">
                  <div
                    className="filter-slider-active-bar"
                    style={{
                      left: `${minPercent}%`,
                      width: `${Math.max(0, maxPercent - minPercent)}%`,
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceMin}
                    onChange={e => {
                      const val = Math.min(Number(e.target.value), priceMax - 100);
                      setPriceMin(Math.max(0, val));
                      setCurrentPage(1);
                    }}
                    className="filter-range-input range-min"
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceMax}
                    onChange={e => {
                      const val = Math.max(Number(e.target.value), priceMin + 100);
                      setPriceMax(val);
                      setCurrentPage(1);
                    }}
                    className="filter-range-input range-max"
                    aria-label="Maximum price"
                  />
                </div>
                <div className="filter-price-labels">
                  <span>${priceMin.toLocaleString()}</span>
                  <span>
                    {priceMax >= 10000
                      ? '$10,000+'
                      : `$${priceMax.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Origin Country Accordion */}
        <div className={`filter-section ${openSection === 'origin' ? 'is-active' : ''} ${isCountryActive ? 'is-filtered' : ''}`} ref={countryDropdownRef}>
          <button
            type="button"
            className={`filter-section-header ${openSection === 'origin' ? 'is-open' : ''} ${isCountryActive ? 'is-filtered' : ''}`}
            onClick={() => toggleSection('origin')}
            aria-expanded={openSection === 'origin'}
          >
            <div className="filter-section-header-left">
              <div className={`filter-icon-tile tile-origin ${isCountryActive ? 'is-filtered' : ''}`}>
                <Globe size={16} strokeWidth={2.2} />
              </div>
              <div className="filter-title-stack">
                <span className="filter-section-title">Origin Country</span>
                <span className={`filter-section-subtitle ${isCountryActive ? 'is-active' : ''}`}>
                  {isCountryActive ? (
                    <>
                      <span className="filter-active-dot origin" />
                      <span>{ORIGIN_FLAGS[selectedCountry] || '🌐'} {selectedCountry}</span>
                    </>
                  ) : (
                    'Global Ports & Origins'
                  )}
                </span>
              </div>
            </div>
            <div className="filter-section-header-right">
              {isCountryActive && (
                <button
                  type="button"
                  className="filter-notification-interactive-badge origin"
                  onClick={handleClearCountry}
                  title={`Active: ${selectedCountry}. Click to clear`}
                  aria-label="Clear selected country"
                >
                  <span className="badge-normal-val">1</span>
                  <span className="badge-hover-clear" aria-hidden="true">
                    <X size={12} strokeWidth={2.8} />
                  </span>
                </button>
              )}
              <div className={`filter-chevron-circle ${openSection === 'origin' ? 'open' : ''}`}>
                <ChevronRight
                  size={14}
                  strokeWidth={2.5}
                  className={`filter-chevron ${openSection === 'origin' ? 'open' : 'closed'}`}
                />
              </div>
            </div>
          </button>

          {openSection === 'origin' && (
            <div className="filter-section-body">
              <div className="filter-country-select-wrap">
                <button
                  type="button"
                  className={`filter-country-trigger ${countryDropdownOpen ? 'is-open' : ''}`}
                  onClick={() => setCountryDropdownOpen(prev => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={countryDropdownOpen}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {selectedCountry ? (
                      <>
                        <span>{ORIGIN_FLAGS[selectedCountry] || '🌐'}</span>
                        <span style={{ fontWeight: 600, color: '#0B1B3D' }}>{selectedCountry}</span>
                      </>
                    ) : (
                      <span style={{ color: '#64748B' }}>Select Country</span>
                    )}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {selectedCountry && (
                      <span
                        className="filter-country-clear"
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedCountry('');
                          setCurrentPage(1);
                        }}
                        title="Clear country"
                      >
                        <X size={14} />
                      </span>
                    )}
                    <ChevronDown size={15} style={{ color: '#64748B' }} />
                  </div>
                </button>

                {countryDropdownOpen && (
                  <div className="filter-country-menu" role="listbox">
                    <div className="filter-country-search-wrap">
                      <input
                        type="text"
                        className="filter-country-search-input"
                        placeholder="Search country..."
                        value={countrySearchText}
                        onChange={e => setCountrySearchText(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        autoFocus
                      />
                    </div>
                    <div className="filter-country-options">
                      <div
                        className={`filter-country-option ${!selectedCountry ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedCountry('');
                          setCountryDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                      >
                        <span>🌐 All Countries</span>
                        <span>({products.length})</span>
                      </div>
                      {displayedFilteredOrigins.map(country => (
                        <div
                          key={country}
                          className={`filter-country-option ${selectedCountry === country ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedCountry(country);
                            setCountryDropdownOpen(false);
                            setCurrentPage(1);
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span>{ORIGIN_FLAGS[country] || '🌐'}</span>
                            <span>{country}</span>
                          </span>
                          <span>({originCounts[country] || 0})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 6. Certification Accordion */}
        <div className={`filter-section ${openSection === 'certifications' ? 'is-active' : ''} ${isCertActive ? 'is-filtered' : ''}`}>
          <button
            type="button"
            className={`filter-section-header ${openSection === 'certifications' ? 'is-open' : ''} ${isCertActive ? 'is-filtered' : ''}`}
            onClick={() => toggleSection('certifications')}
            aria-expanded={openSection === 'certifications'}
          >
            <div className="filter-section-header-left">
              <div className={`filter-icon-tile tile-certifications ${isCertActive ? 'is-filtered' : ''}`}>
                <ShieldCheck size={16} strokeWidth={2.2} />
              </div>
              <div className="filter-title-stack">
                <span className="filter-section-title">Certifications</span>
                <span className={`filter-section-subtitle ${isCertActive ? 'is-active' : ''}`}>
                  {isCertActive ? (
                    <>
                      <span className="filter-active-dot certifications" />
                      <span>
                        {selectedCertifications.length} verified standard{selectedCertifications.length > 1 ? 's' : ''}
                      </span>
                    </>
                  ) : (
                    'ISO, Halal, Organic & Trade'
                  )}
                </span>
              </div>
            </div>
            <div className="filter-section-header-right">
              {isCertActive && (
                <button
                  type="button"
                  className="filter-notification-interactive-badge certifications"
                  onClick={handleClearCertifications}
                  title={`Active: ${selectedCertifications.length} verified standards. Click to clear`}
                  aria-label="Clear selected certifications"
                >
                  <span className="badge-normal-val">{selectedCertifications.length}</span>
                  <span className="badge-hover-clear" aria-hidden="true">
                    <X size={12} strokeWidth={2.8} />
                  </span>
                </button>
              )}
              <div className={`filter-chevron-circle ${openSection === 'certifications' ? 'open' : ''}`}>
                <ChevronRight
                  size={14}
                  strokeWidth={2.5}
                  className={`filter-chevron ${openSection === 'certifications' ? 'open' : 'closed'}`}
                />
              </div>
            </div>
          </button>

          {openSection === 'certifications' && (
            <div className="filter-section-body">
              <div className="filter-certifications-list">
                {REFERENCE_CERTIFICATIONS.map(cert => {
                  const isChecked = selectedCertifications.includes(cert);
                  const count = certCounts[cert] || 0;

                  return (
                    <div
                      key={cert}
                      className={`filter-cert-row ${isChecked ? 'checked' : ''}`}
                      onClick={() => handleToggleCertification(cert)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          handleToggleCertification(cert);
                        }
                      }}
                    >
                      <div className="filter-cert-left">
                        <div className="filter-custom-checkbox">
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span className="filter-cert-name">{cert}</span>
                      </div>
                      <span className="filter-category-count">({count})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 7. Bottom Apply Filters Button */}
        <button
          type="button"
          className="filter-apply-btn"
          onClick={handleApplyFilters}
        >
          <span>Apply Filters</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className={`products-page-wrapper ${bannerVisible ? 'banner-expanded' : 'banner-collapsed'}`}>
      {/* 1. Global Maritime Trade Hero Banner */}
      <section
        className={`products-hero-banner ${bannerVisible ? 'is-visible' : 'is-hidden'}`}
        style={{ backgroundImage: "url('/conceptexim-hero-bg.png')" }}
        aria-label="Products Catalog Banner"
      >
        <div className="products-hero-overlay" />
        <div className="products-hero-container">
          <div className="products-hero-content">
            <div className="products-hero-eyebrow">
              <Sparkles size={13} aria-hidden="true" />
              <span>COMMERCIAL EXPORT CATALOG</span>
            </div>

            <h1 className="products-hero-title">
              Our <span className="products-hero-gold">Products</span>
            </h1>

            <p className="products-hero-desc">
              High-quality agro-commodities, industrial materials, textiles, machinery, energy and trade goods sourced directly from verified primary suppliers for global markets.
            </p>

            <div className="products-hero-actions-row">
              <button
                type="button"
                onClick={() => {
                  setBannerVisible(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="products-hero-explore-btn"
                title="Enter complete products catalog"
              >
                <span>Enter Products Catalog</span>
                <ChevronDown size={15} />
              </button>

              <div className="products-hero-badges">
                <span className="products-hero-badge-item">
                  <Globe size={14} aria-hidden="true" />
                  <span>Global Reach</span>
                </span>
                <span className="products-hero-badge-item">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Verified Suppliers</span>
                </span>
                <span className="products-hero-badge-item">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>Quality Assured</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Dismiss Button */}
          <button
            type="button"
            onClick={() => setBannerVisible(false)}
            className="products-hero-dismiss-btn"
            title="Collapse banner for full-screen catalog view"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </section>

      {/* 2. Breadcrumbs & Status Bar */}
      <div className="products-subnav-bar">
        <div className="products-subnav-inner">
          <nav className="products-breadcrumbs" aria-label="Breadcrumb navigation">
            <Link to="/" className="breadcrumb-link home-link" title="Return to Home">
              <Home size={13} strokeWidth={2.2} className="breadcrumb-home-icon" />
              <span>Home</span>
            </Link>
            <ChevronRight size={12} strokeWidth={2.4} className="products-breadcrumbs-sep" aria-hidden="true" />
            {selectedCategories.length === 0 ? (
              <span className="products-breadcrumbs-current" aria-current="page">
                Products
              </span>
            ) : (
              <>
                <Link to="/products" onClick={handleResetFilters} className="breadcrumb-link" title="View all products">
                  Products
                </Link>
                <ChevronRight size={12} strokeWidth={2.4} className="products-breadcrumbs-sep" aria-hidden="true" />
                <span className="products-breadcrumbs-current" aria-current="page">
                  <span className="breadcrumb-category-dot" />
                  {selectedCategories.length === 1
                    ? selectedCategories[0]
                    : `${selectedCategories.length} Categories Selected`}
                </span>
              </>
            )}
          </nav>

          <div className="products-subnav-right">
            <div className="products-count-tag" title="Catalogue results summary">
              <span className="products-count-live-dot" aria-hidden="true" />
              <span className="products-count-text">
                Showing <strong className="count-num">{startIndex}-{endIndex}</strong> of <strong className="count-num">{sortedProducts.length}</strong> products
              </span>
            </div>

            <button
              type="button"
              onClick={() => setBannerVisible(prev => !prev)}
              className={`products-banner-toggle-pill ${bannerVisible ? 'is-expanded' : 'is-collapsed'}`}
              title={bannerVisible ? 'Collapse commercial banner for full-screen catalog' : 'Expand commercial overview banner'}
              aria-label={bannerVisible ? 'Collapse banner' : 'Expand banner'}
            >
              <span className="toggle-icon-wrap">
                {bannerVisible ? (
                  <ChevronUp size={13} strokeWidth={2.5} />
                ) : (
                  <ChevronDown size={13} strokeWidth={2.5} />
                )}
              </span>
              <span>{bannerVisible ? 'Full Page' : 'Show Banner'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Catalog Section: Sidebar + Main Content Grid */}
      <section className="products-catalog-section">
        <div className="products-catalog-container">
          {/* Left Sidebar Filter Panel */}
          <aside
            className={`products-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}
            aria-label="Product Filters"
          >
            {mobileFilterOpen ? (
              <div className="products-sidebar-drawer">
                <div className="products-mobile-drawer-header">
                  <div className="products-mobile-drawer-title">
                    <SlidersHorizontal size={18} />
                    <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                  </div>
                  <button
                    type="button"
                    className="products-mobile-drawer-close"
                    onClick={() => setMobileFilterOpen(false)}
                    aria-label="Close filters drawer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="products-mobile-drawer-body">
                  {renderFilterCards()}
                </div>

                <div className="products-mobile-drawer-footer">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleResetFilters}
                    style={{ flex: 1 }}
                  >
                    Reset All
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setMobileFilterOpen(false)}
                    style={{ flex: 2 }}
                  >
                    View ({sortedProducts.length})
                  </button>
                </div>
              </div>
            ) : (
              renderFilterCards()
            )}
          </aside>

          {/* Right Main Content Area */}
          <main className="products-main-content">
            {/* Main Header with Category Title & Description */}
            {/* Executive Main Header Deck */}
            <div className="products-main-header">
              {/* Decorative Subtle Watermark */}
              <div className="products-header-watermark" aria-hidden="true">
                <Globe size={180} />
              </div>

              {/* 1. Header Top Meta Row: Live Status, Sector Pill, Verified Origin, Live Count */}
              <div className="products-header-top-row">
                <div className="products-header-meta-left">
                  <span className="products-live-tag">
                    <span className="products-live-dot" />
                    <span>Live Trade Catalog</span>
                  </span>
                  {selectedCategories.length === 1 && activeSingleCat ? (
                    <span className={`products-sector-eyebrow-pill ${activeSingleCat.colorClass || ''}`}>
                      {React.createElement(activeSingleCat.icon, { size: 14, strokeWidth: 2.2 })}
                      <span>{selectedCategories[0].toUpperCase()}</span>
                    </span>
                  ) : selectedCategories.length > 1 ? (
                    <span className="products-sector-eyebrow-pill sector-all">
                      <Layers size={14} strokeWidth={2.2} />
                      <span>{selectedCategories.length} CATEGORIES FILTERED</span>
                    </span>
                  ) : (
                    <span className="products-verified-pill">
                      <ShieldCheck size={12} />
                      <span>Direct Origin QA</span>
                    </span>
                  )}
                </div>

                <div className="products-header-count-badge">
                  <span className="count-dot">●</span>
                  <span>
                    <strong>{filteredProducts.length}</strong> Commodities Ready to Export
                  </span>
                </div>
              </div>

              {/* 2. Main Title & Description */}
              <div className="products-main-title-wrap">
                <h2 className="products-main-category-title">
                  {selectedCategories.length === 0 ? (
                    <>
                      Commercial <span className="products-title-highlight">Products Catalog</span>
                    </>
                  ) : selectedCategories.length === 1 ? (
                    <>
                      <span className="products-title-highlight">{selectedCategories[0]}</span> Export Commodities
                    </>
                  ) : (
                    <>
                      Filtered <span className="products-title-highlight">Trade Commodities</span> ({selectedCategories.length} Categories)
                    </>
                  )}
                </h2>
                <p className="products-main-category-desc">
                  {selectedCategories.length === 0
                    ? 'Explore our complete commercial multi-sector catalog powering global trade across agro-commodities, industrial materials, textiles, machinery, and global trade goods directly sourced from verified primary suppliers.'
                    : selectedCategories.length === 1
                    ? `Export-grade ${selectedCategories[0].toLowerCase()} commodities meeting international inspection standards, complete with Phytosanitary/COA certifications and global CIF/FOB delivery terms.`
                    : `Displaying commercial trade products matching your selected categories: ${selectedCategories.join(', ')}.`}
                </p>
              </div>

              {/* 3. Controls Toolbar: Showing Stats + Search + Sort + View Switcher */}
              <div className="products-controls-bar">
                <div className="products-controls-left">
                  <span className="products-results-stats">
                    Showing <strong>{startIndex}–{endIndex}</strong> of{' '}
                    <strong>{sortedProducts.length}</strong> items
                  </span>
                </div>

                <div className="products-controls-right">
                  {/* Mobile Filter Drawer Button */}
                  <button
                    type="button"
                    className="products-mobile-filter-btn"
                    onClick={() => setMobileFilterOpen(true)}
                    aria-label="Open filter options"
                  >
                    <SlidersHorizontal size={15} />
                    <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                  </button>

                  {/* Search Input Box */}
                  <div className="products-search-box">
                    <Search size={15} className="products-search-icon" aria-hidden="true" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search commodities..."
                      className="products-search-input"
                      aria-label="Search catalog products"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="products-search-clear"
                        aria-label="Clear search input"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Sort By Dropdown */}
                  <div className="products-sort-box">
                    <ArrowUpDown size={13} className="products-sort-icon" />
                    <span className="products-sort-label">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="products-sort-select"
                      aria-label="Sort products by"
                    >
                      <option value="featured">Featured Trade</option>
                      <option value="rating">Top Rated</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>

                  {/* View Switcher: Grid vs List */}
                  <div className="products-view-switcher" role="radiogroup" aria-label="Catalog layout view">
                    <button
                      type="button"
                      className={`products-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                      title="Grid view"
                    >
                      <LayoutGrid size={15} />
                    </button>
                    <button
                      type="button"
                      className={`products-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                      title="List view"
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Chips (if any filters applied) */}
            {activeFiltersCount > 0 && (
              <div className="products-active-chips" aria-label="Active filters">
                <span className="products-active-chips-label">Active Filters:</span>

                {selectedCategories.map(cat => (
                  <span key={cat} className="products-chip">
                    <span>Category: {cat}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleCategory(cat)}
                      className="products-chip-remove"
                      aria-label={`Remove category ${cat}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {selectedCountry && (
                  <span className="products-chip">
                    <span>Origin: {ORIGIN_FLAGS[selectedCountry] || '🌐'} {selectedCountry}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedCountry('')}
                      className="products-chip-remove"
                      aria-label="Remove country filter"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedCertifications.map(cert => (
                  <span key={cert} className="products-chip">
                    <span>Cert: {cert}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleCertification(cert)}
                      className="products-chip-remove"
                      aria-label={`Remove certification ${cert}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {isPriceFiltered && (
                  <span className="products-chip">
                    <span>
                      Price: ${priceMin.toLocaleString()} – {priceMax >= 10000 ? '$10,000+' : `$${priceMax.toLocaleString()}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPriceMin(0);
                        setPriceMax(10000);
                      }}
                      className="products-chip-remove"
                      aria-label="Remove price filter"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {searchWithin && (
                  <span className="products-chip">
                    <span>Within: "{searchWithin}"</span>
                    <button
                      type="button"
                      onClick={() => setSearchWithin('')}
                      className="products-chip-remove"
                      aria-label="Clear within search"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="products-chip">
                    <span>Search: "{searchQuery}"</span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="products-chip-remove"
                      aria-label="Clear search filter"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {availabilityFilter['In Stock'] && (
                  <span className="products-chip">
                    <span>In Stock</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAvailabilityFilter(prev => ({ ...prev, 'In Stock': false }))
                      }
                      className="products-chip-remove"
                      aria-label="Remove In Stock filter"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {availabilityFilter['Made to Order'] && (
                  <span className="products-chip">
                    <span>Made to Order</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAvailabilityFilter(prev => ({ ...prev, 'Made to Order': false }))
                      }
                      className="products-chip-remove"
                      aria-label="Remove Made to Order filter"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedTags.map(tag => (
                  <span key={tag} className="products-chip">
                    <span>Grade: {tag}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedTags(prev => prev.filter(t => t !== tag))
                      }
                      className="products-chip-remove"
                      aria-label={`Remove grade ${tag}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="products-clear-all-chips"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* 4-Column Commercial Products Grid */}
            {loading ? (
              <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748B' }}>
                <p>Loading commercial commodities catalog...</p>
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div className={`products-grid ${viewMode === 'list' ? 'is-list-view' : ''}`} role="list">
                {paginatedProducts.map(prod => {
                  const isWishlisted = wishlist.has(prod.id);
                  const badgeClass = getBadgeClass(prod.tag);

                  return (
                    <div key={prod.id} className="products-card" role="listitem">
                      {/* Image Box with Badge and Wishlist Heart */}
                      <div className="products-card-media">
                        {prod.tag && (
                          <span className={`products-card-badge ${badgeClass}`}>{prod.tag}</span>
                        )}

                        <button
                          type="button"
                          className={`products-card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                          onClick={() => toggleWishlist(prod.id, prod.name)}
                          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                        >
                          <Heart
                            size={16}
                            fill={isWishlisted ? '#EF4444' : 'none'}
                            stroke={isWishlisted ? '#EF4444' : 'currentColor'}
                          />
                        </button>

                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="products-card-img"
                          loading="lazy"
                          onError={e => {
                            // Fallback to category image if missing
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = '/assets/categories/rice-grains.jpg';
                          }}
                        />
                      </div>

                      {/* Card Content Body */}
                      <div className="products-card-body">
                        <span className="products-card-sector-tag">
                          {prod.sectorName || prod.categoryName || 'Global Sector'}
                        </span>

                        <h3 className="products-card-title">
                          <Link to={`/products/${prod.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {prod.name}
                          </Link>
                        </h3>

                        <div className="products-card-subtitle" title={prod.subtitle}>
                          {prod.subtitle}
                        </div>

                        {/* Origin Row */}
                        <div className="products-card-origin-row">
                          <span className="products-card-origin-flag">
                            {prod.originFlag || ORIGIN_FLAGS[prod.origin] || '🌐'}
                          </span>
                          <span className="products-card-origin-text">Origin:</span>
                          <span className="products-card-origin-country">{prod.origin}</span>
                        </div>

                        {/* Indicative Wholesale Trade Rate */}
                        <div className="products-card-price-row">
                          <span className="products-card-price-label">Indicative Trade Rate</span>
                          <span className="products-card-price-val">
                            {prod.priceDisplay || `₹${(prod.priceNumber || 0).toLocaleString('en-IN')} / MT`}
                          </span>
                        </div>

                        {/* Meta Specs / Rating Row */}
                        <div className="products-card-meta-row">
                          <span className="products-card-rating">
                            <Star size={12} fill="#D97706" color="#D97706" />
                            <span>{prod.rating || 4.8}</span>
                            <span style={{ color: '#94A3B8', fontWeight: 500 }}>
                              ({prod.reviewCount || 45})
                            </span>
                          </span>

                          <span className="products-card-moq">
                            {prod.availability === 'In Stock' ? 'In Stock' : 'Custom MOQ'}
                          </span>
                        </div>

                        {/* Dual Action Buttons */}
                        <div className="products-card-actions">
                          <Link to={`/products/${prod.slug}`} className="products-btn-details">
                            <span>View Details</span>
                          </Link>

                          <button
                            type="button"
                            className="products-btn-enquire"
                            onClick={() => {
                              addItem(prod);
                              if (outletContext?.openQuoteModal) {
                                outletContext.openQuoteModal(prod.name);
                              }
                              showToast(`Added ${prod.name} to RFQ Basket!`, 'success');
                            }}
                            title="Add to quotation basket & submit trade inquiry"
                          >
                            <span>Enquire</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Zero Results Empty State */
              <div className="products-empty-state">
                <div className="products-empty-icon">
                  <RotateCcw size={26} />
                </div>
                <h3 className="products-empty-title">No matching commodities found</h3>
                <p className="products-empty-desc">
                  We couldn't find any products matching your current search criteria or active filters.
                  Try clearing your filters or send our trade desk a custom procurement inquiry.
                </p>
                <div className="products-empty-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleResetFilters}
                  >
                    <span>Reset All Filters</span>
                  </button>
                  {outletContext?.openQuoteModal && (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() =>
                        outletContext.openQuoteModal?.(
                          selectedCategories[0] || 'Custom Product Sourcing'
                        )
                      }
                    >
                      <span>Request Custom Sourcing Quote</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Pagination Controls Bar */}
            {totalPages > 1 && (
              <div className="products-pagination-wrap">
                <div className="products-count-tag">
                  Showing {startIndex}-{endIndex} of {sortedProducts.length} products
                </div>

                <div className="products-pagination-controls" aria-label="Pagination">
                  <button
                    type="button"
                    className="products-page-btn"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                    <button
                      key={num}
                      type="button"
                      className={`products-page-btn ${currentPage === num ? 'active' : ''}`}
                      onClick={() => handlePageChange(num)}
                      aria-label={`Page ${num}`}
                      aria-current={currentPage === num ? 'page' : undefined}
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="products-page-btn"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
};
