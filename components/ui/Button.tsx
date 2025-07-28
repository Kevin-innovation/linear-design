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
      borderRadius: 'var(--linear-radius-lg)',
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
        color: 'white',
        ':hover': !disabled && !loading ? {
          backgroundColor: 'var(--linear-accent-hover)',
          transform: 'translateY(-1px)',
          boxShadow: 'var(--linear-shadow-medium)',
        } : {},
        ':active': !disabled && !loading ? {
          backgroundColor: 'var(--linear-accent-pressed)',
          transform: 'translateY(0)',
        } : {},
      },
      secondary: {
        backgroundColor: 'transparent',
        color: disabled ? 'var(--linear-text-disabled)' : 'var(--linear-text-secondary)',
        border: '1px solid var(--linear-border-primary)',
        ':hover': !disabled && !loading ? {
          backgroundColor: 'var(--linear-surface-hover)',
          borderColor: 'var(--linear-border-focus)',
          color: 'var(--linear-text-primary)',
        } : {},
        ':active': !disabled && !loading ? {
          backgroundColor: 'var(--linear-surface-pressed)',
        } : {},
      },
      ghost: {
        backgroundColor: 'transparent',
        color: disabled ? 'var(--linear-text-disabled)' : 'var(--linear-text-primary)',
        ':hover': !disabled && !loading ? {
          backgroundColor: 'var(--linear-surface-hover)',
        } : {},
        ':active': !disabled && !loading ? {
          backgroundColor: 'var(--linear-surface-pressed)',
        } : {},
      },
    };

    const sizeStyles = {
      sm: {
        height: '32px',
        padding: '0 12px',
        fontSize: 'var(--linear-text-small)',
      },
      md: {
        height: '36px',
        padding: '0 16px',
        fontSize: 'var(--linear-text-regular)',
      },
      lg: {
        height: '40px',
        padding: '0 20px',
        fontSize: 'var(--linear-text-large)',
      },
    };

    const buttonStyle = {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      opacity: disabled ? 0.5 : 1,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        Object.assign(e.currentTarget.style, variantStyles[variant][':hover']);
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        e.currentTarget.style.backgroundColor = variantStyles[variant].backgroundColor;
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
        if (variant === 'secondary') {
          e.currentTarget.style.borderColor = 'var(--linear-border-primary)';
          e.currentTarget.style.color = 'var(--linear-text-secondary)';
        }
      }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        Object.assign(e.currentTarget.style, variantStyles[variant][':active']);
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        Object.assign(e.currentTarget.style, variantStyles[variant][':hover']);
      }
    };

    return (
      <button
        ref={ref}
        style={buttonStyle}
        className={`linear-button linear-button-${variant} linear-button-${size} ${className}`}
        disabled={disabled || loading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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