import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import Works from './components/Works';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { signOut } from './api/auth';
import Cookies from "js-cookie";

export const AuthContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
  handleGetCurrentUser();
}, []); 

  const handleLogout = async () => {
    try {
    // APIを呼び出してサーバーサイドのセッションを破棄
      await signOut();
      // クライアントサイドでのCookieのクリア
      Cookies.remove('_access_token');
      Cookies.remove('_client');
      Cookies.remove('_uid');

    // ユーザーのサインイン状態をfalseに設定
    setIsSignedIn(false);
    // currentUserをクリア
    setCurrentUser(null);
    // ここで必要に応じてリダイレクト
  } catch (error) {
    console.error('Failed to logout', error);
    // 必要に応じてエラーハンドリング
  }
};

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return <></>;
    }
  };
  return (
    <>
      <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
    <BrowserRouter>
          <Header isSignedIn={isSignedIn} handleLogout={handleLogout} /> 
        <Switch>
    <Private>
      <Route exact path="/">
        {/* メインコンテンツ */}
      </Route>
    </Private>
  </Switch>
  <Works />
      </BrowserRouter>
    </AuthContext.Provider>
    </>
  );
}

export default App;