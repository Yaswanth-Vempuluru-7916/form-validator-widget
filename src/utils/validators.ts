import { FieldConfig, FormErrors, FormValues } from "../types/types";

// validators.ts
export const validateForm = (values: FormValues, fields: FieldConfig[]): FormErrors => {
  const errors: FormErrors = {};

  fields.forEach((field) => {
    const value = values[field.name];
    const rules = field.validationRules;

    if (!rules) return;

    // Required validation
    if (rules.required && (value === undefined || value === '' || value === false)) {
      errors[field.name] = { message: `${field.label} is required` };
      return;
    }

    // Skip other validations if value is empty and not required
    if (value === undefined || value === '') return;

    // Type-specific validations
    if (typeof value === 'string') {
      // Min length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors[field.name] = {
          message: `${field.label} must be at least ${rules.minLength} characters`,
        };
        return;
      }

      // Max length validation
      if (rules.maxLength && value.length > rules.maxLength) {
        errors[field.name] = {
          message: `${field.label} must be no more than ${rules.maxLength} characters`,
        };
        return;
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        errors[field.name] = { 
          message: `${field.label} format is invalid` 
        };
        return;
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors[field.name] = {
          message: `${field.label} must be at least ${rules.min}`,
        };
        return;
      }

      if (rules.max !== undefined && value > rules.max) {
        errors[field.name] = {
          message: `${field.label} must be no more than ${rules.max}`,
        };
        return;
      }
    }

    // Custom validation
    if (rules.customValidator) {
      const customError = rules.customValidator(value);
      if (customError) {
        errors[field.name] = { message: customError };
        return;
      }
    }
  });

  return errors;
};