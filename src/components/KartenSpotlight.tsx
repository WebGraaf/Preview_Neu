import React, { useRef, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

type SpotlightColorKey =
  | 'primary'
  | 'secondary'
  | 'brand-500'
  | 'status-success'
  | 'status-warning'
  | 'status-error'
  | 'status-info';

const spotlightColorMap: Record<SpotlightColorKey, string> = {
  primary: 'var(--spotlight-primary)',
  secondary: 'var(--spotlight-secondary)',
  'brand-500': 'var(--spotlight-brand-500)',
  'status-success': 'var(--spotlight-status-success)',
  'status-warning': 'var(--spotlight-status-warning)',
  'status-error': 'var(--spotlight-status-error)',
  'status-info': 'var(--spotlight-status-info)',
};

interface KartenSpotlightProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: SpotlightColorKey;
}

const KartenSpotlight: React.FC<KartenSpotlightProps> = ({
  children,
  className = '',
  spotlightColor = 'primary'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Throttled mouse move handler using requestAnimationFrame
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!divRef.current || isFocused) return;

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Schedule position update on next animation frame
    rafRef.current = requestAnimationFrame(() => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    });
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-border bg-card overflow-hidden
        transition-all duration-300 ease-out
        hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5
        focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2
        ${className}`}
    >
      {/* Spotlight gradient effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColorMap[spotlightColor]}, transparent 80%)`
        }}
      />
      {/* Subtle inner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.3 : 0,
          boxShadow: `inset 0 0 30px rgba(var(--primary-rgb, 255, 107, 0), 0.08)`
        }}
      />
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default KartenSpotlight;