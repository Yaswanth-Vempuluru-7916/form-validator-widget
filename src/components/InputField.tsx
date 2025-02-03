// InputField.tsx
import React, { useRef } from 'react';
import { FieldConfig, FieldError } from '../types/types';

interface InputFieldProps {
  field: FieldConfig;
  value: string | boolean | number;
  onChange: (name: string, value: string | boolean | number) => void;
  onBlur: () => void;
  error?: FieldError;
  isDirty?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  isDirty
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const baseInputClasses = `
    w-full p-2 border rounded-md transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-500' : isDirty ? 'border-green-500' : 'border-gray-300'}
    ${field.className || ''}
  `;

  const renderInput = () => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      disabled: field.disabled,
      onBlur,
      className: baseInputClasses,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            {...commonProps}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              {...commonProps}
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2">{field.label}</span>
          </div>
        );

      default:
        return (
          <input
            {...commonProps}
            ref={inputRef}
            type={field.type}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      {field.type !== 'checkbox' && (
        <label 
          htmlFor={field.name} 
          className="text-sm font-medium text-gray-700"
        >
          {field.label}
        </label>
      )}
      {renderInput()}
      {error && (
        <span className="text-sm text-red-500 animate-fadeIn">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputField;