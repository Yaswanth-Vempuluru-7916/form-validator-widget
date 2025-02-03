import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button
      type={type}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
    >
      {children}
    </button>
  );
};

export default Button;