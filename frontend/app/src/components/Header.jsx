import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isSignedIn, handleLogout }) => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-gray-800 text-sm py-4 ">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <a className="pl-4 flex-none text-xl font-semibold text-white" href="#">ANIME DB</a>
        <div className="flex text-white flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          {isSignedIn ? (
            <div className="text-lg dark:text-white m-2">
              <button onClick={handleLogout}>ログアウト</button>
            </div>
          ) : (
            <div className="text-lg dark:text-white">
              <Link to="/signin">
                <button className="m-2">ログイン</button>
              </Link>
              <Link to="/signup">
                <button>ユーザー登録</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;