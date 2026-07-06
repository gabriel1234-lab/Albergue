'use client';

import Link from 'next/link';
import { Bed, Users, TrendingUp, Settings, CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const stats = [
    { label: t('occupied_beds'), value: '142 / 230', icon: <Bed className="text-blue-500" /> },
    { label: t('today_checkins'), value: '18', icon: <Users className="text-green-500" /> },
    { label: t('monthly_revenue'), value: 'R$ 45.200', icon: <TrendingUp className="text-purple-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
        <div className="grid grid-cols-2 md:flex gap-4 w-full md:w-auto">
           <Link href="/admin/rooms" className="flex items-center justify-center gap-2 bg-white border px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
             <Bed size={20} className="text-hostel-blue"/> {t('rooms_short')}
           </Link>
           <Link href="/admin/pricing" className="flex items-center justify-center gap-2 bg-white border px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
             <TrendingUp size={20} className="text-hostel-red"/> {t('prices_short')}
           </Link>
           <Link href="/admin/employees" className="flex items-center justify-center gap-2 bg-white border px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
             <Settings size={20} className="text-gray-500"/> {t('team_short')}
           </Link>
           <Link href="/admin/bookings" className="flex items-center justify-center gap-2 bg-white border px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
             <CalendarCheck size={20} className="text-green-500"/> {t('bookings_short')}
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
              <span className="text-gray-500 font-bold uppercase text-xs tracking-wider">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-bold text-xl">{t('latest_bookings')}</h2>
          <Link href="/admin/bookings" className="text-hostel-blue font-bold text-sm hover:underline">
            {t('all')} &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
              <tr>
                <th className="px-6 py-4">{t('guest')}</th>
                <th className="px-6 py-4">{t('rooms_short').slice(0, -1)}</th>
                <th className="px-6 py-4">{t('check_in')}</th>
                <th className="px-6 py-4">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{t('guest')} {i}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">B0{i}, B1{i}</td>
                  <td className="px-6 py-4 text-gray-600">20/05/2024</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {t('confirmed')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
