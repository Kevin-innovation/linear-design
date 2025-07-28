'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeProvider';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: {
    name: string;
    href: string;
    logo?: React.ReactNode;
  };
  items?: NavItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  blur?: boolean;
  compact?: boolean;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({
    brand = { name: 'Linear Design', href: '/' },
    items = [],
    actions,
    sticky = true,
    transparent = false,
    blur = true,
    compact = false,
    className = '',
    style,
    ...props
  }, ref) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
      if (!sticky && !transparent) return;

      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [sticky, transparent]);

    const navbarStyle: React.CSSProperties = {
      position: sticky ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 'var(--linear-header)',
      height: compact ? '56px' : 'var(--linear-header-height)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 var(--linear-space-6)',
      backgroundColor: transparent && !isScrolled 
        ? 'transparent' 
        : 'var(--linear-bg-primary)',
      borderBottom: transparent && !isScrolled 
        ? 'none' 
        : '1px solid var(--linear-border-subtle)',
      backdropFilter: blur ? 'blur(20px)' : 'none',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
      ...style,
    };

    const containerStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const brandStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--linear-space-2)',
      fontSize: 'var(--linear-text-title2)',
      fontWeight: 'var(--linear-font-weight-semibold)',
      color: 'var(--linear-text-primary)',
      textDecoration: 'none',
      transition: 'color var(--linear-duration-normal) var(--linear-easing)',
    };

    const navListStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--linear-space-6)',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    };

    const mobileNavListStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'var(--linear-bg-primary)',
      border: '1px solid var(--linear-border-primary)',
      borderTop: 'none',
      borderRadius: '0 0 var(--linear-radius-xl) var(--linear-radius-xl)',
      padding: 'var(--linear-space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--linear-space-3)',
      backdropFilter: blur ? 'blur(20px)' : 'none',
      transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
      opacity: isMobileMenuOpen ? 1 : 0,
      visibility: isMobileMenuOpen ? 'visible' : 'hidden',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
    };

    const navItemStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-regular)',
      fontWeight: 'var(--linear-font-weight-medium)',
      color: 'var(--linear-text-secondary)',
      textDecoration: 'none',
      padding: 'var(--linear-space-2) var(--linear-space-3)',
      borderRadius: 'var(--linear-radius-md)',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
    };

    const activeNavItemStyle: React.CSSProperties = {
      ...navItemStyle,
      color: 'var(--linear-text-primary)',
      backgroundColor: 'var(--linear-surface-selected)',
    };

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--linear-space-3)',
    };

    const mobileMenuButtonStyle: React.CSSProperties = {
      display: 'none',
      width: '40px',
      height: '40px',
      border: 'none',
      backgroundColor: 'transparent',
      color: 'var(--linear-text-primary)',
      cursor: 'pointer',
      borderRadius: 'var(--linear-radius-md)',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color var(--linear-duration-normal) var(--linear-easing)',
    };

    const handleNavItemHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!e.currentTarget.classList.contains('active')) {
        e.currentTarget.style.backgroundColor = 'var(--linear-surface-hover)';
        e.currentTarget.style.color = 'var(--linear-text-primary)';
      }
    };

    const handleNavItemLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!e.currentTarget.classList.contains('active')) {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--linear-text-secondary)';
      }
    };

    const handleBrandHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = 'var(--linear-accent)';
    };

    const handleBrandLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = 'var(--linear-text-primary)';
    };

    const handleMobileMenuToggle = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const navbar = document.querySelector('.linear-navbar');
        if (navbar && !navbar.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      };

      if (isMobileMenuOpen) {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
      }
    }, [isMobileMenuOpen]);

    return (
      <>
        <nav
          ref={ref}
          style={navbarStyle}
          className={`linear-navbar ${className}`}
          {...props}
        >
          <div style={containerStyle}>
            {/* Brand */}
            <Link
              href={brand.href}
              style={brandStyle}
              onMouseEnter={handleBrandHover}
              onMouseLeave={handleBrandLeave}
            >
              {brand.logo}
              {brand.name}
            </Link>

            {/* Desktop Navigation */}
            {items.length > 0 && (
              <nav style={{ display: 'flex' }} className="desktop-nav">
                <ul style={navListStyle}>
                  {items.map((item, index) => (
                    <li key={index}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={item.active ? activeNavItemStyle : navItemStyle}
                          className={item.active ? 'active' : ''}
                          onMouseEnter={handleNavItemHover}
                          onMouseLeave={handleNavItemLeave}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          style={item.active ? activeNavItemStyle : navItemStyle}
                          className={item.active ? 'active' : ''}
                          onMouseEnter={handleNavItemHover}
                          onMouseLeave={handleNavItemLeave}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Actions */}
            <div style={actionsStyle}>
              {actions}
              <ThemeToggle variant="icon" />
              
              {/* Mobile Menu Button */}
              <button
                style={mobileMenuButtonStyle}
                onClick={handleMobileMenuToggle}
                aria-label="Toggle mobile menu"
                className="mobile-menu-button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {items.length > 0 && (
            <div style={mobileNavListStyle} className="mobile-nav">
              {items.map((item, index) => (
                <div key={index}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={item.active ? activeNavItemStyle : navItemStyle}
                      className={item.active ? 'active' : ''}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      style={item.active ? activeNavItemStyle : navItemStyle}
                      className={item.active ? 'active' : ''}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </nav>
        
        {/* Spacer for fixed navbar */}
        {sticky && <div style={{ height: compact ? '56px' : 'var(--linear-header-height)' }} />}
      </>
    );
  }
);

Navbar.displayName = 'Navbar';

// Add responsive styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .linear-navbar .mobile-menu-button {
        display: flex !important;
      }
      .linear-navbar .desktop-nav {
        display: none !important;
      }
    }
    
    @media (min-width: 769px) {
      .linear-navbar .mobile-menu-button {
        display: none !important;
      }
      .linear-navbar .mobile-nav {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}