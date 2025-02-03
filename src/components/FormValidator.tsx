// FormValidator.tsx
import React, { useState, useCallback, useEffect } from 'react';
import  useDebounce  from '../hooks/useDebounce';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import Button from './Button';
import { validateForm } from '../utils/validators';
import { FieldConfig, FormValues, FormErrors, ValidationTrigger } from '../types/types';

interface FormValidatorProps {
  fields: FieldConfig[];
  onSubmit: (values: FormValues) => void;
  onError?: (errors: FormErrors) => void;
  initialValues?: FormValues;
  validationTrigger?: ValidationTrigger;
  validationDelay?: number;
  className?: string;
  submitButtonText?: string;
}

const FormValidator: React.FC<FormValidatorProps> = ({
  fields,
  onSubmit,
  onError,
  initialValues = {},
  validationTrigger = 'onChange',
  validationDelay = 300,
  className = '',
  submitButtonText = 'Submit'
}) => {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState<{ [key: string]: boolean }>({});
  
  // Use debounce for onChange validation
  const debouncedValues = useDebounce(formValues, validationDelay);

  // Validate form when values change (if validationTrigger is onChange)
  useEffect(() => {
    if (validationTrigger === 'onChange') {
      const errors = validateForm(debouncedValues, fields);
      setFormErrors(errors);
      onError?.(errors);
    }
  }, [debouncedValues, fields, validationTrigger, onError]);

  const handleInputChange = useCallback((name: string, value: string | boolean) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(prev => ({
      ...prev,
      [name]: true,
    }));
    
    // Validate on blur only when field is dirty
    if (validationTrigger === 'onBlur' && isDirty[name]) {
      const errors = validateForm({ ...formValues, [name]: value }, fields);
      setFormErrors(prev => ({
        ...prev,
        [name]: errors[name],
      }));
      onError?.(errors);
    }
  }, [formValues, fields, validationTrigger, isDirty, onError]);

  const handleBlur = useCallback((name: string) => {
    if (validationTrigger === 'onBlur') {
      const errors = validateForm(formValues, fields);
      setFormErrors(prev => ({
        ...prev,
        [name]: errors[name],
      }));
      onError?.(errors);
    }
  }, [formValues, fields, validationTrigger, onError]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formValues, fields);
    setFormErrors(errors);
    onError?.(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit(formValues);
    }
  }, [formValues, fields, onSubmit, onError]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-4 ${className}`}
      noValidate
    >
      {fields.map((field) => (
        <InputField
          key={field.name}
          field={field}
          value={formValues[field.name] ?? ''}
          onChange={handleInputChange}
          onBlur={() => handleBlur(field.name)}
          error={formErrors[field.name]}
          isDirty={isDirty[field.name]}
        />
      ))}
      <ErrorMessage errors={formErrors} />
      <Button type="submit">{submitButtonText}</Button>
    </form>
  );
};

export default FormValidator;