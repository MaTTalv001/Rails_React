// PaginationButton.js
import React from 'react';

const PaginationButton = ({ children, onClick, disabled, direction }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`min-h-[100px] min-w-[100px] py-3 px-4 inline-flex justify-center items-center gap-x-1.5 text-2xl rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {direction === 'prev' && (
        <svg className="flex-shrink-0 w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      )}
      {children}
      {direction === 'next' && (
        <svg className="flex-shrink-0 w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      )}
    </button>
  );
};

export default PaginationButton;