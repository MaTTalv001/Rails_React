import SignIn from './SignIn';

const SignInModal = ({ showSignInModal, onClose }) => {
  if (!showSignInModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div id="SignInModal" style={{ maxWidth: '600px', width: '100%', background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)', position: 'relative', zIndex: 80 }}>
      <SignIn onClose={onClose} />
      <div className=" flex justify-end items-center gap-x-2 py-3 px-4  rounded-lg">
              <button  onClick={onClose} className="text-white bg-gray-400 hover:bg-gray-700 font-bold py-2 px-4 rounded">
                Close
              </button>
      </div>
      </div>
    </div>
  );
};

export default SignInModal;