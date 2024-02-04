import React, { useState } from 'react';
import Works from './components/Works';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  // ユーザーのログイン状態を管理する状態
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ログアウト処理を行う関数
  const handleLogout = () => {
    // ここで実際のログアウト処理を行います
    // 例: APIを呼び出してセッションを破棄するなど
    setIsLoggedIn(false); // ログイン状態をfalseに設定
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Works />
    </div>
  );
}

export default App;