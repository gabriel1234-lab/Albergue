'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Footer = () => {
  const { t } = useLanguage();
  const { isAdmin, logout } = useAuth();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Hostel<span className="text-hostel-red">SantaTeresa</span>
            </h3>
            <p className="text-gray-400 max-w-xs">
              {t('footer_desc')}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('links')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">{t('about_us')}</a></li>
              <li><a href="#" className="hover:text-white">{t('rooms')}</a></li>
              <li><a href="#" className="hover:text-white">{t('location')}</a></li>
              <li><a href="#" className="hover:text-white">{t('contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('contact')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t('address')}</li>
              <li>contato@hostelsantateresa.com.br</li>
              <li>+55 21 9999-9999</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <div>&copy; {new Date().getFullYear()} Hostel Santa Teresa. {t('rights')}</div>
          {isAdmin ? (
            <button
              onClick={logout}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('logout')}
            </button>
          ) : (
            <Link href="/admin/login" className="hover:text-white transition-colors">
              {t('admin_login')}
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
