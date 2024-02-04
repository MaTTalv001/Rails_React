// Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="bg-gray-400 min-h-screen w-full flex items-center justify-center">
      <div type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-transparent bg-gray-500 text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        <span className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
        Loading
      </div>
    </div>
  );
};

export default Loading;