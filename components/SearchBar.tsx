
import React, { useState } from 'react';

interface SearchBarProps {
  hotels: { name: string; id: string }[];
  onSearch: (hotelId: string, dates: { from: string; to: string }, adults: number, guests: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ hotels, onSearch }) => {

  const [selectedHotel, setSelectedHotel] = useState(hotels[0].id);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [guests, setGuests] = useState(2);

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return 'Chọn ngày';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedHotel, { from: fromDate, to: toDate }, adults, guests);
  };

  return (
    <div className="bg-white border-b border-gray-200 py-6 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[24px] font-bold text-gray-900 mb-4">Availability</h2>

        <form onSubmit={handleSearch} className="flex flex-col gap-2">
          {/* Hotel Selection */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">location_on</span>
            <select
              id="hotel-select"
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border-2 border-booking-yellow rounded-[4px] focus:ring-0 focus:border-booking-yellow font-bold text-[14px] text-gray-800 appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {hotels.map(hotel => (
                <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-1">
            {/* Check-in Box - Entire area is clickable via invisible overlay */}
            <div className="flex-1 relative bg-white border-2 border-booking-yellow rounded-[4px] hover:bg-gray-50 transition-colors group">
              {/* Visual UI layer (Underneath) */}
              <div className="flex items-center px-3 h-[52px] w-full pointer-events-none">
                <span className="material-symbols-outlined text-gray-600 mr-3">calendar_today</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-0.5">Check-in</span>
                  <span className="text-[14px] font-bold text-gray-900 leading-none">
                    {formatDateLabel(fromDate)}
                  </span>
                </div>
              </div>
              {/* Native Input Overlay (Transparent, on top) */}
              <input
                type="date"
                value={fromDate}
                min={today}
                onChange={(e) => setFromDate(e.target.value)}
                onClick={(e) => (e.currentTarget as any).showPicker?.()}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                style={{ colorScheme: 'light' }}
              />
            </div>

            {/* Check-out Box - Entire area is clickable via invisible overlay */}
            <div className="flex-1 relative bg-white border-2 border-booking-yellow rounded-[4px] hover:bg-gray-50 transition-colors group">
              {/* Visual UI layer (Underneath) */}
              <div className="flex items-center px-3 h-[52px] w-full pointer-events-none">
                <span className="material-symbols-outlined text-gray-600 mr-3">calendar_today</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-0.5">Check-out</span>
                  <span className="text-[14px] font-bold text-gray-900 leading-none">
                    {formatDateLabel(toDate)}
                  </span>
                </div>
              </div>
              {/* Native Input Overlay (Transparent, on top) */}
              <input
                type="date"
                value={toDate}
                min={fromDate || today}
                onChange={(e) => setToDate(e.target.value)}
                onClick={(e) => (e.currentTarget as any).showPicker?.()}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                style={{ colorScheme: 'light' }}
              />
            </div>

            {/* Guests Box - selectable dropdown */}
            <div className="flex-1 relative bg-white border-2 border-booking-yellow rounded-[4px] hover:bg-gray-50 transition-colors group">
              <div className="flex items-center px-3 h-[52px] w-full">
                <span className="material-symbols-outlined text-gray-600 mr-3">person</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-0.5">Guests</span>
                  <select
                    value={guests}
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setGuests(val);
                      setAdults(val); // Đồng bộ adults với guests
                    }}
                    className="text-[14px] font-bold text-gray-900 bg-transparent border-none focus:outline-none"
                  >
                    {[2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} guests</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Search Button */}
            <button
              type="submit"
              className="bg-booking-light-blue hover:bg-blue-700 active:scale-[0.98] text-white font-bold px-10 py-3 rounded-[4px] text-[16px] transition-all flex items-center justify-center lg:w-auto w-full h-[52px] shadow-sm z-20"
            >
              Check Price
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
