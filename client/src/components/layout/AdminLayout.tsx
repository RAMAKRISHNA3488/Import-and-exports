import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar.js';
import { AdminHeader } from './AdminHeader.js';
import { ArrowUp } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('admin_sidebar_collapsed') === 'true';
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => {
        const next = !prev;
        localStorage.setItem('admin_sidebar_collapsed', String(next));
        return next;
      });
    }
  };

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        handleToggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScroll = () => {
    if (contentRef.current) {
      setShowScrollTop(contentRef.current.scrollTop > 240);
    }
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`admin-root ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar
        isOpen={mobileSidebarOpen}
        isCollapsed={sidebarCollapsed}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="admin-main">
        <AdminHeader
          isCollapsed={sidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="admin-content"
          id="admin-main-scroll-container"
        >
          <Outlet />

          {/* Floating Back to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="admin-scroll-top-btn"
              title="Scroll back to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={15} />
              <span>Back to Top</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
