'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const LiveCounter = () => {
  const { t } = useLanguage();
  const [count, setCount] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(5, prev + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200 text-sm font-bold animate-pulse">
      <Users size={16} />
      <span>{count} {t('online_users')}</span>
    </div>
  );
};

export default LiveCounter;
