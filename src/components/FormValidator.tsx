import React, { useState, useCallback } from 'react';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import Button from './Button';
import { validateForm } from '../utils/validators';
import { FieldConfig, FormValues, FormErrors } from '../types/types';

interface FormValidatorProps {
  fields: FieldConfig[];
  onSubmit: (values: FormValues) => void;
}

const FormValidator: React.FC<FormValidatorProps> = ({ fields, onSubmit }) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = useCallback((name: string, value: string | boolean) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errors = validateForm(formValues, fields);
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        onSubmit(formValues);
      }
    },
    [formValues, fields, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <InputField
          key={field.name}
          field={field}
          value={formValues[field.name] || ''}
          onChange={handleInputChange}
          error={formErrors[field.name]}
        />
      ))}
      <ErrorMessage errors={formErrors} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormValidator;