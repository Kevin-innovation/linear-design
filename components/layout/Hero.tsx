'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: HeroAction[];
  image?: {
    src: string;
    alt: string;
    position?: 'left' | 'right' | 'background';
  };
  pattern?: boolean;
  gradient?: boolean;
  centered?: boolean;
  compact?: boolean;
  overlay?: boolean;
}

export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({
    title,
    subtitle,
    description,
    actions = [],
    image,
    pattern = false,
    gradient = true,
    centered = true,
    compact = false,
    overlay = false,
    className = '',
    style,
    ...props
  }, ref) => {
    const heroStyle: React.CSSProperties = {
      position: 'relative',
      minHeight: compact ? '300px' : '500px',
      display: 'flex',
      alignItems: 'center',
      padding: compact ? 'var(--linear-space-12) 0' : 'var(--linear-space-20) 0',
      background: gradient
        ? 'linear-gradient(135deg, var(--linear-bg-primary) 0%, var(--linear-bg-secondary) 100%)'
        : 'var(--linear-bg-primary)',
      overflow: 'hidden',
      ...style,
    };

    const containerStyle: React.CSSProperties = {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 var(--linear-space-6)',
      width: '100%',
      zIndex: 2,
      position: 'relative',
    };

    const contentWrapperStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: image && image.position !== 'background' 
        ? image.position === 'left' 
          ? '1fr 1fr' 
          : '1fr 1fr'
        : '1fr',
      gap: 'var(--linear-space-12)',
      alignItems: 'center',
      textAlign: centered && !image ? 'center' : 'left',
    };

    const contentStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--linear-space-3)',
      order: image?.position === 'left' ? 2 : 1,
    };

    const imageStyle: React.CSSProperties = {
      order: image?.position === 'left' ? 1 : 2,
      borderRadius: 'var(--linear-radius-2xl)',
      overflow: 'hidden',
      boxShadow: 'var(--linear-shadow-large)',
    };

    const backgroundImageStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${image?.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 1,
    };

    const overlayStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: overlay
        ? 'linear-gradient(135deg, rgba(8, 9, 10, 0.8) 0%, rgba(20, 21, 22, 0.6) 100%)'
        : 'transparent',
      zIndex: 1,
    };

    const patternStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(94, 106, 210, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(94, 106, 210, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(94, 106, 210, 0.08) 0%, transparent 50%)
      `,
      zIndex: 1,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: compact ? 'var(--linear-text-title2)' : 'var(--linear-text-title3)',
      fontWeight: 'var(--linear-font-weight-semibold)',
      color: 'var(--linear-text-primary)',
      lineHeight: '1.2',
      letterSpacing: '-0.018em',
      margin: 0,
      marginBottom: 'var(--linear-space-2)',
    };

    const subtitleStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-regular)',
      fontWeight: 'var(--linear-font-weight-medium)',
      color: 'var(--linear-accent)',
      letterSpacing: '-0.008em',
      margin: 0,
      marginBottom: 'var(--linear-space-1)',
      textTransform: 'uppercase' as const,
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: 'var(--linear-text-regular)',
      color: 'var(--linear-text-secondary)',
      lineHeight: '1.6',
      maxWidth: centered && !image ? '500px' : '450px',
      margin: centered && !image ? '0 auto' : '0',
      marginBottom: 'var(--linear-space-2)',
    };

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      gap: 'var(--linear-space-3)',
      flexWrap: 'wrap',
      justifyContent: centered && !image ? 'center' : 'flex-start',
      marginTop: 'var(--linear-space-4)',
    };

    const handleActionClick = (action: HeroAction) => {
      if (action.onClick) {
        action.onClick();
      } else if (action.href) {
        if (action.external) {
          window.open(action.href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = action.href;
        }
      }
    };

    return (
      <section
        ref={ref}
        style={heroStyle}
        className={`linear-hero ${className}`}
        {...props}
      >
        {/* Background Image */}
        {image?.position === 'background' && (
          <div style={backgroundImageStyle} />
        )}

        {/* Overlay */}
        {(overlay || image?.position === 'background') && (
          <div style={overlayStyle} />
        )}

        {/* Pattern */}
        {pattern && <div style={patternStyle} />}

        <div style={containerStyle}>
          <div style={contentWrapperStyle}>
            {/* Content */}
            <div style={contentStyle}>
              {subtitle && (
                <p style={subtitleStyle}>{subtitle}</p>
              )}
              
              <h1 style={titleStyle}>{title}</h1>
              
              {description && (
                <p style={descriptionStyle}>{description}</p>
              )}
              
              {actions.length > 0 && (
                <div style={actionsStyle}>
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || (index === 0 ? 'primary' : 'secondary')}
                      size={action.size || 'lg'}
                      loading={action.loading}
                      icon={action.icon}
                      onClick={action.href ? undefined : action.onClick}
                      {...(action.href && !action.onClick ? {
                        as: 'a',
                        href: action.href,
                        target: action.external ? '_blank' : undefined,
                        rel: action.external ? 'noopener noreferrer' : undefined,
                      } : {})}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Side Image */}
            {image && image.position !== 'background' && (
              <div style={imageStyle}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

// Preset Hero variants
export interface MinimalHeroProps extends Omit<HeroProps, 'pattern' | 'gradient' | 'overlay'> {}

export const MinimalHero = React.forwardRef<HTMLElement, MinimalHeroProps>(
  (props, ref) => (
    <Hero
      ref={ref}
      pattern={false}
      gradient={false}
      overlay={false}
      {...props}
    />
  )
);

MinimalHero.displayName = 'MinimalHero';

export interface GradientHeroProps extends Omit<HeroProps, 'pattern' | 'gradient' | 'overlay'> {}

export const GradientHero = React.forwardRef<HTMLElement, GradientHeroProps>(
  (props, ref) => (
    <Hero
      ref={ref}
      pattern={true}
      gradient={true}
      overlay={false}
      {...props}
    />
  )
);

GradientHero.displayName = 'GradientHero';

export interface ImageHeroProps extends Omit<HeroProps, 'pattern' | 'gradient' | 'overlay' | 'image'> {
  image: {
    src: string;
    alt: string;
  };
}

export const ImageHero = React.forwardRef<HTMLElement, ImageHeroProps>(
  ({ image, ...props }, ref) => (
    <Hero
      ref={ref}
      pattern={false}
      gradient={false}
      overlay={true}
      image={{ ...image, position: 'background' }}
      {...props}
    />
  )
);

ImageHero.displayName = 'ImageHero';