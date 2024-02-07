import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

const Header = ({ isSignedIn, handleLogout }) => {

  //モーダル関連（サインイン）
  const [showSignInModal, setShowSignInModal] = useState(false);
  const handleSignInClick = async () => {
    try {
      setShowSignInModal(true);
    } catch (error) {
      console.error('Failed to signIn', error);
    }
  };

  //モーダル関連（ユーザー登録）
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const handleSignUpClick = async () => {
    try {
      setShowSignUpModal(true);
    } catch (error) {
      console.error('Failed to signIn', error);
    }
  };


  return (
    <>
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-gray-800 text-sm py-4 ">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <a className="pl-4 flex-none text-xl font-semibold text-white" href="#">ANIME DB</a>
        <div className="flex text-white flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          {isSignedIn ? (
            <div className="text-lg dark:text-white m-2">
              <button onClick={handleLogout}>ログアウト</button>
            </div>
          ) : (
            <div className="text-lg dark:text-white" >
              <Link to="/signin">
                <button className="m-2" onClick={handleSignInClick} >ログイン</button>
              </Link>
              <Link to="/signup">
                <button className="m-2" onClick={handleSignUpClick}>ユーザー登録</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      </header>

    <div className={`modal ${showSignInModal ? 'opacity-100' : 'opacity-0'}`}>
          <SignInModal showSignInModal={showSignInModal} onClose={() => setShowSignInModal(false)} />
      </div>
      
      <div className={`modal ${showSignUpModal ? 'opacity-100' : 'opacity-0'}`}>
          <SignUpModal showSignUpModal={showSignUpModal} onClose={() => setShowSignUpModal(false)} />
    </div>
    
    </>

    
    
  );
};

export default Header;