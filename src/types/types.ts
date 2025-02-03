// types.ts
export interface FieldConfig {
  type: 'text' | 'email' | 'password' | 'select' | 'checkbox' | 'textarea' | 'number';
  name: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validationRules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;
    max?: number;
    customValidator?: (value: string | boolean) => string | null;
  };
  disabled?: boolean;
  className?: string;
}

export type ValidationTrigger = 'onChange' | 'onBlur' | 'onSubmit';

export interface FieldError {
  message: string;
}

export interface FormErrors {
  [key: string]: FieldError;
}

export interface FormValues {
  [key: string]: string | boolean | number;
}