'use client';

import Link from 'next/link';
import { Menu, X, Globe, Plus, Users, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/lib/i18n';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isAdmin } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-4">
            <Link href="/" className="text-2xl font-black text-hostel-blue tracking-tighter">
              Hostel<span className="text-hostel-red">SantaTeresa</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-hostel-blue font-bold text-sm uppercase tracking-widest transition-colors">{t('home')}</Link>
            <Link href="/booking" className="text-gray-600 hover:text-hostel-blue font-bold text-sm uppercase tracking-widest transition-colors">{t('reserve')}</Link>
            <Link href="/recommendations" className="text-gray-600 hover:text-hostel-blue font-bold text-sm uppercase tracking-widest transition-colors">{t('tips')}</Link>

            {isAdmin && (
              <div className="flex items-center gap-2 border-l border-gray-100 pl-6 ml-2">
                <Link
                  href="/admin"
                  className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-all shadow-sm"
                  title={t('dashboard')}
                >
                  <LayoutDashboard size={18} />
                </Link>
                <Link
                  href="/admin/employees"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-md"
                >
                  <Users size={16} />
                  <span className="text-xs font-black uppercase tracking-tighter">{t('manage_team').split(' ')[1]}</span>
                </Link>
                <Link
                  href="/admin/rooms/create"
                  className="p-2.5 bg-hostel-blue text-white rounded-xl hover:bg-opacity-90 transition-all shadow-md"
                  title={t('new_room')}
                >
                  <Plus size={18} />
                </Link>
              </div>
            )}

            <div className="relative flex items-center gap-2 cursor-pointer group ml-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-gray-900 bg-transparent border-none focus:ring-0 cursor-pointer uppercase text-xs font-black"
              >
                <option value="pt">PT</option>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
                <option value="zh">ZH</option>
              </select>
            </div>

            <Link href="/booking" className="bg-hostel-red text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95">
              {t('reserve_now')}
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            {isAdmin && (
              <Link href="/admin/employees" className="p-2 bg-gray-900 text-white rounded-lg">
                <Users size={20} />
              </Link>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 p-2 hover:bg-gray-50 rounded-lg">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 gap-4">
            <Link href="/" className="text-lg font-bold text-gray-900" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
            <Link href="/booking" className="text-lg font-bold text-gray-900" onClick={() => setIsMenuOpen(false)}>{t('reserve')}</Link>
            <Link href="/recommendations" className="text-lg font-bold text-gray-900" onClick={() => setIsMenuOpen(false)}>{t('tips')}</Link>
            {isAdmin && (
               <>
                 <hr className="border-gray-100" />
                 <Link href="/admin" className="text-lg font-bold text-hostel-blue flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                   <LayoutDashboard size={20} /> {t('dashboard')}
                 </Link>
                 <Link href="/admin/employees" className="text-lg font-bold text-hostel-blue flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                   <Users size={20} /> {t('manage_team')}
                 </Link>
                 <Link href="/admin/rooms/create" className="text-lg font-bold text-hostel-blue flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                   <Plus size={20} /> {t('new_room')}
                 </Link>
               </>
            )}
          </div>
          <Link href="/booking" className="block bg-hostel-red text-white py-4 rounded-2xl font-black text-center text-lg shadow-xl" onClick={() => setIsMenuOpen(false)}>
            {t('reserve_cta')}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
