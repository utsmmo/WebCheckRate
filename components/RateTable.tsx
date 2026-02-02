
import React from 'react';
import { RoomRate } from '../types';

interface RateTableProps {
  rates: RoomRate[];
}

const RateTable: React.FC<RateTableProps> = ({ rates }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <div className="bg-transparent md:bg-white md:rounded md:border md:border-gray-300 overflow-hidden md:shadow-sm">
      {/* Mobile View */}
      <div className="md:hidden space-y-2">
        {rates.map((rate) => (
          <div key={rate.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-booking-light-blue font-bold text-[14px] leading-tight flex-1 pr-2 truncate">
                {rate.name}
              </h3>
              <div className="text-right flex items-center gap-2">
                <span className="text-[10px] font-bold text-booking-blue bg-blue-50 px-1 py-0.5 rounded">OTA</span>
                <span className="text-base font-extrabold text-booking-blue">{formatCurrency(rate.otaPrice)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-50">
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold">Quầy</p>
                <p className="text-[12px] font-bold text-gray-700">{formatCurrency(rate.walkInPrice)}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold">C.Ty</p>
                <p className="text-[12px] font-bold text-booking-green">{formatCurrency(rate.corporatePrice)}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-bold">Gốc</p>
                <p className="text-[12px] font-bold text-gray-400">{formatCurrency(rate.basePrice)}</p>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-[10px] text-gray-400 italic truncate max-w-[60%]">{rate.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                  {rate.roomsLeft} left
                </span>
                <span className="text-[10px] text-booking-green font-bold bg-green-50 px-1.5 py-0.5 rounded">
                  {rate.breakfast}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#f2f2f2] text-[13px] text-[#1a1a1a] font-bold border-b border-gray-300">
              <th className="px-5 py-4">Room Type</th>
              <th className="px-5 py-4 text-center">Guests</th>
              <th className="px-5 py-4 text-center">Breakfast</th>
              <th className="px-5 py-4 text-center">Left</th>
              <th className="px-5 py-4 text-right">Base Price</th>
              <th className="px-5 py-4 text-right">OTA Channel</th>
              <th className="px-5 py-4 text-right">Front Desk</th>
              <th className="px-5 py-4 text-right">CS Channel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rates.map((rate) => (
              <tr key={rate.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-5 py-6 align-top">
                  <div className="flex flex-col">
                    <span className="text-booking-light-blue font-bold text-[16px]">
                      {rate.name}
                    </span>
                    <p className="text-[11px] text-gray-500 mt-1 font-medium">{rate.description}</p>
                  </div>
                </td>
                <td className="px-5 py-6 text-center align-top">
                  <div className="flex justify-center gap-0.5 text-gray-400">
                    {Array.from({ length: Math.min(rate.guests, 4) }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]">person</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-6 text-center align-top">
                  <span className="text-[12px] font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    {rate.breakfast}
                  </span>
                </td>
                <td className="px-5 py-6 text-center align-top">
                  <span className={`text-[12px] font-bold px-2 py-1 rounded ${rate.roomsLeft < 3 ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50'}`}>
                    {rate.roomsLeft}
                  </span>
                </td>
                <td className="px-5 py-6 text-right align-top">
                  <div className="text-sm font-bold text-gray-400">{formatCurrency(rate.basePrice)}</div>
                </td>
                <td className="px-5 py-6 text-right align-top">
                  <div className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider mb-2 inline-block">
                    OTA
                  </div>
                  <div className="text-lg font-bold text-booking-blue">{formatCurrency(rate.otaPrice)}</div>
                </td>
                <td className="px-5 py-6 text-right align-top">
                  <div className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider mb-2 inline-block">
                    WALK-IN
                  </div>
                  <div className="text-sm font-bold text-gray-800">{formatCurrency(rate.walkInPrice)}</div>
                </td>
                <td className="px-5 py-6 text-right align-top">
                  <div className="bg-green-100 text-booking-green px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider mb-2 inline-block">
                    CORPORATE
                  </div>
                  <div className="text-sm font-bold text-booking-green">{formatCurrency(rate.corporatePrice)}</div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RateTable;
