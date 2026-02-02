
import React, { useState } from 'react';
import { USER_STRINGS } from '../constants';

interface LoginProps {
  onLogin: (username: string, allowedHotelId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const foundUserStr = USER_STRINGS.find(userStr => {
      const [u, p] = userStr.split('|');
      return u === username && p === password;
    });

    if (foundUserStr) {
      const parts = foundUserStr.split('|');
      // Default to '*' if no 3rd part provided
      const allowedHotelId = parts.length > 2 ? parts[2] : '*';
      onLogin(username, allowedHotelId);
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-booking-blue py-6 px-8 text-center">
          <h1 className="text-white text-2xl font-bold tracking-tight">JoyON Signature Stays</h1>
          <p className="text-blue-100 text-sm mt-1">Đăng nhập để quản lý giá phòng</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">person</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-booking-light-blue focus:border-booking-light-blue outline-none transition-all text-sm font-medium"
                placeholder="Tên đăng nhập"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-booking-light-blue focus:border-booking-light-blue outline-none transition-all text-sm font-medium"
                placeholder="Mật khẩu"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-booking-light-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-all shadow-md active:scale-[0.98]"
          >
            Đăng nhập
          </button>
        </form>

        <div className="px-8 pb-8 text-center">
          <p className="text-xs text-gray-400 italic">Hệ thống quản lý nội bộ dành cho nhân viên JoyON Hotel</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
