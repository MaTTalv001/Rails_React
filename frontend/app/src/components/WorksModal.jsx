import React from 'react';

const Modal = ({ show, onClose, workDetails }) => {
  
  if (!show || !workDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div id="myModal" className="hs-overlay hs-overlay-backdrop-open:bg-blue-950/90 w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none pt-10">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-100 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto pointer-events-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            {/* ヘッダー */}
            <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-lg">
              <img src={workDetails?.image_url || '/default-image.png'} alt="Description" className="object-cover h-full w-full rounded-lg" onError={(e) => e.target.src = '/default-image.png'} />
              { }
            </div>
            {/* カード同様のボディ */}
            <div className="p-4 md:p-6">
              <span className="mt-3 text-gray-500">
                {workDetails?.year}:{workDetails?.season}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
                {workDetails?.title}
              </h3>
              <div className="mt-3">
                {workDetails.casts.slice(0, 5).map((castMember) => (
                  <div key={castMember.person_id} className="mt-1">
                    {/* キャストメンバーの情報を表示 */}
                    <p>{castMember.character_name}：<span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">{castMember.person_name}</span></p>
                    {/* ... その他のキャストメンバー情報 ... */}
                  </div>
                ))
                }
              </div>
            </div>
            {/* フッタ */}
            <div className="flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a href={workDetails?.official_site_url} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium  bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Official Site
              </a>
              <a href={workDetails?.twitter_url} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium  bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Official X (Twitter)
              </a>
            </div>
            {/* クローズボタン */}
            <div className="bg-gray-200 flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button onClick={onClose} className="...">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
