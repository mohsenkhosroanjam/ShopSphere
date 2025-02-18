import React from 'react';

 const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="relative z-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;