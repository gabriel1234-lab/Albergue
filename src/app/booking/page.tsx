'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Filter, Bed, Bath, Users, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';

// Mock data based on requirements
const ROOMS = [
  { id: 1, type: 4, bathroom: true, gender: 'misto', price: 100 },
  { id: 2, type: 4, bathroom: true, gender: 'feminino', price: 110 },
  { id: 3, type: 8, bathroom: false, gender: 'misto', price: 70 },
  { id: 4, type: 8, bathroom: false, gender: 'masculino', price: 70 },
  { id: 5, type: 12, bathroom: true, gender: 'misto', price: 85 },
  // ... more rooms to reach 20
];

const BookingPage = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState({ type: 'all', gender: 'all', bathroom: 'all' });
  const [selectedBeds, setSelectedBeds] = useState<string[]>([]);

  // Simulation of beds (total 230)
  const beds = Array.from({ length: 10 }, (_, i) => ({
    id: `B${i + 1}`,
    room: (i % 5) + 1,
    status: i % 7 === 0 ? 'rented' : 'available',
    number: i + 1
  }));

  const filteredBeds = beds.filter(bed => {
    const room = ROOMS.find(r => r.id === bed.room);
    if (!room) return false;

    if (filter.type !== 'all' && room.type.toString() !== filter.type) return false;
    if (filter.gender !== 'all' && room.gender !== filter.gender) return false;
    if (filter.bathroom !== 'all' && room.bathroom.toString() !== filter.bathroom) return false;

    return true;
  });

  const toggleBed = (id: string, status: string) => {
    if (status === 'rented') return;
    setSelectedBeds(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Reserve sua estadia</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-hostel-blue font-bold">
            <Filter size={20} />
            <span>Filtros</span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Quarto</label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-hostel-blue focus:ring-hostel-blue"
                onChange={(e) => setFilter({...filter, type: e.target.value})}
              >
                <option value="all">Todos</option>
                <option value="4">4 Camas</option>
                <option value="8">8 Camas</option>
                <option value="12">12 Camas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-hostel-blue focus:ring-hostel-blue"
                onChange={(e) => setFilter({...filter, gender: e.target.value})}
              >
                <option value="all">Todos</option>
                <option value="misto">Misto</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banheiro Privativo</label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-hostel-blue focus:ring-hostel-blue"
                onChange={(e) => setFilter({...filter, bathroom: e.target.value})}
              >
                <option value="all">Indiferente</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBeds.map(bed => {
              const isSelected = selectedBeds.includes(bed.id);
              const isRented = bed.status === 'rented';
              const room = ROOMS.find(r => r.id === bed.room);

              return (
                <div
                  key={bed.id}
                  onClick={() => toggleBed(bed.id, bed.status)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all cursor-pointer
                    ${isRented ? 'bg-gray-100 border-gray-200 grayscale opacity-60' :
                      isSelected ? 'border-hostel-red bg-red-50' : 'border-gray-200 hover:border-hostel-blue bg-white'}
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-bold text-lg">#{bed.number}</span>
                    {isRented ? <Lock size={16} className="text-gray-400" /> : isSelected ? <CheckCircle2 size={18} className="text-hostel-red" /> : <Bed size={18} className="text-gray-400" />}
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="flex items-center gap-1"><Users size={12}/> {room?.type} camas</p>
                    <p className="capitalize">{room?.gender}</p>
                    {room?.bathroom && <p className="flex items-center gap-1 text-blue-600"><Bath size={12}/> Com Banheiro</p>}
                  </div>
                  {isRented && <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Alugada</span>
                  </div>}
                </div>
              );
            })}
          </div>

          {selectedBeds.length > 0 && (
            <div className="mt-12 bg-hostel-blue text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-xl font-bold">{selectedBeds.length} Cama(s) selecionada(s)</p>
                <p className="text-blue-100">Descontos aplicados automaticamente no próximo passo.</p>
              </div>
              <Link
                href={`/booking/register?beds=${selectedBeds.join(',')}`}
                className="bg-hostel-red text-white px-10 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                Continuar Reserva
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
