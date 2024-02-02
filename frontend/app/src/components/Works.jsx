import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Works = () => {
  const [works, setWorks] = useState([]); // アニメ作品のデータを保持するための状態
  const [isLoading, setIsLoading] = useState(true); // データ取得中かどうかの状態

  useEffect(() => {
    // APIからデータを取得する関数
    const fetchWorks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/works'); // Railsサーバーのエンドポイントを指定
        console.log(response.data);
        setWorks(response.data); // 取得したデータを状態にセット
        setIsLoading(false); // ローディング状態を解除
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false); // エラーが発生してもローディング状態を解除
      }
    };

    fetchWorks(); // コンポーネントがマウントされた時にデータを取得
  }, []); // 空の依存配列を渡すことで、コンポーネントがマウントされた時にのみ実行

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>アニメ作品リスト</h1>
      <ul>
        {works.map(work => (
          <li key={work.id}>{work.title}</li> // ここでwork.titleを表示
        ))}
      </ul>
    </div>
  );
};

export default Works;