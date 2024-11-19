import React from 'react';

const Alert = ({ type = 'error', message }) => {
  const bgColors = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  };

  return (
    <div className={`${bgColors[type]} px-4 py-3 rounded relative mb-4`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Alert;