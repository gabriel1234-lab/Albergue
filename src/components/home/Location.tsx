'use client';

import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Map as MapIcon } from 'lucide-react';

const Location = () => {
  const { t } = useLanguage();

  const recommendations = [
    { title: 'Bondinho de Santa Teresa', type: 'Turismo', desc: 'O passeio mais icônico do bairro, passando pelos Arcos da Lapa.', image: '/images/Bondinho-de-Santa-Teresa-Rio-de-Janeiro-shutterstock_521319055.jpg' },
    { title: 'Escadaria Selarón', type: 'Cultura', desc: 'Mosaicos coloridos famosos mundialmente, ligando a Lapa a Santa Teresa.', image: '/images/o-que-fazer-em-santa-teresa-rj-escadaria-selaron.webp' },
    { title: 'Largo do Guimarães', type: 'Gastronomia', desc: 'O coração do bairro, com a famosa igreja azul e os melhores bares.', image: '/images/images.jpg' },
    { title: 'Largo do Curvelo', type: 'Vista', desc: 'Ponto de parada obrigatório com vista para o centro e o bonde.', image: '/images/largo-do-curvelo-santa-teresa-rio-de-janeiro-lapa-bondinho-1_640x640+fill_ffffff.png' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('location_title').split('Santa Teresa')[0]} <span className="text-hostel-red">Santa Teresa</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 italic">
              {t('location_quote')}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {t('location_desc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((item, index) => (
                <div key={index} className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-32 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-hostel-red" />
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
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
                 <span className="bg-white px-3 py-1 rounded shadow-md mt-2 font-bold text-hostel-blue">{t('here')}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
