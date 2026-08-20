"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  values: string[];
  onChange: (vals: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

export default function MultiSelect({
  values,
  onChange,
  options,
  placeholder = 'Sélectionner des destinations',
  className = '',
  buttonClassName,
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  const selectAll = () => {
    onChange(options.map((o) => o.value));
  };

  const clearAll = () => {
    onChange([]);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getButtonText = () => {
    if (values.length === 0) {
      return <span className="text-gray-400 font-normal">{placeholder}</span>;
    }
    if (values.length === 1) {
      const opt = options.find((o) => o.value === values[0]);
      return <span className="font-semibold text-text-main">{opt?.label || values[0]}</span>;
    }
    if (values.length === 2) {
      const labels = values.map((v) => options.find((o) => o.value === v)?.label || v);
      return <span className="font-semibold text-text-main truncate">{labels.join(', ')}</span>;
    }
    return (
      <span className="font-semibold text-text-main">
        {values.length} destinations sélectionnées
      </span>
    );
  };

  const defaultBtnClass =
    'w-full bg-white border border-gray-200 text-text-main px-4 py-2.5 rounded-xl font-medium hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm flex items-center justify-between';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClassName || defaultBtnClass}
      >
        <div className="flex items-center gap-2 truncate">
          {getButtonText()}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {values.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
              {values.length}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 text-text-muted ${
              isOpen ? 'rotate-180 text-primary' : ''
            }`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 w-full mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {/* Search and Quick Actions */}
            <div className="p-2 border-b border-gray-100 space-y-2 bg-gray-50/50">
              {options.length > 6 && (
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un pays..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-text-main"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between text-xs px-1 text-text-muted">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-primary hover:underline font-semibold"
                >
                  Tout sélectionner
                </button>
                {values.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-red-500 hover:underline font-medium"
                  >
                    Effacer ({values.length})
                  </button>
                )}
              </div>
            </div>

            {/* Options List with Checkboxes */}
            <ul className="max-h-56 overflow-auto py-1">
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-3 text-xs text-gray-400 text-center">
                  Aucun résultat trouvé
                </li>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = values.includes(option.value);
                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => toggleOption(option.value)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-primary/5 text-primary font-semibold'
                            : 'text-text-main hover:bg-gray-50 font-normal'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-primary border-primary text-white'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{option.label}</span>
                        </div>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
