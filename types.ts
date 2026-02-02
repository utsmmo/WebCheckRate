
export interface ApiRoom {
  roomType: string;
  guests: string;
  originalPrice: string;
  priceOTA: string;
  priceReception: string;
  priceCS: string;
  breakfast: string;
  roomsLeft: string;
}

export interface ApiResponse {
  hotelId: string;
  sourceUrl: string;
  crawlDate: string;
  status: string;
  rooms: ApiRoom[];
}

export interface RoomRate {
  id: string;
  name: string;
  description: string;
  guests: number;
  basePrice: number;
  originalBasePrice: number;
  otaPrice: number;
  walkInPrice: number;
  corporatePrice: number;
  breakfast: string;
  roomsLeft: number;
}

export interface Hotel {
  id: string;
  name: string;
}
