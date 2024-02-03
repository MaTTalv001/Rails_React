import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "preline/preline";
import PaginationButton from './PaginationButton';

import {
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Ripple });

const Works = () => {
  const [works, setWorks] = useState([]); // アニメ作品のデータを保持するための状態
  const [isLoading, setIsLoading] = useState(true); // データ取得中かどうかの状態
  const handleError = (e) => {
    e.target.src = "/default-image.png";
  };

  const [page, setPage] = useState(1);
  const fetchWorks = async (page) => {
  try {
    const response = await axios.get(`http://localhost:3001/works?page=${page}`);
    console.log(response.data);
    setWorks(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching data: ', error);
    setIsLoading(false);
  }
};
    const handleNextPage = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchWorks(nextPage);
    };

    const handlePrevPage = () => {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchWorks(prevPage);
    };

    useEffect(() => {
      fetchWorks(page);
    }, [page]);

  if (isLoading) {
    return (
      <div className="bg-gray-200 min-h-screen w-full flex items-center justify-center">
  <div type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-500 text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
    <span className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
    Loading
  </div>
</div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen w-full">
      

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <nav className="flex items-center gap-x-1">
        <PaginationButton onClick={handlePrevPage} disabled={page === 1} direction="prev">
          Previous
        </PaginationButton>
      <PaginationButton onClick={handleNextPage} direction="next">
          Next
      </PaginationButton>
      </nav>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map(work => (
            <>
              <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                  <img src={work.image_url || '/default-image.png'} alt="Description" className="object-cover h-full w-full" onError={(e) => e.target.src = '/default-image.png'}/>
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
            </>
        ))}
        </div>
        <nav className="flex items-center gap-x-1">
  <PaginationButton onClick={handlePrevPage} disabled={page === 1} direction="prev">
    Previous
  </PaginationButton>
  <PaginationButton onClick={handleNextPage} direction="next">
    Next
  </PaginationButton>
</nav>
      </div>
      
      

      <div>      


</div>





    </div>
  );
};

export default Works;