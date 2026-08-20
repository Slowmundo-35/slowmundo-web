"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
  displayValue?: string;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  displayValue,
  className = '',
  buttonClassName,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = displayValue 
    ? displayValue
    : selectedOption
      ? selectedOption.label
      : placeholder || (options[0] ? options[0].label : '');

  const defaultBtnClass =
    'w-full bg-white border border-gray-200 text-text-main px-6 py-2.5 pr-10 rounded-full font-semibold hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm flex items-center justify-between';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={
          buttonClassName || defaultBtnClass
        }
      >
        <span className={`truncate ${!selectedOption && placeholder ? 'text-gray-400 font-normal' : ''}`}>
          {displayLabel}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-primary' : 'text-text-muted'
          }`}
        />
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
            <ul className="max-h-60 overflow-auto py-1.5">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      value === option.value
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-text-main hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    {value === option.value && <Check className="w-4 h-4 shrink-0 text-primary" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

