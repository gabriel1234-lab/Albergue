'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Filter, Bed, Bath, Users, CheckCircle2, Lock, Edit3, Trash2, X } from 'lucide-react';
import Link from 'next/link';

// Mock data updated with empty beds and prices
const INITIAL_ROOMS = [
  { id: 1, type: 4, bathroom: true, gender: 'misto', price: 100, emptyBeds: 2 },
  { id: 2, type: 4, bathroom: true, gender: 'feminino', price: 110, emptyBeds: 4 },
  { id: 3, type: 8, bathroom: false, gender: 'misto', price: 70, emptyBeds: 5 },
  { id: 4, type: 8, bathroom: false, gender: 'masculino', price: 70, emptyBeds: 0 },
  { id: 5, type: 12, bathroom: true, gender: 'misto', price: 85, emptyBeds: 10 },
];

const BookingPage = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [filter, setFilter] = useState({ type: 'all', gender: 'all', bathroom: 'all' });
  const [selectedBeds, setSelectedBeds] = useState<string[]>([]);

  // Admin Editing State
  const [editingRoom, setEditingRoom] = useState<any>(null);

  const filteredRooms = rooms.filter(room => {
    if (filter.type !== 'all' && room.type.toString() !== filter.type) return false;
    if (filter.gender !== 'all' && room.gender !== filter.gender) return false;
    if (filter.bathroom !== 'all' && room.bathroom.toString() !== filter.bathroom) return false;
    return true;
  });

  const toggleBedSelection = (roomId: number) => {
    if (isAdmin) {
      const room = rooms.find(r => r.id === roomId);
      setEditingRoom({...room});
      return;
    }

    const room = rooms.find(r => r.id === roomId);
    if (!room || room.emptyBeds === 0) return;

    const id = `R${roomId}`;
    setSelectedBeds(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleAdminSave = (e: React.FormEvent) => {
    e.preventDefault();
    setRooms(prev => prev.map(r => r.id === editingRoom.id ? editingRoom : r));
    setEditingRoom(null);
    alert(t('save_config'));
  };

  const handleAdminDelete = (id: number) => {
    if (confirm(t('delete_room') + '?')) {
      setRooms(prev => prev.filter(r => r.id !== id));
      setEditingRoom(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <h1 className="text-3xl font-bold mb-8">{t('booking_title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-hostel-blue font-bold">
            <Filter size={20} />
            <span>{t('filters')}</span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('room_type')}</label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-hostel-blue focus:ring-hostel-blue"
                onChange={(e) => setFilter({...filter, type: e.target.value})}
              >
                <option value="all">{t('all')}</option>
                <option value="4">{t('beds_4')}</option>
                <option value="8">{t('beds_8')}</option>
                <option value="12">{t('beds_12')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('gender')}</label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-hostel-blue focus:ring-hostel-blue"
                onChange={(e) => setFilter({...filter, gender: e.target.value})}
              >
                <option value="all">{t('all')}</option>
                <option value="misto">{t('mixed')}</option>
                <option value="feminino">{t('female')}</option>
                <option value="masculino">{t('male')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('bathroom')}</label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-hostel-blue focus:ring-hostel-blue"
                onChange={(e) => setFilter({...filter, bathroom: e.target.value})}
              >
                <option value="all">{t('indifferent')}</option>
                <option value="true">{t('yes')}</option>
                <option value="false">{t('no')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map(room => {
              const isSelected = selectedBeds.includes(`R${room.id}`);
              const isFull = room.emptyBeds === 0;
              const translatedGender = room.gender === 'misto' ? t('mixed') :
                                     room.gender === 'feminino' ? t('female') :
                                     room.gender === 'masculino' ? t('male') : room.gender;

              return (
                <div
                  key={room.id}
                  onClick={() => toggleBedSelection(room.id)}
                  className={`
                    relative p-6 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden
                    ${isFull && !isAdmin ? 'bg-gray-100 border-gray-200 grayscale opacity-60' :
                      isSelected ? 'border-hostel-red bg-red-50' : 'border-gray-200 hover:border-hostel-blue bg-white shadow-sm hover:shadow-md'}
                  `}
                >
                  {isAdmin && (
                    <div className="absolute top-2 right-2 bg-hostel-blue text-white p-1.5 rounded-full shadow-lg">
                      <Edit3 size={14} />
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-black text-xl text-gray-900">{t('rooms').slice(0, -1)} #{room.id}</h3>
                    <div className="text-right">
                       <p className="text-hostel-blue font-black text-lg">R$ {room.price}</p>
                       <p className="text-[10px] text-gray-400 uppercase font-bold">/ {t('person').toLowerCase()}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} />
                      <span className="text-sm font-medium">{room.type} {t('people')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 capitalize">
                      <div className={`w-2 h-2 rounded-full ${room.gender === 'feminino' ? 'bg-pink-400' : room.gender === 'masculino' ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
                      <span className="text-sm font-medium">{translatedGender}</span>
                    </div>
                    {room.bathroom && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <Bath size={16} />
                        <span className="text-sm font-bold">{t('with_bathroom')}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className={`text-xs font-black uppercase tracking-widest ${isFull ? 'text-red-500' : 'text-green-500'}`}>
                      {isFull ? t('rented') : `${room.emptyBeds} ${t('available')}`}
                    </span>
                    {!isAdmin && !isFull && isSelected && <CheckCircle2 size={20} className="text-hostel-red" />}
                    {!isAdmin && isFull && <Lock size={18} className="text-gray-400" />}
                  </div>
                </div>
              );
            })}
          </div>

          {!isAdmin && selectedBeds.length > 0 && (
            <div className="mt-12 bg-hostel-blue text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl animate-in slide-in-from-bottom-4 duration-300">
              <div>
                <p className="text-xl font-bold">{selectedBeds.length} {t('beds_selected')}</p>
                <p className="text-blue-100">{t('discount_notice')}</p>
              </div>
              <Link
                href={`/booking/register?beds=${selectedBeds.join(',')}`}
                className="bg-hostel-red text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                {t('continue_booking')}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Admin Edit Modal */}
      {isAdmin && editingRoom && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
               <h2 className="text-xl font-bold flex items-center gap-2">
                 <Edit3 size={20} className="text-hostel-red" />
                 {t('admin_actions')} - #{editingRoom.id}
               </h2>
               <button onClick={() => setEditingRoom(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                 <X size={24} />
               </button>
             </div>

             <form onSubmit={handleAdminSave} className="p-8 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('edit_price')}</label>
                   <input
                     type="number"
                     className="w-full border-2 border-gray-100 rounded-2xl p-4 text-xl font-black text-hostel-blue focus:border-hostel-blue outline-none transition-colors"
                     value={editingRoom.price}
                     onChange={e => setEditingRoom({...editingRoom, price: parseInt(e.target.value)})}
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('gender')}</label>
                   <select
                     className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:border-hostel-blue outline-none bg-white"
                     value={editingRoom.gender}
                     onChange={e => setEditingRoom({...editingRoom, gender: e.target.value})}
                   >
                     <option value="misto">{t('mixed')}</option>
                     <option value="feminino">{t('female')}</option>
                     <option value="masculino">{t('male')}</option>
                   </select>
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('empty_beds')}</label>
                 <div className="flex items-center gap-4">
                   <button
                     type="button"
                     className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl hover:bg-gray-200"
                     onClick={() => setEditingRoom({...editingRoom, emptyBeds: Math.max(0, editingRoom.emptyBeds - 1)})}
                   >-</button>
                   <input
                     type="number"
                     readOnly
                     className="flex-grow text-center text-xl font-bold bg-transparent outline-none"
                     value={editingRoom.emptyBeds}
                   />
                   <button
                     type="button"
                     className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl hover:bg-gray-200"
                     onClick={() => setEditingRoom({...editingRoom, emptyBeds: Math.min(editingRoom.type, editingRoom.emptyBeds + 1)})}
                   >+</button>
                 </div>
               </div>

               <div className="pt-6 flex flex-col gap-3">
                 <button
                   type="submit"
                   className="w-full bg-hostel-blue text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
                 >
                   {t('save')}
                 </button>
                 <button
                   type="button"
                   onClick={() => handleAdminDelete(editingRoom.id)}
                   className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold text-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                 >
                   <Trash2 size={20} />
                   {t('delete_room')}
                 </button>
               </div>
             </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
