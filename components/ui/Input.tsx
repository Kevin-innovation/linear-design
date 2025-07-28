'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'ghost';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    variant = 'default',
    className = '',
    style,
    disabled,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--linear-space-1)',
      width: '100%',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      fontWeight: 'var(--linear-font-weight-medium)',
      color: 'var(--linear-text-primary)',
      marginBottom: 'var(--linear-space-1)',
    };

    const inputContainerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const baseInputStyles: React.CSSProperties = {
      width: '100%',
      height: '36px',
      padding: leftIcon ? '0 12px 0 40px' : rightIcon ? '0 40px 0 12px' : '0 12px',
      fontSize: 'var(--linear-text-regular)',
      fontWeight: 'var(--linear-font-weight-normal)',
      fontFamily: 'var(--linear-font-primary)',
      color: 'var(--linear-text-primary)',
      backgroundColor: variant === 'ghost' ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${error ? 'var(--linear-status-error)' : 'var(--linear-border-primary)'}`,
      borderRadius: 'var(--linear-radius-md)',
      outline: 'none',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
    };

    const focusStyles: React.CSSProperties = {
      borderColor: error ? 'var(--linear-status-error)' : 'var(--linear-border-focus)',
      boxShadow: error 
        ? '0 0 0 2px rgba(248, 81, 73, 0.2)' 
        : '0 0 0 2px rgba(94, 106, 210, 0.2)',
      backgroundColor: variant === 'ghost' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.08)',
    };

    const disabledStyles: React.CSSProperties = {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: 'var(--linear-surface-disabled)',
      color: 'var(--linear-text-disabled)',
    };

    const inputStyle: React.CSSProperties = {
      ...baseInputStyles,
      ...(isFocused ? focusStyles : {}),
      ...(disabled ? disabledStyles : {}),
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--linear-text-tertiary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      pointerEvents: 'none',
    };

    const leftIconStyle: React.CSSProperties = {
      ...iconStyle,
      left: '12px',
    };

    const rightIconStyle: React.CSSProperties = {
      ...iconStyle,
      right: '12px',
    };

    const errorStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      color: 'var(--linear-status-error)',
      marginTop: 'var(--linear-space-1)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--linear-space-1)',
    };

    const hintStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      color: 'var(--linear-text-tertiary)',
      marginTop: 'var(--linear-space-1)',
    };

    return (
      <div style={containerStyle} className={`linear-input-container ${className}`}>
        {label && (
          <label style={labelStyle} className="linear-input-label">
            {label}
          </label>
        )}
        <div style={inputContainerStyle}>
          {leftIcon && (
            <div style={leftIconStyle} className="linear-input-left-icon">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            style={inputStyle}
            className={`linear-input linear-input-${variant}`}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {rightIcon && (
            <div style={rightIconStyle} className="linear-input-right-icon">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <div style={errorStyle} className="linear-input-error">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0C2.69 0 0 2.69 0 6s2.69 6 6 6 6-2.69 6-6S9.31 0 6 0zm3.5 8.5L8.5 9.5 6 7l-2.5 2.5L2.5 8.5 5 6 2.5 3.5 3.5 2.5 6 5l2.5-2.5L9.5 3.5 7 6l2.5 2.5z"/>
            </svg>
            {error}
          </div>
        )}
        {hint && !error && (
          <div style={hintStyle} className="linear-input-hint">
            {hint}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label,
    error,
    hint,
    resize = 'vertical',
    className = '',
    style,
    disabled,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--linear-space-1)',
      width: '100%',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      fontWeight: 'var(--linear-font-weight-medium)',
      color: 'var(--linear-text-primary)',
      marginBottom: 'var(--linear-space-1)',
    };

    const baseTextareaStyles: React.CSSProperties = {
      width: '100%',
      minHeight: '80px',
      padding: '12px',
      fontSize: 'var(--linear-text-regular)',
      fontWeight: 'var(--linear-font-weight-normal)',
      fontFamily: 'var(--linear-font-primary)',
      color: 'var(--linear-text-primary)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${error ? 'var(--linear-status-error)' : 'var(--linear-border-primary)'}`,
      borderRadius: 'var(--linear-radius-md)',
      outline: 'none',
      resize: resize,
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
      lineHeight: '1.6',
    };

    const focusStyles: React.CSSProperties = {
      borderColor: error ? 'var(--linear-status-error)' : 'var(--linear-border-focus)',
      boxShadow: error 
        ? '0 0 0 2px rgba(248, 81, 73, 0.2)' 
        : '0 0 0 2px rgba(94, 106, 210, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    };

    const disabledStyles: React.CSSProperties = {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: 'var(--linear-surface-disabled)',
      color: 'var(--linear-text-disabled)',
    };

    const textareaStyle: React.CSSProperties = {
      ...baseTextareaStyles,
      ...(isFocused ? focusStyles : {}),
      ...(disabled ? disabledStyles : {}),
      ...style,
    };

    const errorStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      color: 'var(--linear-status-error)',
      marginTop: 'var(--linear-space-1)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--linear-space-1)',
    };

    const hintStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-small)',
      color: 'var(--linear-text-tertiary)',
      marginTop: 'var(--linear-space-1)',
    };

    return (
      <div style={containerStyle} className={`linear-textarea-container ${className}`}>
        {label && (
          <label style={labelStyle} className="linear-textarea-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          style={textareaStyle}
          className="linear-textarea"
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <div style={errorStyle} className="linear-textarea-error">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0C2.69 0 0 2.69 0 6s2.69 6 6 6 6-2.69 6-6S9.31 0 6 0zm3.5 8.5L8.5 9.5 6 7l-2.5 2.5L2.5 8.5 5 6 2.5 3.5 3.5 2.5 6 5l2.5-2.5L9.5 3.5 7 6l2.5 2.5z"/>
            </svg>
            {error}
          </div>
        )}
        {hint && !error && (
          <div style={hintStyle} className="linear-textarea-hint">
            {hint}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';