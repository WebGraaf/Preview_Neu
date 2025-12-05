import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full'
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  background?: string;
  padding?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  background = 'transparent',
  padding = 'md',
  className = ''
}) => {
  const paddingClasses = {
    none: 'py-0',
    xs: 'py-4 sm:py-6',
    sm: 'py-6 sm:py-8',
    md: 'py-8 sm:py-10',
    lg: 'py-10 sm:py-12',
    xl: 'py-12 sm:py-16'
  };

  const backgroundClasses: Record<string, string> = {
    transparent: 'bg-transparent',
    white: 'bg-white',
    gray: 'bg-neutral-100',
    blue: 'bg-primary-50',
    'page-bg': 'bg-background',
    'card-bg': 'bg-background-card',
    'card-tint': 'bg-background-tint',
    'elevated-bg': 'bg-background-elevated'
  };

  const bgClass = backgroundClasses[background] || '';

  return (
    <section className={`${bgClass} ${paddingClasses[padding as keyof typeof paddingClasses] || paddingClasses.md} ${className}`}>
      {children}
    </section>
  );
};

interface DividerProps {
  className?: string;
  variant?: 'line' | 'gradient' | 'dots';
}

export const SectionDivider: React.FC<DividerProps> = ({
  className = '',
  variant = 'line'
}) => {
  const variants = {
    line: 'h-px bg-border',
    gradient: 'h-px bg-gradient-to-r from-transparent via-border to-transparent',
    dots: 'h-4 flex items-center justify-center gap-2'
  };

  if (variant === 'dots') {
    return (
      <div className={`${variants[variant]} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
      </div>
    );
  }

  return (
    <div className={`${variants[variant]} mx-auto max-w-7xl ${className}`}></div>
  );
};