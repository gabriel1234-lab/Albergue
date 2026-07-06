'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Search } from 'lucide-react';

export default function BookingsManagement() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState([
    { id: '1001', guest: 'Ana Silva', beds: 'B01, B02', checkIn: '20/05/2024', status: 'confirmed', total: '160' },
    { id: '1002', guest: 'John Doe', beds: 'B12', checkIn: '21/05/2024', status: 'pending', total: '80' },
    { id: '1003', guest: 'Marc Dupont', beds: 'B45, B46, B47', checkIn: '22/05/2024', status: 'confirmed', total: '240' },
  ]);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-bold">{t('manage_bookings')}</h1>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t('search_btn') + '...'}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-hostel-blue outline-none"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold border-b">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">{t('guest')}</th>
                <th className="px-6 py-4">{t('rooms').slice(0, -1)}</th>
                <th className="px-6 py-4">{t('check_in')}</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">{t('status')}</th>
                <th className="px-6 py-4">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">#{booking.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{booking.guest}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{booking.beds}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.checkIn}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">R$ {booking.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {t(booking.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button title={t('confirm')} className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <CheckCircle size={20} />
                      </button>
                      <button title={t('cancel')} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <XCircle size={20} />
                      </button>
                    </div>
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
