'use client';

import { useState } from 'react';
import { Calendar, Save } from 'lucide-react';

export default function PricingManagement() {
  const [seasonalPrices, setSeasonalPrices] = useState([
    { season: 'Alta Temporada (Dez - Mar)', multiplier: 1.5 },
    { season: 'Carnaval', multiplier: 2.0 },
    { season: 'Eventos Especiais', multiplier: 1.3 },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">Configuração de Preços Sazonais</h1>

      <div className="bg-white border rounded-2xl p-8 max-w-2xl">
        <div className="space-y-6">
          {seasonalPrices.map((price, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-500 mb-1">{price.season}</label>
                <div className="flex items-center gap-4">
                  <input type="number" defaultValue={price.multiplier} step="0.1" className="w-24 border rounded-lg p-2" />
                  <span className="text-gray-400">x Preço Base</span>
                </div>
              </div>
              <button className="text-hostel-blue font-bold flex items-center gap-1 hover:underline">
                <Calendar size={18}/> Agendar
              </button>
            </div>
          ))}
        </div>

        <button className="mt-10 w-full bg-hostel-blue text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
          <Save size={20}/> Salvar Configurações
        </button>
      </div>
    </div>
  );
}
