'use client';

import { useState, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculatePrice } from '@/lib/pricing';
import { Shield, CreditCard, CheckCircle, Calendar, Bed } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const RegistrationForm = () => {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const bedCount = parseInt(searchParams.get('beds') || '0');
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const initialPrice = parseInt(searchParams.get('price') || '80');

  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    identidade: '',
    endereco: '',
    filiacao: '',
    turismoId: '',
  });

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const pricing = calculatePrice({
    bedCount: bedCount,
    isFullRoom: false,
    days: nights,
    isHighSeason: false,
    baseRoomPrice: initialPrice / bedCount // initialPrice is sum of base prices, so normalize it
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2 && agreed) setStep(3);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in zoom-in-95 duration-500">
        <div className="bg-green-100 text-green-600 w-24 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-black mb-4 text-gray-900">{t('confirmed_title')}</h1>
        <p className="text-lg text-gray-600 mb-12">
          {t('confirmed_desc')}
        </p>
        <a href="/" className="bg-hostel-blue text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-opacity-90 transition-all shadow-xl">
          {t('back_home')}
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-black mb-8 text-gray-900">
            {step === 1 ? t('guest_data') : t('terms_payment')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('full_name')}</label>
                    <input required type="text" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors"
                      onChange={e => setFormData({...formData, nome: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('cpf')}</label>
                    <input required type="text" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('identity')}</label>
                    <input required type="text" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('tourism_id')}</label>
                    <input required type="text" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('parentage')}</label>
                    <input required type="text" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('address_label')}</label>
                    <input required type="text" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-hostel-red text-white py-5 rounded-2xl font-black text-xl hover:bg-opacity-90 transition-all shadow-xl uppercase tracking-widest">
                  {t('proceed_payment')}
                </button>
              </>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Shield size={24} className="text-hostel-blue" />
                    {t('terms_title')}
                  </h3>
                  <div className="text-sm text-gray-600 h-48 overflow-y-auto mb-6 p-4 bg-white border border-gray-100 rounded-2xl leading-relaxed">
                    <p className="mb-4 font-black uppercase text-xs tracking-widest text-gray-400">{t('hostel_rules')}</p>
                    <ul className="space-y-2 list-none">
                      <li className="flex gap-2 items-start">• {t('no_pets')}</li>
                      <li className="flex gap-2 items-start">• {t('no_alcohol')}</li>
                      <li className="flex gap-2 items-start">• {t('minors')}</li>
                      <li className="flex gap-2 items-start">• {t('times')}</li>
                      <li className="flex gap-2 items-start">• {t('cancellation')}</li>
                    </ul>
                  </div>
                  <label className="flex items-center gap-4 cursor-pointer p-4 bg-white rounded-2xl border-2 border-transparent hover:border-hostel-blue transition-all shadow-sm">
                    <input type="checkbox" required checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-6 h-6 rounded border-gray-300 text-hostel-blue focus:ring-hostel-blue" />
                    <span className="text-sm font-bold text-gray-700">{t('agree_terms')}</span>
                  </label>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <CreditCard size={24} className="text-hostel-blue" />
                    {t('online_payment')}
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <input placeholder={t('card_number')} className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors" />
                    <div className="grid grid-cols-2 gap-6">
                      <input placeholder="MM/AA" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors" />
                      <input placeholder="CVV" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-hostel-blue outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-hostel-blue text-white py-5 rounded-2xl font-black text-xl hover:bg-opacity-90 transition-all shadow-xl uppercase tracking-widest">
                  {t('finish_payment')} (R$ {pricing.total})
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white rounded-3xl p-8 sticky top-24 shadow-2xl">
            <h3 className="font-black text-2xl mb-8 border-b border-gray-800 pb-4 tracking-tight">{t('order_summary')}</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-3 text-gray-400">
                <Calendar size={18} />
                <div className="text-sm">
                  <p className="font-bold text-white">{new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}</p>
                  <p>{nights} {nights === 1 ? t('nights_1') : t('nights_many')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <Bed size={18} />
                <div className="text-sm">
                  <p className="font-bold text-white">{bedCount} {bedCount === 1 ? t('person') : t('people')}</p>
                  <p>Check-in {t('confirmed').toLowerCase()}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">{t('subtotal')}</span>
                  <span className="font-bold">R$ {pricing.subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-green-400">
                  <span className="font-bold uppercase text-xs tracking-widest">{t('discounts')}</span>
                  <span className="font-bold">- R$ {pricing.discount}</span>
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <span className="font-black uppercase text-sm tracking-tighter text-hostel-red">{t('total')}</span>
                  <span className="font-black text-4xl tracking-tighter">R$ {pricing.total}</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 text-center font-bold uppercase tracking-widest opacity-50">
              {t('secure_payment')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RegisterPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center font-black text-2xl animate-pulse">{t('loading')}</div>}>
      <RegistrationForm />
    </Suspense>
  );
}
