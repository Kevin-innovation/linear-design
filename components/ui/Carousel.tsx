'use client';

import React, { useState, useEffect, useCallback } from 'react';

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  itemsPerView?: number;
  gap?: number;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ 
    items,
    autoPlay = false,
    autoPlayInterval = 5000,
    showIndicators = true,
    showNavigation = true,
    loop = true,
    pauseOnHover = true,
    itemsPerView = 1,
    gap = 16,
    className = '',
    style,
    ...props 
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);

    const totalItems = items.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    const goToSlide = useCallback((index: number) => {
      if (loop) {
        if (index < 0) {
          setCurrentIndex(maxIndex);
        } else if (index > maxIndex) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(index);
        }
      } else {
        setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
      }
    }, [loop, maxIndex]);

    const goToNext = useCallback(() => {
      goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const goToPrevious = useCallback(() => {
      goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    // Auto play functionality
    useEffect(() => {
      if (!isPlaying || totalItems <= itemsPerView) return;
      if (pauseOnHover && isHovered) return;

      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }, [isPlaying, isHovered, pauseOnHover, autoPlayInterval, goToNext, totalItems, itemsPerView]);

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
          goToPrevious();
        } else if (event.key === 'ArrowRight') {
          goToNext();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrevious]);

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      borderRadius: 'var(--linear-radius-xl)',
      backgroundColor: 'var(--linear-bg-secondary)',
      ...style,
    };

    const sliderStyle: React.CSSProperties = {
      display: 'flex',
      transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
      transition: 'transform var(--linear-duration-normal) var(--linear-easing)',
      gap: `${gap}px`,
    };

    const itemStyle: React.CSSProperties = {
      flex: `0 0 calc(${100 / itemsPerView}% - ${(gap * (itemsPerView - 1)) / itemsPerView}px)`,
      minHeight: '200px',
    };

    const navigationButtonStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
      zIndex: 2,
      backdropFilter: 'blur(10px)',
    };

    const prevButtonStyle: React.CSSProperties = {
      ...navigationButtonStyle,
      left: '12px',
    };

    const nextButtonStyle: React.CSSProperties = {
      ...navigationButtonStyle,
      right: '12px',
    };

    const indicatorsContainerStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      zIndex: 2,
    };

    const indicatorStyle: React.CSSProperties = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
    };

    const playPauseButtonStyle: React.CSSProperties = {
      position: 'absolute',
      top: '12px',
      right: '12px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all var(--linear-duration-normal) var(--linear-easing)',
      zIndex: 2,
      backdropFilter: 'blur(10px)',
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleNavigationHover = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
    };

    const handleNavigationLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
    };

    if (totalItems === 0) {
      return (
        <div 
          ref={ref} 
          style={containerStyle} 
          className={`linear-carousel linear-carousel-empty ${className}`}
          {...props}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            color: 'var(--linear-text-tertiary)',
          }}>
            No items to display
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={`linear-carousel ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div style={sliderStyle} className="linear-carousel-slider">
          {items.map((item, index) => (
            <div
              key={item.id}
              style={itemStyle}
              className="linear-carousel-item"
            >
              {item.content}
            </div>
          ))}
        </div>

        {showNavigation && totalItems > itemsPerView && (
          <>
            <button
              style={prevButtonStyle}
              className="linear-carousel-prev"
              onClick={goToPrevious}
              onMouseEnter={handleNavigationHover}
              onMouseLeave={handleNavigationLeave}
              aria-label="Previous slide"
              disabled={!loop && currentIndex === 0}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button
              style={nextButtonStyle}
              className="linear-carousel-next"
              onClick={goToNext}
              onMouseEnter={handleNavigationHover}
              onMouseLeave={handleNavigationLeave}
              aria-label="Next slide"
              disabled={!loop && currentIndex === maxIndex}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>
          </>
        )}

        {showIndicators && totalItems > itemsPerView && (
          <div style={indicatorsContainerStyle} className="linear-carousel-indicators">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                style={{
                  ...indicatorStyle,
                  backgroundColor: index === currentIndex 
                    ? 'var(--linear-accent)' 
                    : 'rgba(255, 255, 255, 0.4)',
                }}
                className={`linear-carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {autoPlay && totalItems > itemsPerView && (
          <button
            style={playPauseButtonStyle}
            className="linear-carousel-play-pause"
            onClick={() => setIsPlaying(!isPlaying)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export interface CarouselCardProps {
  title: string;
  description: string;
  image?: string;
  action?: React.ReactNode;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({ 
  title, 
  description, 
  image, 
  action 
}) => {
  const cardStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--linear-bg-elevated)',
    border: '1px solid var(--linear-border-primary)',
    borderRadius: 'var(--linear-radius-xl)',
    overflow: 'hidden',
    transition: 'all var(--linear-duration-normal) var(--linear-easing)',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    backgroundColor: 'var(--linear-bg-secondary)',
  };

  const contentStyle: React.CSSProperties = {
    padding: 'var(--linear-space-4)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--linear-space-3)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--linear-text-title2)',
    fontWeight: 'var(--linear-font-weight-semibold)',
    color: 'var(--linear-text-primary)',
    margin: 0,
    lineHeight: '1.33',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--linear-text-regular)',
    color: 'var(--linear-text-secondary)',
    lineHeight: '1.6',
    flex: 1,
  };

  return (
    <div style={cardStyle} className="linear-carousel-card">
      {image && (
        <img 
          src={image} 
          alt={title}
          style={imageStyle}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )}
      <div style={contentStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descriptionStyle}>{description}</p>
        {action && (
          <div style={{ marginTop: 'auto' }}>
            {action}
          </div>
        )}
      </div>
    </div>
  );
};