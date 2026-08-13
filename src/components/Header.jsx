import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="logo-content"
          >
            <span className="logo-icon">✨</span>
            <span className="logo-text">BlogHub</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/categories" className={`nav-link ${isActive('/categories')}`}>Categories</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          
          {user ? (
            <div className="user-menu">
              <span className="user-name">
                <User size={18} />
                {user.name}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/signin" className="nav-link signin">Sign In</Link>
              <Link to="/signup" className="nav-link signup-btn">Sign Up</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="nav-mobile"
        >
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/categories" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Categories
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
          
          {user ? (
            <>
              <div className="user-info">
                <User size={18} />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn-mobile">
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" className="signup-btn-mobile" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </motion.nav>
      )}
    </header>
  );
}
