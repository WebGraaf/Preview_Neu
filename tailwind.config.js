/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
  			// === BRAND COLORS ===
  			primary: {
  				50: '#FFF6EE',
  				100: '#FFEBDC',
  				200: '#FFD4B3',
  				300: '#FFBB85',
  				400: '#FF9E4F',
  				500: '#FF7A00',  // Main brand color
  				600: '#E66900',
  				700: '#C25600',
  				800: '#9C4600',
  				900: '#7A3800',
  				950: '#3F1D00',
  				DEFAULT: '#FF7A00',
  				foreground: '#FFFFFF',
  			},

  			// === NEUTRAL COLORS (single scale, replaces secondary/neutral) ===
  			neutral: {
  				50: '#f8fafc',
  				100: '#f1f5f9',
  				200: '#e2e8f0',
  				300: '#cbd5e1',
  				400: '#94a3b8',
  				500: '#64748b',
  				600: '#475569',
  				700: '#334155',
  				800: '#1e293b',
  				900: '#0f172a',
  				950: '#020617',
  			},

  			// === SEMANTIC BACKGROUND COLORS ===
  			background: {
  				DEFAULT: '#F4F4F5',      // Page background
  				card: '#FFFFFF',         // Card/elevated surfaces
  				elevated: '#FAFAFB',     // Slightly elevated surfaces
  				tint: '#FFF3E6',         // Brand-tinted background
  				overlay: 'rgba(17,24,39,0.6)',
  			},

  			// === SEMANTIC TEXT COLORS ===
  			text: {
  				DEFAULT: '#4B5563',      // Body text
  				heading: '#111827',      // Headings
  				muted: '#6B7280',        // Secondary/muted text
  				placeholder: '#9CA3AF',  // Placeholder text
  				inverse: '#FFFFFF',      // Text on dark backgrounds
  			},

  			// === SEMANTIC BORDER COLORS ===
  			border: {
  				DEFAULT: '#E5E7EB',      // Standard borders
  				divider: '#E4E4E7',      // Divider lines
  				focus: '#FF7A00',        // Focus rings
  				input: '#D4D4D4',        // Input borders
  			},

  			// === STATUS COLORS ===
  			status: {
  				success: '#16A34A',
  				warning: '#F59E0B',
  				error: '#EF4444',
  				info: '#2563EB',
  			},

  			// === INTERACTION STATES ===
  			interaction: {
  				hover: '#F5F5F5',
  				active: '#E5E5E5',
  			},

  			// === UTILITY COLORS ===
  			white: '#FFFFFF',
  			black: '#000000',
  			transparent: 'transparent',
  			
  			// === SHADCN/UI COMPATIBILITY (CSS Variables) ===
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))',
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))',
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))',
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))',
  			},
  			ring: 'hsl(var(--ring))',
  			input: 'hsl(var(--input))',
  			foreground: 'hsl(var(--foreground))',
  			
  			// === CHART COLORS ===
  			chart: {
  				1: 'hsl(var(--chart-1))',
  				2: 'hsl(var(--chart-2))',
  				3: 'hsl(var(--chart-3))',
  				4: 'hsl(var(--chart-4))',
  				5: 'hsl(var(--chart-5))',
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		// Section padding system for consistent vertical spacing
  		spacing: {
  			'section-sm': '2rem',      // 32px - for compact sections
  			'section': '4rem',         // 64px - standard sections
  			'section-md': '5rem',      // 80px - medium sections
  			'section-lg': '6rem',      // 96px - large hero sections
  			'section-xl': '8rem'       // 128px - extra large sections
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
