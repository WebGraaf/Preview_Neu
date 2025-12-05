import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, Check, AlertCircle, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const logo = '/default_images/logo_default.webp';

gsap.registerPlugin(ScrollTrigger);
interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}


interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  description?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange, description }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <label className="flex items-start cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
          isChecked
            ? 'bg-primary-500 border-primary-500 scale-100'
            : 'bg-primary-50 border-primary-200 group-hover:border-primary-400'
        }`}>
          {isChecked && <Check className="w-3.5 h-3.5 text-white animate-in zoom-in duration-150" />}
        </div>
      </div>
      <div className="ml-3">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
    </label>
  );
};

interface RadioProps {
  name: string;
  options: { value: string; label: string; description?: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ name, options, value, onChange }) => {
  const [selected, setSelected] = useState(value || '');

  const handleChange = (optionValue: string) => {
    setSelected(optionValue);
    onChange?.(optionValue);
  };

  return (
    <div className="space-y-3">
      {options.map(option => (
        <label key={option.value} className="flex items-start cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input
              type="radio"
              name={name}
              checked={selected === option.value}
              onChange={() => handleChange(option.value)}
              className="sr-only"
            />
            <div className={`w-5 h-5 border-2 rounded-full transition-all duration-200 flex items-center justify-center ${
              selected === option.value
                ? 'bg-primary-50 border-primary-500'
                : 'bg-primary-50 border-primary-200 group-hover:border-primary-400'
            }`}>
              {selected === option.value && (
                <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-in zoom-in duration-150" />
              )}
            </div>
          </div>
          <div className="ml-3">
            <span className="text-sm font-medium text-neutral-700">{option.label}</span>
            {option.description && <p className="text-sm text-neutral-500 mt-0.5">{option.description}</p>}
          </div>
        </label>
      ))}
    </div>
  );
};

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  description?: string;
}

const Switch: React.FC<SwitchProps> = ({ label, checked = false, onChange, description }) => {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div>
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2 ${
          isOn ? 'bg-primary-500' : 'bg-neutral-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
};

interface DatePickerProps {
  label: string;
  value?: string;
  onChange?: (date: string) => void;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, error }) => {
  const [date, setDate] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="date"
          value={date}
          onChange={handleChange}
          className={`w-full px-4 py-3 pr-10 bg-primary-50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
            error ? 'border-red-400' : 'border-primary-200 hover:border-primary-300'
          }`}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 pointer-events-none" />
      </div>
      {error && (
        <div className="flex items-center mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', placeholder, value, onChange, error, required }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const showError = error && touched;

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-primary-50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-neutral-400 ${
          showError ? 'border-red-400' : 'border-primary-200 hover:border-primary-300'
        }`}
      />
      {showError && (
        <div className="flex items-center mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

interface FormResultProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}

const FormResult: React.FC<FormResultProps> = ({ type, title, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in slide-in-from-bottom-4 duration-300 border border-neutral-200">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${
          type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {type === 'success' ? (
            <Check className="w-8 h-8 text-green-600" />
          ) : (
            <AlertCircle className="w-8 h-8 text-red-600" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-center mb-2 text-neutral-900">{title}</h3>
        <p className="text-neutral-600 text-center mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-[0.98] transition-all duration-200 font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

const HoneypotField: React.FC = () => {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      className="absolute -left-[9999px] w-0 h-0 opacity-0"
    />
  );
};

interface FormLoadingProps {
  message?: string;
}

const FormLoading: React.FC<FormLoadingProps> = ({ message = 'Submitting...' }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-6 h-6 text-primary-500 animate-spin mr-3" />
      <span className="text-neutral-600 font-medium">{message}</span>
    </div>
  );
};

export const AnmeldeFormular: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    geburtsdatum: '',
    klasse: '',
    starttermin: '',
    nachricht: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const fieldsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized: Single timeline with one ScrollTrigger instead of 5+ separate ones
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Title animation
      tl.fromTo(".form-title",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      // Form container - simplified, no scale animation
      tl.fromTo(formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Logo animation - simplified easing, kept rotation
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.7, rotation: -90 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: "power3.out", // Simpler than elastic.out
        },
        "-=0.4"
      );

      // Optimized: Simple fade-in for form fields instead of staggered x animation
      // This reduces the number of animated elements significantly
      tl.fromTo(fieldsRef.current.filter(Boolean),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.05, // Reduced stagger time
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Submit button - simplified
      tl.fromTo(".submit-btn",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.vorname.trim()) newErrors.vorname = 'Vorname ist erforderlich';
    if (!formData.nachname.trim()) newErrors.nachname = 'Nachname ist erforderlich';
    if (!formData.email.trim()) newErrors.email = 'E-Mail-Adresse ist erforderlich';
    if (!formData.telefon.trim()) newErrors.telefon = 'Telefonnummer ist erforderlich';
    return newErrors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      // Mark all fields as touched to show errors
      const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);
      return;
    }
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const fieldErrors = validateForm();
    if (fieldErrors[field]) {
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="form-title text-3xl font-bold text-heading mb-8 text-center" style={{ opacity: 0, willChange: 'transform, opacity' }}>Jetzt Anmelden</h2>
        <div className="max-w-2xl mx-auto relative">
          <div ref={formRef} className="border-2 border-primary-200 rounded-2xl p-6 md:p-8 bg-background-card shadow-lg hover:shadow-xl transition-shadow relative" style={{ opacity: 0, willChange: 'transform, opacity' }}>
            {formState === 'idle' && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <HoneypotField />
                <fieldset className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-heading">Persönliche Informationen</h3>
                    <img ref={logoRef} src={logo} alt="Logo" className="h-16 w-auto" style={{ opacity: 0, willChange: 'transform, opacity' }} />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[0] = el)}>
                    <Input
                      label="Vorname"
                      placeholder="Max"
                      required
                      value={formData.vorname}
                      onChange={(value) => handleInputChange('vorname', value)}
                      error={touched.vorname ? errors.vorname : ''}
                    />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[1] = el)}>
                    <Input
                      label="Nachname"
                      placeholder="Mustermann"
                      required
                      value={formData.nachname}
                      onChange={(value) => handleInputChange('nachname', value)}
                      error={touched.nachname ? errors.nachname : ''}
                    />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[2] = el)}>
                    <Input
                      label="E-Mail-Adresse"
                      type="email"
                      placeholder="max@example.com"
                      required
                      value={formData.email}
                      onChange={(value) => handleInputChange('email', value)}
                      error={touched.email ? errors.email : ''}
                    />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[3] = el)}>
                    <Input
                      label="Telefonnummer"
                      type="tel"
                      placeholder="+49 123 456789"
                      required
                      value={formData.telefon}
                      onChange={(value) => handleInputChange('telefon', value)}
                      error={touched.telefon ? errors.telefon : ''}
                    />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[4] = el)}>
                    <DatePicker
                      label="Geburtsdatum"
                      value={formData.geburtsdatum}
                      onChange={(value) => handleInputChange('geburtsdatum', value)}
                    />
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-lg font-semibold text-heading mb-4">Kursdetails</legend>
                  <div ref={(el) => el && (fieldsRef.current[5] = el)}>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Gewünschte Klasse</label>
                    <div className="relative">
                      <select
                        value={formData.klasse}
                        onChange={(e) => handleInputChange('klasse', e.target.value)}
                        className="w-full px-4 py-3 pr-10 bg-primary-50 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-neutral-900 appearance-none transition-all duration-200 hover:border-primary-300 cursor-pointer"
                      >
                        <option value="a">Klasse A (Motorrad)</option>
                        <option value="b">Klasse B (Auto)</option>
                        <option value="c">Klasse C (LKW)</option>
                        <option value="d">Klasse D (Bus)</option>
                        <option value="l">Klasse L (Landwirtschaft)</option>
                        <option value="t">Klasse T (Traktor)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 pointer-events-none" />
                    </div>
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[6] = el)}>
                    <DatePicker
                      label="Gewünschter Starttermin"
                      value={formData.starttermin}
                      onChange={(value) => handleInputChange('starttermin', value)}
                    />
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-lg font-semibold text-heading mb-4">Zusätzliche Informationen</legend>
                  <div ref={(el) => el && (fieldsRef.current[7] = el)}>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Zusätzliche Nachricht</label>
                    <textarea
                      className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-primary-50 text-neutral-900 placeholder-neutral-400 transition-all duration-200 hover:border-primary-300 resize-none"
                      rows={4}
                      placeholder="Ihre Nachricht..."
                      value={formData.nachricht}
                      onChange={(e) => handleInputChange('nachricht', e.target.value)}
                    />
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={true}
                  className="submit-btn w-full py-4 bg-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:bg-neutral-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ opacity: 0, willChange: 'transform, opacity' }}
                >
                  Anmeldung abschicken
                </button>
              </form>
            )}

            {formState === 'loading' && <FormLoading message="Anmeldung wird verarbeitet..." />}
          </div>
        </div>
      </div>
      {formState === 'success' && (
        <FormResult
          type="success"
          title="Anmeldung erfolgreich!"
          message="Ihre Anmeldung wurde erfolgreich übermittelt. Wir melden uns bald bei Ihnen."
          onClose={() => setFormState('idle')}
        />
      )}
    </section>
  );
};