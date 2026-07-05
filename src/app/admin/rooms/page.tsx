'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function RoomsManagement() {
  const [rooms, setRooms] = useState([
    { id: 1, type: 4, bathroom: true, gender: 'misto' },
    { id: 2, type: 8, bathroom: false, gender: 'masculino' },
    { id: 3, type: 12, bathroom: true, gender: 'feminino' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Gerenciar Quartos e Camas</h1>
        <button className="bg-hostel-blue text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={20} /> Novo Quarto
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white border p-6 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">Quarto #{room.id}</h3>
              <p className="text-gray-500 capitalize">
                {room.type} Camas • {room.gender} • {room.bathroom ? 'Com Banheiro' : 'Sem Banheiro'}
              </p>
            </div>
            <div className="flex gap-4">
              <button className="p-2 text-gray-400 hover:text-hostel-blue"><Edit size={20}/></button>
              <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={20}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
