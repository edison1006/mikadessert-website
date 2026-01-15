import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../data/translations';
import AuthModal from './AuthModal';
import LanguageSelector from './LanguageSelector';

const SiteHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const userMenuRef = useRef(null);

  const navItems = [
    { label: getTranslation(language, 'nav.home'), to: '/' },
    { label: getTranslation(language, 'nav.shop'), to: '/menu', hasDropdown: true },
    { label: getTranslation(language, 'nav.menu'), to: '/menu' },
    { label: getTranslation(language, 'nav.about'), to: '/about', hasDropdown: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleAccountClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="site-header-modern">
      <div className="header-top">
        <div className="brand-modern">
          <div className="logo-circle">
            <span>
              <img
                src="/assets/MIKA-DESSERT_LOGO.JPG"
                alt="Mika Dessert"
                style={{
                  width: '64px',
                  height: '64px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'block',
                }}
              />
            </span>
          </div>
          <div className="brand-text">
            <h1 className="brand-name">Mee Cake</h1>
          </div>
        </div>
        <nav className="nav-modern">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link-modern ${isActive ? 'active' : ''} ${item.hasDropdown ? 'has-dropdown' : ''}`
              }
            >
              {item.label}
              {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={getTranslation(language, 'header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="account-menu-wrapper" ref={userMenuRef}>
            <button
              className="action-btn account-btn"
              aria-label="Account"
              onClick={handleAccountClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{isAuthenticated ? user?.name || user?.email : getTranslation(language, 'header.account')}</span>
            </button>
            {isAuthenticated && showUserMenu && (
              <div className="user-menu">
                <div className="user-menu-header">
                  <div className="user-avatar">
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user?.name || 'User'}</div>
                    <div className="user-email">{user?.email}</div>
                  </div>
                </div>
                <div className="user-menu-divider"></div>
                <button className="user-menu-item" onClick={handleLogout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  {getTranslation(language, 'auth.signOut')}
                </button>
              </div>
            )}
          </div>
          <button className="action-btn cart-btn" aria-label="Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>NZ$0.00 (0)</span>
          </button>
          <LanguageSelector />
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <div className="store-selector">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>{getTranslation(language, 'header.pickingUp')}</span>
        <select className="store-select">
          <option>{getTranslation(language, 'header.selectStore')}</option>
          <option>Auckland Albany Main Store</option>
        </select>
      </div>
    </header>
  );
};

export default SiteHeader;
