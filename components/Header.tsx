
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-booking-blue text-white px-6 py-4 shadow-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold tracking-tight">JoyON Hotel</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#" className="border-b-2 border-white pb-1">Bảng giá</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Báo cáo</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs md:text-sm font-bold leading-none uppercase tracking-widest">Admin</p>
          </div>
          <div 
            className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white/20 shadow-sm"
          >
            <span className="material-symbols-outlined text-white text-xl">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
