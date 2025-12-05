import React, { useRef, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
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
      className={`relative rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8
        transition-all duration-300 ease-out
        hover:border-neutral-700 hover:shadow-xl hover:shadow-black/20
        hover:-translate-y-1
        focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900
        ${className}`}
    >
      {/* Spotlight gradient effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />
      {/* Subtle border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.5 : 0,
          boxShadow: `inset 0 0 20px rgba(255, 255, 255, 0.05)`
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
