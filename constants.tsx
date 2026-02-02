import { RoomRate } from './types';

// Cấu hình đường dẫn API
// Nếu chạy local cùng máy với tool crawl (ví dụ port 5000), bỏ comment dòng dưới:
// export const API_BASE_URL = "http://localhost:5000"; 
export const API_BASE_URL = "https://myapi.joyon.asia";

// Định dạng: Tên khách sạn|ID
export const HOTEL_STRINGS: string[] = [
  "Beachfront Hotel Hoi An|beach-front-thanh-pho-hoi-an",
  "La ALBA Beach Villa|la-alba-villa",
  "Eco Hotel Hoi An|eco-hoian.vi",
  "Old Town Hotel|thien-thanh",
  "Ony Retreat Villas|ony-retreat-villas",
  "NA Hoian Hotel|na-hoian.vi",
  "Sala Hoi An Hotel|thien-trung-hoi-an.vi",
];

// Định dạng: Username|Password|AllowedHotelId (AllowedHotelId = * means all)
export const USER_STRINGS: string[] = [
  "admin|joyon123|*",
  "manager|joyon123|*",
  "HA1|HA1|ony-retreat-villas",
  "HA3|HA3|beach-front-thanh-pho-hoi-an",
  "HA5|HA5|thien-trung-hoi-an.vi",
  "HA6|HA6|thien-thanh",
  "HA7|HA7|eco-hoian.vi",
  "HA8|HA8|la-alba-villa",
  "HA9|HA9|na-hoian.vi",
];

export const MOCK_RATES: RoomRate[] = [
  {
    id: '1',
    name: 'Deluxe Double Room',
    description: 'City view • 32m²',
    guests: 2,
    basePrice: 1100000,
    originalBasePrice: 1100000,
    otaPrice: 1354412,
    walkInPrice: 1250000,
    corporatePrice: 1200000,
    breakfast: "included",
    roomsLeft: 5,
  }
];
