'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const { t } = useLanguage();

  const reviews = [
    { name: 'Ana Silva', text: 'Ambiente maravilhoso e vista de tirar o fôlego! O café da manhã é excelente.', rating: 5 },
    { name: 'John Doe', text: 'Great place for young travelers. Very close to Selarón steps. Loved it!', rating: 5 },
    { name: 'Marc Dupont', text: 'Très bel hostel. Les chambres sont propres et le personnel est très accueillant.', rating: 4 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('reviews')}</h2>
          <div className="w-20 h-1 bg-hostel-red mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl relative">
              <Quote className="absolute top-4 right-4 text-gray-200 w-12 h-12" />
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 relative z-10 italic">"{review.text}"</p>
              <h4 className="font-bold text-gray-900">— {review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
