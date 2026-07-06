'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Plus, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateRoomPage() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    roomNumber: '',
    beds: '4',
    gender: 'misto',
    bathroom: 'false',
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Quarto criado com sucesso! (Simulação)');
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Plus className="text-hostel-red" />
          Criar Novo Quarto
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
              Número do Quarto
            </label>
            <input
              required
              type="text"
              placeholder="Ex: 101"
              className="w-full border-gray-300 rounded-xl p-4 border focus:ring-2 focus:ring-hostel-blue focus:border-hostel-blue outline-none transition-all"
              value={formData.roomNumber}
              onChange={e => setFormData({...formData, roomNumber: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                {t('room_type')}
              </label>
              <select
                className="w-full border-gray-300 rounded-xl p-4 border focus:ring-2 focus:ring-hostel-blue focus:border-hostel-blue outline-none"
                value={formData.beds}
                onChange={e => setFormData({...formData, beds: e.target.value})}
              >
                <option value="4">{t('beds_4')}</option>
                <option value="8">{t('beds_8')}</option>
                <option value="12">{t('beds_12')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                {t('gender')}
              </label>
              <select
                className="w-full border-gray-300 rounded-xl p-4 border focus:ring-2 focus:ring-hostel-blue focus:border-hostel-blue outline-none"
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value})}
              >
                <option value="misto">{t('mixed')}</option>
                <option value="feminino">{t('female')}</option>
                <option value="masculino">{t('male')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
              {t('bathroom')}
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, bathroom: 'true'})}
                className={`flex-1 p-4 rounded-xl border-2 font-bold transition-all ${formData.bathroom === 'true' ? 'border-hostel-blue bg-blue-50 text-hostel-blue' : 'border-gray-200 text-gray-400'}`}
              >
                {t('yes')}
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, bathroom: 'false'})}
                className={`flex-1 p-4 rounded-xl border-2 font-bold transition-all ${formData.bathroom === 'false' ? 'border-hostel-blue bg-blue-50 text-hostel-blue' : 'border-gray-200 text-gray-400'}`}
              >
                {t('no')}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-hostel-red text-white py-4 rounded-xl font-bold text-xl hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 mt-8"
          >
            <Check />
            Salvar Quarto
          </button>
        </form>
      </div>
    </div>
  );
}
