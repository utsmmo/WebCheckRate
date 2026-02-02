
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RateTable from './components/RateTable';
import Login from './components/Login';
import { HOTEL_STRINGS, API_BASE_URL } from './constants';
import { ApiResponse, RoomRate } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [allowedHotelId, setAllowedHotelId] = useState('*');

  const allHotels = useMemo(() => {
    return HOTEL_STRINGS.map(s => {
      const [name, id] = s.split('|');
      return { name, id };
    });
  }, []);

  const hotels = useMemo(() => {
    if (allowedHotelId === '*' || !allowedHotelId) {
      return allHotels;
    }
    return allHotels.filter(h => h.id === allowedHotelId);
  }, [allHotels, allowedHotelId]);

  const [selectedHotelId, setSelectedHotelId] = useState('');

  // Update selectedHotelId when hotels list changes (e.g. after login)
  React.useEffect(() => {
    if (hotels.length > 0) {
      // If the previously selected hotel is not in the new list, or if no hotel is selected, select the first one.
      if (!selectedHotelId || !hotels.find(h => h.id === selectedHotelId)) {
        setSelectedHotelId(hotels[0].id);
      }
    }
  }, [hotels, selectedHotelId]);


  const [rates, setRates] = useState<RoomRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentHotelName = useMemo(() => {
    return allHotels.find(h => h.id === selectedHotelId)?.name || "Khách sạn";
  }, [selectedHotelId, allHotels]);

  const parseApiPrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const cleanPrice = priceStr.replace(/[^0-9]/g, '');
    return parseInt(cleanPrice, 10) || 0;
  };

  const handleSearch = async (hotelId: string, dates: { from: string; to: string }, adults: number, guests: number) => {
    setIsLoading(true);
    setError(null);
    setSelectedHotelId(hotelId);

    try {
      // Sử dụng cấu hình API từ constants
      const url = `${API_BASE_URL}/api/crawl?id=${hotelId}&checkin=${dates.from}&checkout=${dates.to}&adults=${adults}&guests=${guests}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Kết nối máy chủ thất bại.");

      const data: ApiResponse = await response.json();

      // Clear previous results before processing new ones
      setRates([]);

      if ((data.status === "success" || data.status === "ok") && data.rooms) {
        const mappedRates: RoomRate[] = data.rooms.map((room, index) => ({
          id: `${hotelId}-${index}`,
          name: room.roomType,
          description: `Standard for ${guests} guests`,
          basePrice: parseApiPrice(room.originalPrice),
          guests: guests,
          originalBasePrice: parseApiPrice(room.originalPrice),
          otaPrice: parseApiPrice(room.priceOTA),
          walkInPrice: parseApiPrice(room.priceReception),
          corporatePrice: parseApiPrice(room.priceCS),
          breakfast: room.breakfast,
          roomsLeft: parseInt(room.roomsLeft, 10) || 0,
        }));

        setRates(mappedRates);
        setSearchTriggered(true);
      } else if (data.status === "no_data") {
        setRates([]);
        setSearchTriggered(true);
      } else {
        throw new Error(data.status || "Dữ liệu không khả dụng.");
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Đã xảy ra lỗi hệ thống.");
      setRates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    alert(`Xuất báo cáo cho ${currentHotelName}...`);
  };

  const handleLoginSuccess = (username: string, hotelId: string) => {
    setCurrentUser(username);
    setAllowedHotelId(hotelId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light font-sans antialiased">
      <Header />

      <SearchBar hotels={hotels} onSearch={handleSearch} />

      <main className="flex-1 px-4 md:px-6 mt-4 md:-mt-6">
        <div className="max-w-[1200px] mx-auto pb-12">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-3 shadow-sm">
              <span className="material-symbols-outlined">error</span>
              <p className="font-medium text-sm">Lỗi: {error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white rounded border border-gray-300 p-12 md:p-20 flex flex-col items-center justify-center shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-booking-light-blue/20 border-t-booking-light-blue mb-4"></div>
              <p className="text-gray-600 font-bold text-center">Đang tải dữ liệu phòng...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-booking-blue">analytics</span>
                  {searchTriggered ? `${currentHotelName}` : "Tra cứu giá phòng"}
                </h2>
                {rates.length > 0 && (
                  <span className="text-[10px] md:text-xs bg-gray-200 px-2 py-1 rounded font-bold text-gray-600 uppercase">
                    {rates.length} Loại phòng
                  </span>
                )}
              </div>

              {rates.length > 0 ? (
                <RateTable rates={rates} />
              ) : !searchTriggered ? (
                <div className="bg-white rounded border border-gray-300 p-12 text-center text-gray-400 italic shadow-sm">
                  Vui lòng chọn khách sạn và nhấn "Check Price" để xem bảng giá.
                </div>
              ) : (
                <div className="bg-white rounded border border-gray-300 p-16 text-center shadow-sm flex flex-col items-center">
                  <span className="material-symbols-outlined text-5xl text-gray-200 mb-4">hotel_class</span>
                  <p className="text-gray-500 font-medium">Hết phòng hoặc không có dữ liệu cho ngày đã chọn.</p>
                  <p className="text-gray-400 text-sm mt-1">Vui lòng thử lại với ngày khác hoặc số lượng khách khác.</p>
                </div>
              )}

              {rates.length > 0 && (
                <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-6">
                  <div className="text-[11px] text-gray-500 order-2 md:order-1 text-center md:text-left">
                    Dữ liệu được cập nhật từ hệ thống OTA thời gian thực.
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto order-1 md:order-2">
                    <button
                      onClick={handleDownload}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-booking-light-blue text-booking-light-blue px-6 py-2.5 rounded font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm active:scale-95"
                    >
                      <span className="material-symbols-outlined text-lg">download</span>
                      Xuất báo cáo
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="mt-auto py-8 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-gray-400">
            &copy; 2024 JoyON Signature Stays. Người dùng: <span className="font-bold">{currentUser}</span>
          </div>
          <div className="flex gap-4 text-[10px] font-semibold text-gray-500">
            <button onClick={handleLogout} className="hover:text-red-500 transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">logout</span> Đăng xuất
            </button>
            <a href="#" className="hover:text-booking-light-blue transition-colors">Hỗ trợ kỹ thuật</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
