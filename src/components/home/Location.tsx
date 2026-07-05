'use client';

import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Utensils, Camera, Map as MapIcon } from 'lucide-react';

const Location = () => {
  const { t } = useLanguage();

  const recommendations = [
    { title: 'Bonde de Santa Teresa', type: 'Turismo', desc: 'O passeio mais icônico do bairro.' },
    { title: 'Escadaria Selarón', type: 'Cultura', desc: 'Mosaicos coloridos famosos mundialmente.' },
    { title: 'Parque das Ruínas', type: 'Vista', desc: 'A melhor vista panorâmica do Rio.' },
    { title: 'Largo do Guimarães', type: 'Gastronomia', desc: 'Bares e restaurantes charmosos.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              O Charme de <span className="text-hostel-red">Santa Teresa</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Localizado em uma área de fácil acesso, nosso hostel é o ponto de partida ideal para explorar a alma boêmia do Rio de Janeiro.
              Ruas de paralelepípedo, casarões históricos e uma atmosfera vibrante esperam por você.
            </p>

            <div className="space-y-4">
              {recommendations.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="bg-blue-50 p-2 rounded-full h-fit">
                    <MapPin className="w-5 h-5 text-hostel-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square md:aspect-video lg:aspect-square bg-gray-200 rounded-2xl overflow-hidden border-8 border-white shadow-xl">
            {/* Mock Map Placeholder */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-43.1870,-22.9220,15,0/600x600?access_token=mock')] bg-cover bg-center flex items-center justify-center">
               <div className="flex flex-col items-center">
                 <div className="bg-hostel-red p-3 rounded-full animate-bounce shadow-lg">
                   <MapIcon className="text-white w-8 h-8" />
                 </div>
                 <span className="bg-white px-3 py-1 rounded shadow-md mt-2 font-bold text-hostel-blue">Estamos aqui!</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
