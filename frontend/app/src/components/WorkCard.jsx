import React from 'react';

const WorkCard = ({ work, handleWorkClick }) => {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-lg" onClick={() => handleWorkClick(work.annict_id)}>
        <img src={work.image_url || '/default-image.png'} alt={work.title} className="object-cover h-full w-full rounded-lg" onError={(e) => e.target.src = '/default-image.png'} />
      </div>
      <div className="p-4 md:p-6">
        <span className="mt-3 text-gray-500">
          {work.year}:{work.season}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
          {work.title}
        </h3>
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
        <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href={work.official_site_url} target="_blank" rel="noopener noreferrer">
          Official Site
        </a>
        <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href={work.twitter_url} target="_blank" rel="noopener noreferrer">
          Official X (Twitter)
        </a>
      </div>
    </div>
  );
};

export default WorkCard;