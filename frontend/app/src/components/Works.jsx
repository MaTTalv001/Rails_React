import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "preline/preline";
import Modal from './WorksModal';
import SearchForm from './SearchForm';
import WorkCard from './WorkCard';
import Pagination from './Pagination';
import Loading from './Loading'; 
//メイン部分
const Works = () => {
  const [works, setWorks] = useState([]); // アニメ作品のデータを保持するための状態
  const [isLoading, setIsLoading] = useState(true); // データ取得中かどうかの状態
  const currentYear = new Date().getFullYear(); //現在の西暦を取得
  const [page, setPage] = useState(1); //ページ番号を設定
  const [searchExecuted, setSearchExecuted] = useState(false); //検索ボタンが押されたかの状態
  const [searchKeyword, setSearchKeyword] = useState(''); //検索ワードの状態
  const [selectedYear, setSelectedYear] = useState(''); //検索年の状態
  const [selectedSeason, setSelectedSeason] = useState(''); //検索シーズン
  //モーダル関連
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkDetails, setSelectedWorkDetails] = useState(null);
  const handleWorkClick = async (workId) => {
    try {
      const workDetails = await fetchWorkDetails(workId);
      setSelectedWorkDetails(workDetails); // 取得した作品の詳細データを状態にセット
      setShowModal(true);
    } catch (error) {
      console.error('Failed to fetch work details:', error);
    }
  };
  //現在時期を抽出する
  const getCurrentYearAndSeason = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    let currentSeason;
    if (currentMonth >= 0 && currentMonth <= 2) {
      currentSeason = 'winter';
    } else if (currentMonth >= 3 && currentMonth <= 5) {
      currentSeason = 'spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      currentSeason = 'summer';
    } else {
      currentSeason = 'autumn';
    }
    return { currentYear, currentSeason };
  };
  // 年の選択肢を生成 (2000年から現在年まで)
  const years = ['年を選択', ...Array.from(new Array(currentYear - 1999), (val, index) => (2000 + index+1).toString())];
  // 季節の選択肢
  const seasons = ['季節を選択', 'winter', 'spring', 'summer', 'autumn'];
  // 検索を実施
  const fetchWorks = async (page, searchKeyword, search_season = null) => {
    let url = `http://localhost:3001/works?page=${page}`;
    if (searchKeyword) {
      url += `&search_keyword=${encodeURIComponent(searchKeyword)}`;
    }
    // search_seasonが指定されている場合、URLに年季節を追加
    if (search_season) {
      url += `&filter_season=${encodeURIComponent(search_season)}`;
    }
    try {
      const response = await axios.get(url);
      setWorks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setIsLoading(false);
    }
  };
  // nextボタンを押した時の設定
  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (searchExecuted) {
      fetchWorks(nextPage, searchKeyword, `${selectedYear}-${selectedSeason}`);
    } else {
      fetchWorks(nextPage, searchKeyword);
    }
  };
  // prevボタンを押した時の設定
  const handlePrevPage = () => {
    const prevPage = page - 1;
    setPage(prevPage);
    if (searchExecuted) {
      fetchWorks(prevPage, searchKeyword, `${selectedYear}-${selectedSeason}`);
    } else {
      fetchWorks(prevPage, searchKeyword);
    }
  };
  //リセットアクション
  const handleResetAndReload = () => {
    // 検索項目の状態をリセット
    setSelectedYear('年を選択');
    setSelectedSeason('季節を選択');
    setSearchKeyword('');
    // ページをリロード
    window.location.reload();
  };
  // 検索ハンドラ
  const handleSearch = () => {
    if (selectedYear === '年を選択' || selectedSeason === '季節を選択') {
      alert('仕様上、年と季節の両方選択する必要があります');
      return;
    }
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
    setSearchExecuted(true); // 検索が実行されたことを示す
  };
  //作品詳細画面モーダルのデータアクセス
  const fetchWorkDetails = async (workId) => {
    const url = `http://localhost:3001/works/${workId}`;
    try {
      const response = await axios.get(url);
      // レスポンスデータを返す（通常は作品の詳細データ）
      return response.data;
    } catch (error) {
      console.error('Error fetching work details: ', error);
      return null;
    }
  };

  useEffect(() => {
    const { currentYear, currentSeason } = getCurrentYearAndSeason();
    // 現在の年と季節で初回の検索を実行
    fetchWorks(1, '', `${currentYear}-${currentSeason}`);
  }, []); // 依存配列を空にすることで、コンポーネントのマウント時にのみ実行

  useEffect(() => {
    console.log('showModal has changed:', showModal);
  }, [showModal]); // showModalが変更されたときにのみ実行
  //loading画面
  if (isLoading) {
    return <Loading />;
  }
  //レンダリング画面
  return (
    <div className="bg-gray-400 min-h-screen w-full">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <SearchForm
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        years={years}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
        seasons={seasons}
        handleSearch={handleSearch}
        handleResetAndReload={handleResetAndReload}
      />
      <Pagination 
        page={page} 
        totalPages={10} // この値はAPIから取得するか、あるいは計算で求める
        handlePrevPage={handlePrevPage} 
        handleNextPage={handleNextPage} 
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map(work => (
          <WorkCard key={work.annict_id} work={work} handleWorkClick={handleWorkClick} />
        ))}
      </div>

        <div className={`modal ${showModal ? 'opacity-100' : 'opacity-0'}`}>
          <Modal show={showModal} onClose={() => setShowModal(false)} workDetails={selectedWorkDetails}>
            {/* ここでselectedWorkの内容をモーダルに渡して表示 */}
          </Modal>
        </div>
        <Pagination 
        page={page} 
        totalPages={10} // この値はAPIから取得するか、あるいは計算で求める
        handlePrevPage={handlePrevPage} 
        handleNextPage={handleNextPage} 
      />
      </div>
    </div>
  );
};

export default Works;