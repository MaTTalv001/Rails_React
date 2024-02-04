import React from 'react';

const SearchForm = ({
  searchKeyword,
  setSearchKeyword,
  selectedYear,
  setSelectedYear,
  years,
  selectedSeason,
  setSelectedSeason,
  seasons,
  handleSearch,
  handleResetAndReload
}) => {
  return (
    <div className="search-form my-4 mx-2">
      <div className="relative flex rounded-lg shadow-sm">
        <input
          type="text"
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
        <button
          type="button"
          className="min-w-[8rem] py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold  border border-transparent bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={handleSearch}
        >
          検索
        </button>
        <button
          type="button"
          className="min-w-[8rem] py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-r-md border border-transparent bg-red-500 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={handleResetAndReload}
        >
          リセット
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
