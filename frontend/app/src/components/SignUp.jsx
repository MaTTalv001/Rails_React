import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../api/auth";
import { AuthContext } from "../App";

export const SignUp = ({onClose}) => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = "http://localhost:3000";

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await signUp(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        // 通常はユーザー登録後にサーバーからユーザー情報が返される
        setCurrentUser(res.data.user); // 応答からユーザー情報を設定
        setIsSignedIn(true); // サインイン状態に設定
        //console.log(res);
        //alert("confirm email");
        if (onClose) onClose();
      } else {
        console.log("Registration Failed");
      }
      // 登録失敗の処理
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="bg-white">
        <h4 className="text-xl dark:text-white m-3">新規ユーザー登録</h4>
        <form>
          <div className="flex flex-col space-y-4">
            <div className="relative m-3">
              <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="xxxxx@xxxxxx.xxx"
                className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          
          <div className="relative m-3">
            <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-white">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="xxxxxxxxxxxx"
              className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative m-3">
            <label htmlFor="password_confirmation" className="block text-sm font-medium mb-2 dark:text-white">パスワード確認</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={passwordConfirmation}
              placeholder="xxxxxxxxxxxx"
              className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <div>
            <input
              type="hidden"
              id="confirm_success_url"
              name="confirm_success_url"
              className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
              value={confirmSuccessUrl}
            />
          </div>
          <button type="submit" onClick={(e) => handleSignUpSubmit(e)} className="m-3 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-400">
            ユーザー登録
            </button>
            </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;