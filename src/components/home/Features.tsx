'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Wind, Coffee, ShieldCheck, Users, TreePine, Utensils, WashingMachine, Tv } from 'lucide-react';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    { icon: <Wind className="w-8 h-8 text-hostel-blue" />, name: t('ac') },
    { icon: <WashingMachine className="w-8 h-8 text-hostel-blue" />, name: t('laundry') },
    { icon: <ShieldCheck className="w-8 h-8 text-hostel-blue" />, name: t('reception') },
    { icon: <Coffee className="w-8 h-8 text-hostel-blue" />, name: t('breakfast') },
    { icon: <Tv className="w-8 h-8 text-hostel-blue" />, name: t('common_area') },
    { icon: <TreePine className="w-8 h-8 text-hostel-blue" />, name: t('garden') },
    { icon: <Utensils className="w-8 h-8 text-hostel-blue" />, name: t('kitchen') },
    { icon: <Users className="w-8 h-8 text-hostel-blue" />, name: t('young_vibe') },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('features')}</h2>
          <div className="w-20 h-1 bg-hostel-red mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 text-center">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{feature.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
