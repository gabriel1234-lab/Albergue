'use client';

import { useState, useEffect } from 'react';
import { Calendar, Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function PricingManagement() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const router = useRouter();

  const [seasonalPrices, setSeasonalPrices] = useState([
    { season: 'high_season', multiplier: 1.5 },
    { season: 'carnival', multiplier: 2.0 },
    { season: 'special_events', multiplier: 1.3 },
  ]);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">{t('pricing_config')}</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-2xl shadow-sm">
        <div className="space-y-8">
          {seasonalPrices.map((price, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex-grow">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t(price.season)}</label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input type="number" defaultValue={price.multiplier} step="0.1" className="w-32 border border-gray-200 rounded-xl p-3 font-bold text-gray-900 focus:ring-2 focus:ring-hostel-blue outline-none" />
                  </div>
                  <span className="text-gray-500 font-medium">{t('base_price_suffix')}</span>
                </div>
              </div>
              <button className="text-hostel-blue font-bold flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                <Calendar size={18}/> {t('schedule')}
              </button>
            </div>
          ))}
        </div>

        <button className="mt-10 w-full bg-hostel-red text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-opacity-90 transition-all">
          <Save size={20}/> {t('save_config')}
        </button>
      </div>
    </div>
  );
}
