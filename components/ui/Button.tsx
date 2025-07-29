'use client';

import React from 'react';
import { components } from '@/lib/theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    loading = false, 
    icon, 
    iconPosition = 'left',
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'var(--linear-font-primary)',
      fontWeight: 'var(--linear-font-weight-medium)',
      borderRadius: '9999px', // 완전히 둥근 모서리 (pill 형태)
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
      textDecoration: 'none',
      userSelect: 'none' as const,
      outline: 'none',
      position: 'relative' as const,
      overflow: 'hidden',
    };

    const variantStyles = {
      primary: {
        backgroundColor: loading || disabled ? 'var(--linear-surface-disabled)' : 'var(--linear-accent)',
        color: disabled ? 'var(--linear-text-disabled)' : 'white',
        border: 'none',
        boxShadow: 'var(--linear-shadow-small)',
      },
      secondary: {
        backgroundColor: 'transparent',
        color: disabled ? 'var(--linear-text-disabled)' : 'var(--linear-text-secondary)',
        border: '1px solid var(--linear-border-primary)',
        boxShadow: 'none',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: disabled ? 'var(--linear-text-disabled)' : 'var(--linear-text-primary)',
        border: 'none',
        boxShadow: 'none',
      },
    };

    const sizeStyles = {
      sm: {
        height: '28px',
        padding: '0 12px',
        fontSize: '13px',
        minWidth: '56px',
        maxWidth: 'none',
        width: 'auto',
      },
      md: {
        height: '32px',
        padding: '0 16px',
        fontSize: '13px',
        minWidth: '64px',
        maxWidth: 'none',
        width: 'auto',
      },
      lg: {
        height: '36px',
        padding: '0 20px',
        fontSize: '14px',
        minWidth: '72px',
        maxWidth: 'none',
        width: 'auto',
      },
    };

    const buttonStyle = {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      opacity: disabled ? 0.5 : 1,
    };

    return (
      <button
        ref={ref}
        style={buttonStyle}
        className={`linear-button linear-button-${variant} linear-button-${size} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div
            style={{
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: '2px solid currentColor',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
        )}
        {!loading && children}
        {!loading && icon && iconPosition === 'right' && (
          <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Add keyframes for loading spinner
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}