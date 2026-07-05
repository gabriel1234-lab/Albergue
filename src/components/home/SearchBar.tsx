'use client';

import { useState } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/booking?checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}&guests=${searchData.guests}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 -mt-16 relative z-30">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-2xl p-4 md:p-2 grid grid-cols-1 md:grid-cols-4 gap-2 border border-gray-100"
      >
        <div className="flex flex-col p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-100">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-1">
            <Calendar size={14} className="text-hostel-red" />
            {t('check_in') || 'Check-in'}
          </label>
          <input
            type="date"
            className="bg-transparent border-none focus:ring-0 text-gray-900 font-semibold w-full cursor-pointer"
            onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
          />
        </div>

        <div className="flex flex-col p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-100">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-1">
            <Calendar size={14} className="text-hostel-red" />
            {t('check_out') || 'Check-out'}
          </label>
          <input
            type="date"
            className="bg-transparent border-none focus:ring-0 text-gray-900 font-semibold w-full cursor-pointer"
            onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
          />
        </div>

        <div className="flex flex-col p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-1">
            <Users size={14} className="text-hostel-red" />
            {t('guests_label') || 'Hóspedes'}
          </label>
          <select
            className="bg-transparent border-none focus:ring-0 text-gray-900 font-semibold w-full cursor-pointer appearance-none"
            onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
          >
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Pessoa' : 'Pessoas'}</option>)}
          </select>
        </div>

        <div className="p-2">
          <button
            type="submit"
            className="w-full h-full bg-hostel-blue hover:bg-opacity-90 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all py-4 md:py-0 shadow-lg"
          >
            <Search size={20} />
            {t('search_btn') || 'Buscar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
