import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import Works from './components/Works';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

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
  }, [setCurrentUser]);

  const handleLogout = () => {
    // 実際のログアウト処理をここで行う（例: APIを呼び出してセッションを破棄する）
    setIsSignedIn(false); // ユーザーのサインイン状態をfalseに設定
    setCurrentUser(null); // currentUserをクリア
    // 任意で、ここでリダイレクトを行うこともできます。
  };

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="signin" />;
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
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Private>
            <Route exact path="/">
              <Works />
            </Route>
          </Private>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
    </>
  );
}

export default App;