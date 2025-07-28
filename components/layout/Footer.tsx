'use client';

import React from 'react';
import Link from 'next/link';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: {
    name: string;
    href: string;
    logo?: React.ReactNode;
    description?: string;
  };
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
  showDivider?: boolean;
  compact?: boolean;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({
    brand = { 
      name: 'Linear Design System', 
      href: '/',
      description: 'Linear.app 기반의 완전한 디자인 시스템'
    },
    sections = [],
    socialLinks = [],
    copyright,
    showDivider = true,
    compact = false,
    className = '',
    style,
    ...props
  }, ref) => {
    const currentYear = new Date().getFullYear();
    const defaultCopyright = `© ${currentYear} ${brand.name}. All rights reserved.`;

    const footerStyle: React.CSSProperties = {
      backgroundColor: 'var(--linear-bg-secondary)',
      borderTop: showDivider ? '1px solid var(--linear-border-subtle)' : 'none',
      padding: compact ? 'var(--linear-space-6) 0' : 'var(--linear-space-10) 0 var(--linear-space-6)',
      marginTop: 'auto',
      ...style,
    };

    const containerStyle: React.CSSProperties = {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 var(--linear-space-6)',
    };

    const mainContentStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: compact 
        ? 'repeat(auto-fit, minmax(200px, 1fr))' 
        : sections.length > 0 
          ? `1fr repeat(${Math.min(sections.length, 4)}, minmax(150px, 200px))` 
          : '1fr',
      gap: compact ? 'var(--linear-space-8)' : 'var(--linear-space-10)',
      marginBottom: compact ? 'var(--linear-space-4)' : 'var(--linear-space-6)',
      alignItems: 'start',
    };

    const brandSectionStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--linear-space-3)',
    };

    const brandLinkStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--linear-space-2)',
      fontSize: 'var(--linear-text-title2)',
      fontWeight: 'var(--linear-font-weight-semibold)',
      color: 'var(--linear-text-primary)',
      textDecoration: 'none',
      transition: 'color var(--linear-duration-normal) var(--linear-easing)',
    };

    const brandDescriptionStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      color: 'var(--linear-text-secondary)',
      lineHeight: '1.5',
      maxWidth: '280px',
    };

    const sectionStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--linear-space-3)',
    };

    const sectionTitleStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      fontWeight: 'var(--linear-font-weight-semibold)',
      color: 'var(--linear-text-primary)',
      marginBottom: 'var(--linear-space-2)',
    };

    const linkListStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--linear-space-2)',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    };

    const linkStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      color: 'var(--linear-text-secondary)',
      textDecoration: 'none',
      transition: 'color var(--linear-duration-normal) var(--linear-easing)',
    };

    const bottomSectionStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 'var(--linear-space-4)',
      borderTop: '1px solid var(--linear-border-subtle)',
      flexWrap: 'wrap',
      gap: 'var(--linear-space-3)',
    };

    const copyrightStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-micro)',
      color: 'var(--linear-text-tertiary)',
    };

    const socialLinksStyle: React.CSSProperties = {
      display: 'flex',
      gap: 'var(--linear-space-2)',
      alignItems: 'center',
    };

    const socialLinkStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: 'var(--linear-radius-md)',
      backgroundColor: 'transparent',
      border: '1px solid var(--linear-border-primary)',
      color: 'var(--linear-text-secondary)',
      textDecoration: 'none',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
    };

    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = 'var(--linear-text-link)';
    };

    const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = 'var(--linear-text-secondary)';
    };

    const handleBrandHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = 'var(--linear-accent)';
    };

    const handleBrandLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = 'var(--linear-text-primary)';
    };

    const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.backgroundColor = 'var(--linear-surface-hover)';
      e.currentTarget.style.borderColor = 'var(--linear-border-focus)';
      e.currentTarget.style.color = 'var(--linear-text-primary)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    };

    const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.borderColor = 'var(--linear-border-primary)';
      e.currentTarget.style.color = 'var(--linear-text-secondary)';
      e.currentTarget.style.transform = 'translateY(0)';
    };

    return (
      <footer
        ref={ref}
        style={footerStyle}
        className={`linear-footer ${className}`}
        {...props}
      >
        <div style={containerStyle}>
          <div style={mainContentStyle}>
            {/* Brand Section */}
            <div style={brandSectionStyle}>
              <Link
                href={brand.href}
                style={brandLinkStyle}
                onMouseEnter={handleBrandHover}
                onMouseLeave={handleBrandLeave}
              >
                {brand.logo}
                {brand.name}
              </Link>
              {brand.description && (
                <p style={brandDescriptionStyle}>
                  {brand.description}
                </p>
              )}
            </div>

            {/* Sections */}
            {sections.map((section, index) => (
              <div key={index} style={sectionStyle}>
                <h3 style={sectionTitleStyle}>{section.title}</h3>
                <ul style={linkListStyle}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={linkStyle}
                          onMouseEnter={handleLinkHover}
                          onMouseLeave={handleLinkLeave}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          style={linkStyle}
                          onMouseEnter={handleLinkHover}
                          onMouseLeave={handleLinkLeave}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div style={bottomSectionStyle}>
            <div style={copyrightStyle}>
              {copyright || defaultCopyright}
            </div>

            {socialLinks.length > 0 && (
              <div style={socialLinksStyle}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={socialLinkStyle}
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                    aria-label={social.name}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

// Predefined social icons
export const SocialIcons = {
  GitHub: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Discord: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
    </svg>
  ),
  Figma: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038H8.148zm7.704 0c-2.476 0-4.49-2.015-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02 3.019-1.355 3.019-3.02-1.354-3.019-3.019-3.019zM12.264 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49S14.74 24 12.264 24zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.019-1.355-3.019-3.019-3.019z"/>
    </svg>
  ),
};