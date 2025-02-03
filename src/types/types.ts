export interface FieldConfig {
    type: 'text' | 'email' | 'password' | 'select' | 'checkbox';
    name: string;
    label: string;
    placeholder?: string;
    options?: { value: string; label: string }[]; // For select fields
    validationRules?: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      customValidator?: (value: string) => string | null;
    };
  }
  
  export interface FieldError {
    message: string;
  }
  
  export interface FormErrors {
    [key: string]: FieldError;
  }
  
  export interface FormValues {
    [key: string]: string | boolean;
  }