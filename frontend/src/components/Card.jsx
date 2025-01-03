import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-lg shadow transition-colors hover:bg-zinc-900/95 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

