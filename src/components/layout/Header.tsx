'use client';

import Link from 'next/link';
import { Menu, X, Globe, Plus, Users } from 'lucide-react';
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
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-hostel-blue">
              Hostel<span className="text-hostel-red">SantaTeresa</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-hostel-blue font-medium">{t('home')}</Link>
            <Link href="/booking" className="text-gray-700 hover:text-hostel-blue font-medium">{t('reserve')}</Link>
            <Link href="/recommendations" className="text-gray-700 hover:text-hostel-blue font-medium">{t('tips')}</Link>

            {isAdmin && (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/employees"
                  className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all shadow-sm"
                  title={t('manage_team')}
                >
                  <Users size={20} />
                </Link>
                <Link
                  href="/admin/rooms/create"
                  className="p-2 bg-hostel-blue text-white rounded-full hover:bg-opacity-90 transition-all shadow-md"
                  title={t('new_room')}
                >
                  <Plus size={20} />
                </Link>
              </div>
            )}

            <div className="relative flex items-center gap-2 cursor-pointer group">
              <Globe className="w-5 h-5 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-gray-700 bg-transparent border-none focus:ring-0 cursor-pointer uppercase text-sm font-bold"
              >
                <option value="pt">PT</option>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
                <option value="zh">ZH</option>
              </select>
            </div>
            <Link href="/booking" className="bg-hostel-red text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
              {t('reserve_now')}
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            {isAdmin && (
              <div className="flex items-center gap-2">
                <Link href="/admin/employees" className="p-2 bg-gray-100 text-gray-600 rounded-full">
                  <Users size={20} />
                </Link>
                <Link href="/admin/rooms/create" className="p-2 bg-hostel-blue text-white rounded-full">
                  <Plus size={20} />
                </Link>
              </div>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <Link href="/" className="block text-gray-700 font-medium">{t('home')}</Link>
          <Link href="/booking" className="block text-gray-700 font-medium">{t('reserve')}</Link>
          <Link href="/recommendations" className="block text-gray-700 font-medium">{t('tips')}</Link>
          <Link href="/booking" className="block bg-hostel-red text-white px-6 py-2 rounded-full font-bold text-center">
            {t('reserve_cta')}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
