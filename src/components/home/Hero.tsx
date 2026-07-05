'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { X } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854817-5b2260756631?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {t('hero_title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl mb-8"
        >
          {t('hero_subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/booking" className="bg-hostel-red hover:bg-opacity-90 text-white text-xl font-bold px-10 py-4 rounded-full transition-all inline-block shadow-lg">
            {t('reserve_now')}
          </Link>
        </motion.div>
      </div>

      {/* Aggressive Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            className="fixed bottom-10 right-10 z-[60] bg-white p-6 rounded-2xl shadow-2xl border-4 border-hostel-red max-w-sm"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute -top-3 -right-3 bg-gray-800 text-white rounded-full p-1"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-2">🔥 Últimas Vagas!</h3>
            <p className="text-gray-600 mb-4">
              Temos 230 camas, mas elas esgotam rápido em Santa Teresa. Não fique de fora!
            </p>
            <Link
              href="/booking"
              className="block w-full bg-hostel-blue text-white text-center py-3 rounded-lg font-bold hover:bg-opacity-90"
              onClick={() => setShowPopup(false)}
            >
              RESERVAR AGORA
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
