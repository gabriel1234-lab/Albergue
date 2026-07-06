'use client';

import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Map as MapIcon } from 'lucide-react';

const Location = () => {
  const { t } = useLanguage();

  const recommendations = [
    { title: t('rec_bondinho_title'), type: 'Turismo', desc: t('rec_bondinho_desc'), image: '/images/Bondinho-de-Santa-Teresa-Rio-de-Janeiro-shutterstock_521319055.jpg' },
    { title: t('rec_selaron_title'), type: 'Cultura', desc: t('rec_selaron_desc'), image: '/images/o-que-fazer-em-santa-teresa-rj-escadaria-selaron.webp' },
    { title: t('rec_guimaraes_title'), type: 'Gastronomia', desc: t('rec_guimaraes_desc'), image: '/images/images.jpg' },
    { title: t('rec_curvelo_title'), type: 'Vista', desc: t('rec_curvelo_desc'), image: '/images/largo-do-curvelo-santa-teresa-rio-de-janeiro-lapa-bondinho-1_640x640+fill_ffffff.png' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('location_title')} <span className="text-hostel-red">Santa Teresa</span>
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
