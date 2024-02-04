import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ handleLoginSuccess }) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [enrollmentTerm, setEnrollmentTerm] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users', { nickname, password, enrollment_term: enrollmentTerm });
      if (response.data.status === 'created') {
        handleLoginSuccess(response.data.user);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="relative">
        <input
          type="text"
          className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
          placeholder="ニックネーム"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {/* ここにニックネームのアイコンや装飾を追加する場合 */}
      </div>

      <div className="relative">
        <input
          type="password"
          className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* ここにパスワードのアイコンや装飾を追加する場合 */}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">ユーザー登録</button>
    </form>
  );
};

export default RegistrationForm;
