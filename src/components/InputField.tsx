import React from 'react';
import { FieldConfig, FieldError } from '../types/types';

interface InputFieldProps {
  field: FieldConfig;
  value: string | boolean;
  onChange: (name: string, value: string | boolean) => void;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({ field, value, onChange, error }) => {
  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`p-2 border rounded-md ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`p-2 border rounded-md ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => onChange(field.name, e.target.checked)}
            className="mr-2"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
        {field.label}
      </label>
      {renderInput()}
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputField;