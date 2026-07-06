'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();

  const images = [
    {
      src: '/images/Bondinho-de-Santa-Teresa-Rio-de-Janeiro-shutterstock_521319055.jpg',
      alt: 'Bondinho de Santa Teresa',
      title: 'O Icônico Bondinho'
    },
    {
      src: '/images/o-que-fazer-em-santa-teresa-rj-escadaria-selaron.webp',
      alt: 'Escadaria Selarón',
      title: 'Escadaria Selarón'
    },
    {
      src: '/images/images.jpg',
      alt: 'Largo do Guimarães',
      title: 'Largo do Guimarães'
    },
    {
      src: '/images/largo-do-curvelo-santa-teresa-rio-de-janeiro-lapa-bondinho-1_640x640+fill_ffffff.png',
      alt: 'Largo do Curvelo',
      title: 'Largo do Curvelo'
    },
    {
      src: '/images/Centro-Historico-de-Santa-Teresa_nx170224002-1.jpg',
      alt: 'Centro Histórico',
      title: 'Centro Histórico'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('gallery_title').split('Santa Teresa')[0]} <span className="text-hostel-red">Santa Teresa</span>
          </h2>
          <p className="text-lg text-gray-600">
            {t('gallery_subtitle')}
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl break-inside-avoid"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold text-lg">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
