'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RoomsManagement() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const router = useRouter();

  const [rooms, setRooms] = useState([
    { id: 1, type: 4, bathroom: true, gender: 'misto' },
    { id: 2, type: 8, bathroom: false, gender: 'masculino' },
    { id: 3, type: 12, bathroom: true, gender: 'feminino' },
  ]);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  const translatedGender = (gender: string) => {
    if (gender === 'misto') return t('mixed');
    if (gender === 'feminino') return t('female');
    if (gender === 'masculino') return t('male');
    return gender;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-bold">{t('manage_rooms')}</h1>
        <Link href="/admin/rooms/create" className="bg-hostel-blue text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-opacity-90 transition-all">
          <Plus size={20} /> {t('new_room')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white border border-gray-200 p-6 rounded-2xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="font-bold text-xl text-gray-900">{t('rooms').slice(0, -1)} #{room.id}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-gray-500 font-medium">
                  {room.type} {t('people')}
                </p>
                <p className="text-sm text-gray-400 capitalize">
                  {translatedGender(room.gender)} • {room.bathroom ? t('with_bathroom') : t('no')}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-gray-50 text-gray-400 hover:text-hostel-blue rounded-xl transition-colors">
                <Edit size={20}/>
              </button>
              <button className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors">
                <Trash2 size={20}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
