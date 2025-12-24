
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Store, Category, Coupon, SiteStats 
} from './types';
import { INITIAL_STORES, INITIAL_CATEGORIES, INITIAL_COUPONS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import StoreView from './views/StoreView';
import CategoryView from './views/CategoryView';
import SearchResultsView from './views/SearchResultsView';
import AdminDashboard from './views/AdminDashboard';
import AdminLogin from './views/AdminLogin';

export type Page = 'home' | 'store' | 'category' | 'search' | 'admin' | 'admin-login';

const App: React.FC = () => {
  // Application State
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  
  // Routing State - Initializing to 'admin-login' to satisfy user request to see it immediately
  const [currentPage, setCurrentPage] = useState<Page>('admin-login');
  const [activeParam, setActiveParam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth State (Mocked)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Stats Derived
  const stats: SiteStats = useMemo(() => {
    return {
      totalClicks: coupons.reduce((sum, c) => sum + c.clickCount, 0),
      totalCoupons: coupons.length,
      totalStores: stores.length,
      featuredCoupons: coupons.filter(c => c.isFeatured).length
    };
  }, [coupons, stores]);

  // Sync state with localStorage on mount
  useEffect(() => {
    const savedCoupons = localStorage.getItem('gc_coupons');
    if (savedCoupons) setCoupons(JSON.parse(savedCoupons)); 
    
    const authStatus = localStorage.getItem('gc_admin_auth');
    if (authStatus === 'true') {
      setIsAdminLoggedIn(true);
      // If already logged in, we might want to go to dashboard, 
      // but for this specific request we'll stay on login if not authed or go to admin if authed
      if (currentPage === 'admin-login') setCurrentPage('admin');
    }

    // Private Access Method: Check for ?manage query parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('manage')) {
      setCurrentPage('admin-login');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const saveToStorage = (newCoupons: Coupon[]) => {
    setCoupons(newCoupons);
    localStorage.setItem('gc_coupons', JSON.stringify(newCoupons));
  };

  // Route Guard Middleware
  const navigateTo = useCallback((page: Page, param: string | null = null) => {
    if (page === 'admin' && !isAdminLoggedIn && localStorage.getItem('gc_admin_auth') !== 'true') {
      setCurrentPage('admin-login');
    } else {
      setCurrentPage(page);
    }
    setActiveParam(param);
    window.scrollTo(0, 0);
  }, [isAdminLoggedIn]);

  // Auth Handlers
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('gc_admin_auth', 'true');
    navigateTo('admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('gc_admin_auth');
    navigateTo('home');
  };

  // Tracking Actions
  const trackClick = (couponId: string) => {
    const updated = coupons.map(c => 
      c.id === couponId ? { ...c, clickCount: c.clickCount + 1 } : c
    );
    saveToStorage(updated);
  };

  const trackCopy = (couponId: string) => {
    const updated = coupons.map(c => 
      c.id === couponId ? { ...c, copyCount: c.copyCount + 1 } : c
    );
    saveToStorage(updated);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomeView 
            coupons={coupons.filter(c => c.isActive)} 
            stores={stores} 
            categories={categories}
            onNavigate={navigateTo}
            onTrackClick={trackClick}
            onTrackCopy={trackCopy}
          />
        );
      case 'store':
        const store = stores.find(s => s.slug === activeParam);
        return store ? (
          <StoreView 
            store={store} 
            coupons={coupons.filter(c => c.storeId === store.id && c.isActive)}
            onTrackClick={trackClick}
            onTrackCopy={trackCopy}
          />
        ) : <div className="p-10 text-center">Store not found</div>;
      case 'category':
        const category = categories.find(c => c.slug === activeParam);
        return category ? (
          <CategoryView 
            category={category} 
            coupons={coupons.filter(c => c.categoryId === category.id && c.isActive)}
            stores={stores}
            onTrackClick={trackClick}
            onTrackCopy={trackCopy}
          />
        ) : <div className="p-10 text-center">Category not found</div>;
      case 'search':
        return (
          <SearchResultsView 
            query={searchQuery}
            coupons={coupons.filter(c => 
              c.isActive && (
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stores.find(s => s.id === c.storeId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )}
            stores={stores}
            onTrackClick={trackClick}
            onTrackCopy={trackCopy}
          />
        );
      case 'admin-login':
        return <AdminLogin onLogin={handleLoginSuccess} />;
      case 'admin':
        if (!isAdminLoggedIn) {
          return <AdminLogin onLogin={handleLoginSuccess} />;
        }
        return (
          <AdminDashboard 
            stats={stats}
            coupons={coupons}
            stores={stores}
            categories={categories}
            onUpdateCoupons={saveToStorage}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomeView coupons={coupons} stores={stores} categories={categories} onNavigate={navigateTo} onTrackClick={trackClick} onTrackCopy={trackCopy} />;
    }
  };

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <Header 
        onNavigate={navigateTo} 
        onSearch={(q) => { setSearchQuery(q); navigateTo('search'); }} 
        categories={categories}
        stores={stores}
        isAdmin={isAdminLoggedIn}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
