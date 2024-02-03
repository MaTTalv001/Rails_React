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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedSeason, setSelectedSeason] = useState('');
  
  // 年の選択肢を生成 (2000年から現在年まで)
  const years = Array.from(new Array(new Date().getFullYear() - 1999), (val, index) => 2000 + index);
  
  // 季節の選択肢
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  
  const fetchWorks = async (page, searchKeyword, search_season = null) => {
    let url = `http://localhost:3001/works?page=${page}`;
    if (searchKeyword) {
      url += `&search_keyword=${encodeURIComponent(searchKeyword)}`;
    }
    // search_seasonが指定されている場合、URLに年季節を追加
    if (search_season) {
      url += `&filter_season=${encodeURIComponent(search_season)}`;
    }
    console.log('Request URL:', url); 
  try {
    const response = await axios.get(url);
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
      fetchWorks(nextPage, searchKeyword);
    };

    const handlePrevPage = () => {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchWorks(prevPage, searchKeyword);
    };
  
  // 検索ハンドラ
  const handleSearch = () => {
  console.log('Searching for:', searchKeyword);
  setPage(1); // 新しい検索のためにページをリセット

    // 年と季節が選択されている場合、filter_seasonを追加して検索
    // 年と季節が選択されている場合、search_seasonを定義
  const search_season = selectedYear && selectedSeason ? `${selectedYear}-${selectedSeason}` : null;
    if (search_season) {
    fetchWorks(1, searchKeyword, search_season);
  } else {
    // 年と季節が選択されていない場合、通常の検索を実行
    fetchWorks(1, searchKeyword);
  }
};

    useEffect(() => {
      fetchWorks(page);
    }, [page]);

  if (isLoading) {
    return (
      <div className="bg-gray-400 min-h-screen w-full flex items-center justify-center">
  <div type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-transparent bg-gray-500 text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
    <span className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
    Loading
  </div>
</div>
    );
  }

  return (
    <div className="bg-gray-400 min-h-screen w-full">
      
      

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

        <div className="search-form my-4 mx-2">
        <label htmlFor="hs-trailing-button-add-on-with-icon-and-button" className="sr-only">Label</label>
        <div className="relative flex rounded-lg shadow-sm">
          <input
            type="text"
            id="hs-trailing-button-add-on-with-icon-and-button"
            name="hs-trailing-button-add-on-with-icon-and-button"
            className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-l-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="タイトル検索"
            value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // エンターキーのデフォルトの動作を防止
        handleSearch();
      }
    }}
            />
            
             {/* 年の選択 */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {/* 季節の選択 */}
      <select
        value={selectedSeason}
        onChange={(e) => setSelectedSeason(e.target.value)}
      >
        {seasons.map(season => (
          <option key={season} value={season}>{season}</option>
        ))}
      </select>
        
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
            <svg className="flex-shrink-0 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-r-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>






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
                <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-lg">
                  <img src={work.image_url || '/default-image.png'} alt="Description" className="object-cover h-full w-full rounded-lg" onError={(e) => e.target.src = '/default-image.png'}/>
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
        <nav className="flex items-center gap-x-1 ">
  <PaginationButton onClick={handlePrevPage} disabled={page === 1} direction="prev">
    <p>Previous</p>
  </PaginationButton>
  <PaginationButton onClick={handleNextPage} direction="next">
    <p>Next</p>
  </PaginationButton>
</nav>
      </div>
      
      

      <div>      


</div>





    </div>
  );
};

export default Works;