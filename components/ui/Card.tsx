'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'default', 
    padding = 'md',
    children, 
    hover = false,
    onClick,
    className = '',
    style,
    ...props 
  }, ref) => {
    const isInteractive = variant === 'interactive' || onClick || hover;

    const baseStyles: React.CSSProperties = {
      borderRadius: variant === 'elevated' ? 'var(--linear-radius-3xl)' : 'var(--linear-radius-2xl)',
      border: '1px solid var(--linear-border-primary)',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
      position: 'relative',
      overflow: 'hidden',
    };

    const variantStyles = {
      default: {
        backgroundColor: 'rgba(40, 40, 40, 0.2)',
        backdropFilter: 'blur(20px)',
      },
      elevated: {
        backgroundColor: 'var(--linear-bg-elevated)',
        boxShadow: 'var(--linear-shadow-large)',
      },
      interactive: {
        backgroundColor: 'var(--linear-bg-elevated)',
        cursor: isInteractive ? 'pointer' : 'default',
      },
    };

    const paddingStyles = {
      none: { padding: '0' },
      sm: { padding: 'var(--linear-space-3)' },
      md: { padding: 'var(--linear-space-4)' },
      lg: { padding: 'var(--linear-space-6)' },
    };

    const hoverStyles: React.CSSProperties = isInteractive ? {
      transform: 'translateY(-2px)',
      boxShadow: 'var(--linear-shadow-floating)',
      borderColor: 'var(--linear-border-focus)',
    } : {};

    const cardStyle: React.CSSProperties = {
      ...baseStyles,
      ...variantStyles[variant],
      ...paddingStyles[padding],
      ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isInteractive) {
        Object.assign(e.currentTarget.style, hoverStyles);
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isInteractive) {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = variant === 'elevated' ? 'var(--linear-shadow-large)' : '';
        e.currentTarget.style.borderColor = 'var(--linear-border-primary)';
      }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isInteractive) {
        e.currentTarget.style.transform = 'translateY(-1px)';
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isInteractive) {
        Object.assign(e.currentTarget.style, hoverStyles);
      }
    };

    return (
      <div
        ref={ref}
        style={cardStyle}
        className={`linear-card linear-card-${variant} ${className}`}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', style, ...props }, ref) => {
    const headerStyle: React.CSSProperties = {
      marginBottom: 'var(--linear-space-4)',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={headerStyle}
        className={`linear-card-header ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, level = 3, className = '', style, ...props }, ref) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    
    const titleStyle: React.CSSProperties = {
      fontSize: level === 1 ? 'var(--linear-text-title4)' : 
                level === 2 ? 'var(--linear-text-title3)' :
                level === 3 ? 'var(--linear-text-title2)' : 'var(--linear-text-title1)',
      fontWeight: 'var(--linear-font-weight-semibold)',
      color: 'var(--linear-text-primary)',
      lineHeight: '1.33',
      letterSpacing: '-0.012em',
      margin: 0,
      ...style,
    };

    return React.createElement(
      Component,
      {
        ref,
        style: titleStyle,
        className: `linear-card-title ${className}`,
        ...props,
      },
      children
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', style, ...props }, ref) => {
    const contentStyle: React.CSSProperties = {
      color: 'var(--linear-text-secondary)',
      fontSize: 'var(--linear-text-regular)',
      lineHeight: '1.6',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={contentStyle}
        className={`linear-card-content ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', style, ...props }, ref) => {
    const footerStyle: React.CSSProperties = {
      marginTop: 'var(--linear-space-4)',
      paddingTop: 'var(--linear-space-4)',
      borderTop: '1px solid var(--linear-border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--linear-space-2)',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={footerStyle}
        className={`linear-card-footer ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Image Card Components
export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
  overlay?: React.ReactNode;
  fallback?: React.ReactNode;
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ 
    aspectRatio = 'video', 
    overlay,
    fallback,
    className = '', 
    style, 
    onError,
    ...props 
  }, ref) => {
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const aspectRatios = {
      square: '1 / 1',
      video: '16 / 9',
      wide: '21 / 9',
      tall: '4 / 5',
    };

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      aspectRatio: aspectRatios[aspectRatio],
      overflow: 'hidden',
      backgroundColor: 'var(--linear-bg-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const imageStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
      ...style,
    };

    const overlayStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.4)',
      color: 'white',
      opacity: 0,
      transition: 'opacity var(--linear-duration-normal) var(--linear-easing)',
    };

    const fallbackStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: 'var(--linear-text-tertiary)',
      fontSize: 'var(--linear-text-regular)',
      backgroundColor: 'var(--linear-bg-tertiary)',
    };

    const loadingStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '32px',
      height: '32px',
      border: '3px solid var(--linear-border-primary)',
      borderTop: '3px solid var(--linear-accent)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      setIsLoading(false);
      onError?.(e);
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      const overlayElement = e.currentTarget.querySelector('.card-image-overlay') as HTMLElement;
      if (overlayElement) {
        overlayElement.style.opacity = '1';
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const overlayElement = e.currentTarget.querySelector('.card-image-overlay') as HTMLElement;
      if (overlayElement) {
        overlayElement.style.opacity = '0';
      }
    };

    if (hasError) {
      return (
        <div style={containerStyle} className={`linear-card-image-container ${className}`}>
          {fallback || (
            <div style={fallbackStyle}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        style={containerStyle} 
        className={`linear-card-image-container ${className}`}
        onMouseEnter={overlay ? handleMouseEnter : undefined}
        onMouseLeave={overlay ? handleMouseLeave : undefined}
      >
        {isLoading && <div style={loadingStyle} />}
        <img
          ref={ref}
          style={{ ...imageStyle, opacity: isLoading ? 0 : 1 }}
          className="linear-card-image"
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
        {overlay && (
          <div style={overlayStyle} className="card-image-overlay">
            {overlay}
          </div>
        )}
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

export interface ImageCardProps extends Omit<CardProps, 'children'> {
  image: string;
  imageAlt: string;
  imageAspectRatio?: 'square' | 'video' | 'wide' | 'tall';
  imageOverlay?: React.ReactNode;
  imageFallback?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  titleLevel?: 1 | 2 | 3 | 4;
}

export const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  ({
    image,
    imageAlt,
    imageAspectRatio = 'video',
    imageOverlay,
    imageFallback,
    title,
    description,
    footer,
    titleLevel = 3,
    padding = 'none',
    className = '',
    ...cardProps
  }, ref) => {
    return (
      <Card ref={ref} padding={padding} className={`linear-image-card ${className}`} {...cardProps}>
        <CardImage
          src={image}
          alt={imageAlt}
          aspectRatio={imageAspectRatio}
          overlay={imageOverlay}
          fallback={imageFallback}
        />
        {(title || description || footer) && (
          <div style={{ padding: 'var(--linear-space-4)' }}>
            {title && (
              <CardHeader>
                <CardTitle level={titleLevel}>{title}</CardTitle>
              </CardHeader>
            )}
            {description && (
              <CardContent>{description}</CardContent>
            )}
            {footer && (
              <CardFooter>{footer}</CardFooter>
            )}
          </div>
        )}
      </Card>
    );
  }
);

ImageCard.displayName = 'ImageCard';