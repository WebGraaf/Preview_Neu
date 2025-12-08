import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';

export interface LocationOption {
  label: string;
  value: number;
}

interface LocationDropdownProps {
  options: LocationOption[];
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function LocationDropdown({ options, value, onChange, className = '' }: LocationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (optionValue: number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-3
          bg-background-card border-2 rounded-xl px-4 py-3.5
          font-semibold text-heading text-left
          transition-all duration-300
          ${isOpen 
            ? 'border-primary-500 ring-2 ring-primary-500/20 shadow-lg' 
            : 'border-border hover:border-primary-300 hover:shadow-md'
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary-600" />
          </div>
          <span className="truncate">{selectedOption?.label || 'Standort wählen'}</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-text transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute z-50 w-full mt-2
          bg-background-card border-2 border-border rounded-xl
          shadow-xl overflow-hidden
          transition-all duration-300 origin-top
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }
        `}
        role="listbox"
      >
        <div className="py-2 max-h-64 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3
                  text-left transition-all duration-200
                  ${isSelected 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-text hover:bg-neutral-50 hover:text-primary-600'
                  }
                `}
                role="option"
                aria-selected={isSelected}
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200
                  ${isSelected ? 'bg-primary-500' : 'bg-neutral-100'}
                `}>
                  {isSelected ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <MapPin className="w-4 h-4 text-primary-500" />
                  )}
                </div>
                <span className={`font-medium ${isSelected ? 'font-semibold' : ''}`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 md:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}