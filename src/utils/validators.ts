import { FormValues, FormErrors, FieldConfig } from '../types/types';

export const validateForm = (values: FormValues, fields: FieldConfig[]): FormErrors => {
  const errors: FormErrors = {};

  fields.forEach((field) => {
    const value = values[field.name];
    const rules = field.validationRules;

    if (rules?.required && !value) {
      errors[field.name] = { message: `${field.label} is required` };
    }

    if (rules?.minLength && typeof value === 'string' && value.length < rules.minLength) {
      errors[field.name] = {
        message: `${field.label} must be at least ${rules.minLength} characters`,
      };
    }

    if (rules?.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      errors[field.name] = {
        message: `${field.label} must be no more than ${rules.maxLength} characters`,
      };
    }

    if (rules?.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      errors[field.name] = { message: `${field.label} is invalid` };
    }

    if (rules?.customValidator) {
      const customError = rules.customValidator(value as string);
      if (customError) {
        errors[field.name] = { message: customError };
      }
    }
  });

  return errors;
};