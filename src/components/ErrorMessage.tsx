import React from 'react';
import { FormErrors } from '../types/types';

interface ErrorMessageProps {
  errors: FormErrors;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  return (
    <div className="space-y-2">
      {Object.keys(errors).map((key) => (
        <div key={key} className="text-sm text-red-500">
          {errors[key].message}
        </div>
      ))}
    </div>
  );
};

export default ErrorMessage;