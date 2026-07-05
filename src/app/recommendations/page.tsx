'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Utensils, MapPin, Camera, TrainFront } from 'lucide-react';

const RecommendationsPage = () => {
  const { t } = useLanguage();

  const places = [
    {
      name: 'Bonde de Santa Teresa',
      icon: <TrainFront className="text-hostel-red" />,
      desc: 'Um passeio histórico obrigatório que atravessa os Arcos da Lapa e sobe o morro.'
    },
    {
      name: 'Escadaria Selarón',
      icon: <Camera className="text-hostel-red" />,
      desc: 'A famosa escadaria com mosaicos coloridos de Jorge Selarón.'
    },
    {
      name: 'Aprazível',
      icon: <Utensils className="text-hostel-red" />,
      desc: 'Restaurante incrível com vista panorâmica e culinária brasileira refinada.'
    },
    {
      name: 'Parque das Ruínas',
      icon: <MapPin className="text-hostel-red" />,
      desc: 'Centro cultural com as melhores vistas para a Baía de Guanabara.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Dicas de Santa Teresa</h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        Explore os arredores do nosso hostel. Santa Teresa é o bairro mais charmoso e artístico do Rio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {places.map((place, i) => (
          <div key={i} className="bg-white border p-8 rounded-2xl flex gap-6 hover:shadow-md transition-shadow">
            <div className="bg-red-50 p-4 rounded-xl h-fit">
              {place.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{place.name}</h3>
              <p className="text-gray-600">{place.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;
