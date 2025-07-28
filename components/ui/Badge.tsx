'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    variant = 'default', 
    size = 'md',
    children, 
    dot = false,
    className = '',
    style,
    ...props 
  }, ref) => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: dot ? 'var(--linear-space-1)' : '0',
      fontFamily: 'var(--linear-font-primary)',
      fontWeight: 'var(--linear-font-weight-medium)',
      borderRadius: 'var(--linear-radius-full)',
      border: 'none',
      textDecoration: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
    };

    const variantStyles = {
      default: {
        backgroundColor: 'var(--linear-accent-subtle)',
        color: 'var(--linear-accent)',
        border: '1px solid var(--linear-accent)',
      },
      success: {
        backgroundColor: 'var(--linear-status-success-subtle)',
        color: 'var(--linear-status-success)',
        border: '1px solid var(--linear-status-success)',
      },
      warning: {
        backgroundColor: 'var(--linear-status-warning-subtle)',
        color: 'var(--linear-status-warning)',
        border: '1px solid var(--linear-status-warning)',
      },
      error: {
        backgroundColor: 'var(--linear-status-error-subtle)',
        color: 'var(--linear-status-error)',
        border: '1px solid var(--linear-status-error)',
      },
      info: {
        backgroundColor: 'var(--linear-status-info-subtle)',
        color: 'var(--linear-status-info)',
        border: '1px solid var(--linear-status-info)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--linear-text-secondary)',
        border: '1px solid var(--linear-border-primary)',
      },
    };

    const sizeStyles = {
      sm: {
        height: '20px',
        padding: '0 8px',
        fontSize: 'var(--linear-text-micro)',
      },
      md: {
        height: '24px',
        padding: '0 10px',
        fontSize: 'var(--linear-text-mini)',
      },
      lg: {
        height: '28px',
        padding: '0 12px',
        fontSize: 'var(--linear-text-small)',
      },
    };

    const dotStyle: React.CSSProperties = {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: 'currentColor',
      flexShrink: 0,
    };

    const badgeStyle: React.CSSProperties = {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
    };

    return (
      <span
        ref={ref}
        style={badgeStyle}
        className={`linear-badge linear-badge-${variant} linear-badge-${size} ${className}`}
        {...props}
      >
        {dot && <span style={dotStyle} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'online' | 'offline' | 'busy' | 'away';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ 
    status, 
    size = 'md', 
    showLabel = false,
    className = '',
    style,
    ...props 
  }, ref) => {
    const statusConfig = {
      online: {
        color: 'var(--linear-status-success)',
        label: 'Online',
      },
      offline: {
        color: 'var(--linear-text-tertiary)',
        label: 'Offline',
      },
      busy: {
        color: 'var(--linear-status-error)',
        label: 'Busy',
      },
      away: {
        color: 'var(--linear-status-warning)',
        label: 'Away',
      },
    };

    const sizeConfig = {
      sm: { size: '8px', fontSize: 'var(--linear-text-micro)' },
      md: { size: '10px', fontSize: 'var(--linear-text-mini)' },
      lg: { size: '12px', fontSize: 'var(--linear-text-small)' },
    };

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--linear-space-2)',
      ...style,
    };

    const dotStyle: React.CSSProperties = {
      width: sizeConfig[size].size,
      height: sizeConfig[size].size,
      borderRadius: '50%',
      backgroundColor: statusConfig[status].color,
      flexShrink: 0,
    };

    const labelStyle: React.CSSProperties = {
      fontSize: sizeConfig[size].fontSize,
      color: 'var(--linear-text-secondary)',
      fontWeight: 'var(--linear-font-weight-medium)',
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={`linear-status-indicator linear-status-${status} ${className}`}
        {...props}
      >
        <div style={dotStyle} />
        {showLabel && (
          <span style={labelStyle}>
            {statusConfig[status].label}
          </span>
        )}
      </div>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export interface PriorityBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  priority: 'urgent' | 'high' | 'medium' | 'low';
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export const PriorityBadge = React.forwardRef<HTMLSpanElement, PriorityBadgeProps>(
  ({ 
    priority, 
    size = 'md',
    showIcon = true,
    className = '',
    style,
    ...props 
  }, ref) => {
    const priorityConfig = {
      urgent: {
        color: 'var(--linear-status-error)',
        backgroundColor: 'var(--linear-status-error-subtle)',
        label: 'Urgent',
        icon: '🔴',
      },
      high: {
        color: 'var(--linear-status-warning)',
        backgroundColor: 'var(--linear-status-warning-subtle)',
        label: 'High',
        icon: '🟡',
      },
      medium: {
        color: 'var(--linear-status-info)',
        backgroundColor: 'var(--linear-status-info-subtle)',
        label: 'Medium',
        icon: '🔵',
      },
      low: {
        color: 'var(--linear-text-tertiary)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        label: 'Low',
        icon: '⚪',
      },
    };

    const sizeStyles = {
      sm: {
        height: '20px',
        padding: '0 6px',
        fontSize: 'var(--linear-text-micro)',
      },
      md: {
        height: '24px',
        padding: '0 8px',
        fontSize: 'var(--linear-text-mini)',
      },
    };

    const badgeStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--linear-space-1)',
      fontFamily: 'var(--linear-font-primary)',
      fontWeight: 'var(--linear-font-weight-medium)',
      borderRadius: 'var(--linear-radius-sm)',
      color: priorityConfig[priority].color,
      backgroundColor: priorityConfig[priority].backgroundColor,
      border: `1px solid ${priorityConfig[priority].color}`,
      ...sizeStyles[size],
      ...style,
    };

    return (
      <span
        ref={ref}
        style={badgeStyle}
        className={`linear-priority-badge linear-priority-${priority} ${className}`}
        {...props}
      >
        {showIcon && (
          <span style={{ fontSize: '10px' }}>
            {priorityConfig[priority].icon}
          </span>
        )}
        {priorityConfig[priority].label}
      </span>
    );
  }
);

PriorityBadge.displayName = 'PriorityBadge';