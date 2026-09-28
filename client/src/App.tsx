import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.js';
import { AuthProvider } from './context/AuthContext.js';
import { QuoteBasketProvider } from './context/QuoteBasketContext.js';

import { PublicLayout } from './components/layout/PublicLayout.js';
import { AdminLayout } from './components/layout/AdminLayout.js';
import { ProtectedRoute } from './components/common/ProtectedRoute.js';

import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { ServicesPage } from './pages/ServicesPage.js';
import { ServiceDetailPage } from './pages/ServiceDetailPage.js';
import { GlobalPresencePage } from './pages/GlobalPresencePage.js';
import { QualityPage } from './pages/QualityPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.js';
import { TermsPage } from './pages/TermsPage.js';

import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.js';
import { AdminProductsPage } from './pages/admin/AdminProductsPage.js';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage.js';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage.js';
import { AdminShipmentsPage } from './pages/admin/AdminShipmentsPage.js';
import { AdminQuotesPage } from './pages/admin/AdminQuotesPage.js';
import { AdminGlobalPresencePage } from './pages/admin/AdminGlobalPresencePage.js';
import { AdminDocumentsPage } from './pages/admin/AdminDocumentsPage.js';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage.js';
import { AdminReportsPage } from './pages/admin/AdminReportsPage.js';
import { AdminMarketingPage } from './pages/admin/AdminMarketingPage.js';
import { AdminWebsitePage } from './pages/admin/AdminWebsitePage.js';
import { AdminUsersPage } from './pages/admin/AdminUsersPage.js';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage.js';
import { AdminSuppliersPage } from './pages/admin/AdminSuppliersPage.js';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage.js';
import { ScrollToTop } from './components/common/ScrollToTop.js';

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <QuoteBasketProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                <Route path="/global-presence" element={<GlobalPresencePage />} />
                <Route path="/quality" element={<QualityPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/terms-of-service" element={<TermsPage />} />
                <Route path="/terms-and-conditions" element={<TermsPage />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="enquiries" element={<AdminEnquiriesPage />} />
                <Route path="customers" element={<AdminCustomersPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="shipments" element={<AdminShipmentsPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="quotes" element={<AdminQuotesPage />} />
                <Route path="global-presence" element={<AdminGlobalPresencePage />} />
                <Route path="suppliers" element={<AdminSuppliersPage />} />
                <Route path="documents" element={<AdminDocumentsPage />} />
                <Route path="payments" element={<AdminPaymentsPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="marketing" element={<AdminMarketingPage />} />
                <Route path="website" element={<AdminWebsitePage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </QuoteBasketProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
