import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../api/auth";
import { AuthContext } from "../App";

export const SignIn = ({onClose}) => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e) => {
  e.preventDefault();
  const params = generateParams();

  try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        // ログインに成功したらモーダルを閉じる
        console.log('Calling onClose to close the modal.');
        if (onClose) onClose();

        //history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="bg-white">
        <h4 className="text-xl dark:text-white m-3">ログイン</h4>
        <form >
          <div className="flex flex-col space-y-4">
            <div className="relative m-3">
              <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="xxxxx@xxxxxx.xxx"
                value={email}
                className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative m-3">
              <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-white">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="xxxxxxxxxxxx"
                value={password}
                className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" onClick={(e) => handleSignInSubmit(e)} className="m-3 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-400">
              ログイン
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;