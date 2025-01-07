import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

