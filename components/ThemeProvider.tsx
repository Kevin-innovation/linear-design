'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, applyTheme, getStoredTheme } from '@/lib/theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    setThemeState(storedTheme);
    applyTheme(storedTheme);
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'button' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ variant = 'button', size = 'md', className = '', ...props }, ref) => {
    const context = useContext(ThemeContext);
    
    if (!context) {
      // Return a basic button for SSR/initial render
      return (
        <button
          ref={ref}
          className={`linear-theme-toggle ${className}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--linear-radius-lg)',
            border: '1px solid var(--linear-border-primary)',
            backgroundColor: 'transparent',
            color: 'var(--linear-text-secondary)',
            cursor: 'pointer',
          }}
          {...props}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        </button>
      );
    }
    
    const { theme, toggleTheme } = context;

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--linear-space-2)',
      fontFamily: 'var(--linear-font-primary)',
      fontWeight: 'var(--linear-font-weight-medium)',
      borderRadius: 'var(--linear-radius-lg)',
      border: '1px solid var(--linear-border-primary)',
      backgroundColor: 'transparent',
      color: 'var(--linear-text-secondary)',
      cursor: 'pointer',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
      outline: 'none',
    };

    const sizeStyles = {
      sm: {
        height: '32px',
        padding: variant === 'icon' ? '0' : '0 12px',
        width: variant === 'icon' ? '32px' : 'auto',
        fontSize: 'var(--linear-text-small)',
      },
      md: {
        height: '36px',
        padding: variant === 'icon' ? '0' : '0 16px',
        width: variant === 'icon' ? '36px' : 'auto',
        fontSize: 'var(--linear-text-regular)',
      },
      lg: {
        height: '40px',
        padding: variant === 'icon' ? '0' : '0 20px',
        width: variant === 'icon' ? '40px' : 'auto',
        fontSize: 'var(--linear-text-large)',
      },
    };

    const hoverStyles: React.CSSProperties = {
      backgroundColor: 'var(--linear-surface-hover)',
      borderColor: 'var(--linear-border-focus)',
      color: 'var(--linear-text-primary)',
    };

    const buttonStyle: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles[size],
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      Object.assign(e.currentTarget.style, hoverStyles);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.borderColor = 'var(--linear-border-primary)';
      e.currentTarget.style.color = 'var(--linear-text-secondary)';
    };

    const SunIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>
    );

    const MoonIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
      </svg>
    );

    return (
      <button
        ref={ref}
        style={buttonStyle}
        className={`linear-theme-toggle ${className}`}
        onClick={toggleTheme}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        {...props}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        {variant === 'button' && (
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        )}
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';